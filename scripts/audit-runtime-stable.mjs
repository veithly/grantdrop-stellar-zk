#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

function argValue(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

function projectPath(projectRoot, path) {
  if (!path) return null;
  return isAbsolute(path) ? path : join(projectRoot, path);
}

function safeName(value) {
  return String(value || "target").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function targetUrl(baseUrl, step) {
  if (step.url) return step.url;
  return new URL(step.path || "/", baseUrl).toString();
}

function normalizeBrowser(entry, index) {
  if (typeof entry === "string") {
    return { name: entry, browser: entry.toLowerCase(), isMobile: false };
  }
  return {
    name: entry.name || entry.browser || `browser-${index + 1}`,
    browser: String(entry.browser || entry.type || "chromium").toLowerCase(),
    viewport: entry.viewport || null,
    device: entry.device || entry.deviceName || null,
    isMobile: entry.mobile === true || entry.isMobile === true,
  };
}

function normalizeDevice(entry, index) {
  if (typeof entry === "string") {
    return { name: entry, browser: /iphone|ipad|safari/i.test(entry) ? "webkit" : "chromium", device: entry, isMobile: true };
  }
  return {
    name: entry.name || entry.device || `mobile-${index + 1}`,
    browser: String(entry.browser || (/iphone|ipad|safari/i.test(entry.device || entry.name || "") ? "webkit" : "chromium")).toLowerCase(),
    device: entry.device || entry.deviceName || null,
    viewport: entry.viewport || null,
    isMobile: true,
  };
}

function buildTargets(plan) {
  const browsers = Array.isArray(plan.browsers) && plan.browsers.length ? plan.browsers : ["chromium"];
  const devices = Array.isArray(plan.devices) ? plan.devices : [];
  return [...browsers.map(normalizeBrowser), ...devices.map(normalizeDevice)];
}

function contextOptions(target, devices) {
  let options = {};
  if (target.device && devices[target.device]) options = { ...devices[target.device] };
  if (target.viewport) options.viewport = target.viewport;
  if (target.isMobile && !target.device) {
    options.isMobile = true;
    options.hasTouch = true;
    options.viewport = options.viewport || { width: 393, height: 852 };
  }
  return options;
}

function locatorFor(page, step) {
  if (step.role) return page.getByRole(step.role, step.name ? { name: step.name, exact: step.exact === true } : undefined).first();
  if (step.label) return page.getByLabel(step.label, { exact: step.exact === true }).first();
  if (step.placeholder) return page.getByPlaceholder(step.placeholder, { exact: step.exact === true }).first();
  if (step.testid) return page.getByTestId(step.testid).first();
  if (step.text && step.action !== "assertText" && step.action !== "waitFor") return page.getByText(step.text, { exact: step.exact === true }).first();
  return page.locator(step.selector).first();
}

async function runStep(page, baseUrl, projectRoot, step) {
  switch (step.action) {
    case "goto":
      await page.goto(targetUrl(baseUrl, step), { waitUntil: step.wait_until || "domcontentloaded", timeout: step.timeout_ms || 30000 });
      return;
    case "click":
      await locatorFor(page, step).click({ timeout: step.timeout_ms || 10000 });
      return;
    case "fill":
      await locatorFor(page, step).fill(String(step.value ?? ""), { timeout: step.timeout_ms || 10000 });
      return;
    case "press":
      await locatorFor(page, step.selector || step.role || step.label ? step : { ...step, selector: "body" }).press(step.key, { timeout: step.timeout_ms || 10000 });
      return;
    case "assertVisible":
      await locatorFor(page, step).waitFor({ state: "visible", timeout: step.timeout_ms || 10000 });
      return;
    case "assertText":
      await page.getByText(step.text, { exact: step.exact === true }).first().waitFor({ timeout: step.timeout_ms || 10000 });
      return;
    case "waitFor":
      if (step.text) await page.getByText(step.text, { exact: step.exact === true }).first().waitFor({ timeout: step.timeout_ms || 15000 });
      else await locatorFor(page, step).waitFor({ state: "visible", timeout: step.timeout_ms || 15000 });
      return;
    case "reload":
      await page.reload({ waitUntil: step.wait_until || "domcontentloaded", timeout: step.timeout_ms || 30000 });
      return;
    case "screenshot": {
      const screenshotPath = projectPath(projectRoot, step.path);
      await mkdir(dirname(screenshotPath), { recursive: true });
      await page.screenshot({ path: screenshotPath, fullPage: step.full_page !== false });
      return;
    }
    default:
      throw new Error(`unknown step action: ${step.action}`);
  }
}

function isUserAction(action) {
  return ["click", "fill", "press", "select", "check", "uncheck", "upload"].includes(action);
}

async function scanPage(page) {
  return page.evaluate(() => {
    const text = document.body?.innerText || "";
    const smells = [];
    if (/\b(coming soon|not implemented|TODO|fake data|mock data|placeholder result)\b/i.test(text)) {
      smells.push("visible fake/TODO/placeholder copy");
    }
    const clickable = [...document.querySelectorAll("button, a, [role='button'], input, select, textarea")]
      .filter((node) => {
        const rect = node.getBoundingClientRect();
        const style = window.getComputedStyle(node);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
      });
    const questionable = clickable.filter((node) => {
      const tag = node.tagName.toLowerCase();
      const textValue = (node.innerText || node.getAttribute("aria-label") || node.getAttribute("placeholder") || "").trim();
      if (!textValue && tag !== "input" && tag !== "textarea" && tag !== "select") return true;
      if (node.disabled || node.getAttribute("aria-disabled") === "true") return true;
      if (tag === "a" && !node.getAttribute("href")) return true;
      return false;
    });
    if (questionable.length > 4) smells.push(`questionable controls: ${questionable.length}`);
    return { textLength: text.length, clickableCount: clickable.length, questionableControlCount: questionable.length, smells };
  });
}

async function runCase({ browser, target, testCase, baseUrl, projectRoot, artifactDir, report }) {
  const context = await browser.newContext(contextOptions(target, report.devices));
  const page = await context.newPage();
  const result = {
    name: testCase.name || "unnamed case",
    context: testCase.context || "fresh",
    steps: [],
    pass: false,
    runtime_scan: null,
    trace: null,
    screenshot: null,
  };

  await context.tracing.start({ screenshots: true, snapshots: true, sources: true });
  if (/second|role|admin|reviewer|viewer|history|return/i.test(`${result.context} ${result.name}`)) report.metrics.second_context = true;

  page.on("console", (message) => {
    if (message.type() === "error") {
      report.metrics.console_errors += 1;
      report.errors.push(`[${target.name} console] ${message.text().slice(0, 240)}`);
    }
  });
  page.on("requestfailed", (request) => {
    report.metrics.failed_requests += 1;
    report.errors.push(`[${target.name} requestfailed] ${request.url()} ${request.failure()?.errorText || ""}`.slice(0, 280));
  });
  page.on("response", (response) => {
    if (response.status() >= 500) {
      report.metrics.failed_requests += 1;
      report.errors.push(`[${target.name} ${response.status()}] ${response.url()}`.slice(0, 280));
    }
  });

  let sawReload = false;
  let sawAssertionAfterReload = false;
  try {
    for (const step of testCase.steps || []) {
      const started = Date.now();
      await runStep(page, baseUrl, projectRoot, step);
      result.steps.push({
        action: step.action,
        selector: step.selector,
        role: step.role,
        label: step.label,
        testid: step.testid,
        path: step.path,
        text: step.text,
        pass: true,
        elapsed_ms: Date.now() - started,
      });
      if (isUserAction(step.action)) report.metrics.user_action_count += 1;
      if (step.action === "reload") sawReload = true;
      if (sawReload && ["assertVisible", "assertText", "waitFor"].includes(step.action)) sawAssertionAfterReload = true;
    }
    result.runtime_scan = await scanPage(page);
    report.metrics.runtime_smells += result.runtime_scan.smells.length;
    result.pass = result.runtime_scan.smells.length === 0;
  } catch (error) {
    result.steps.push({ pass: false, error: error instanceof Error ? error.message : String(error) });
    report.errors.push(`[${target.name} / ${result.name}] ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (sawReload && sawAssertionAfterReload) report.metrics.reload_assertion = true;
    if (!result.pass) {
      await mkdir(artifactDir, { recursive: true });
      const stem = `${safeName(target.name)}-${safeName(result.name)}-${Date.now()}`;
      const screenshotPath = join(artifactDir, `${stem}.png`);
      const tracePath = join(artifactDir, `${stem}.zip`);
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        result.screenshot = screenshotPath;
      } catch {
        // Browser may already be closed after a hard failure.
      }
      await context.tracing.stop({ path: tracePath });
      result.trace = tracePath;
    } else {
      await context.tracing.stop();
    }
    await context.close();
  }
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const projectRoot = resolve(args[0] || process.cwd());
  const planPath = projectPath(projectRoot, argValue(args, "--plan") || ".hunter/runtime-interaction.plan.json");
  const plan = JSON.parse(await readFile(planPath, "utf8"));
  const baseUrl = argValue(args, "--url") || plan.base_url || plan.baseUrl;
  const reportPath = projectPath(projectRoot, plan.report_path || ".hunter/runtime-interaction.report.json");
  const artifactDir = projectPath(projectRoot, plan.artifact_dir || ".hunter/runtime-artifacts");

  const hunterPlaywrightPath = resolve("C:/Users/Ricky/Documents/Project/hackathonhunter-skill/node_modules/playwright/index.mjs");
  const legacyPlaywrightPath = resolve(projectRoot, ".hunter/pw149/node_modules/playwright/index.mjs");
  if (!existsSync(legacyPlaywrightPath)) throw new Error("missing .hunter/pw149 Playwright 1.49 install");
  const current = await import(pathToFileURL(hunterPlaywrightPath).href);
  const legacy = await import(pathToFileURL(legacyPlaywrightPath).href);
  const launchers = { chromium: current.chromium, firefox: current.firefox, webkit: legacy.webkit };
  const targets = buildTargets(plan);
  const browserCount = new Set(targets.map((target) => target.browser)).size;
  const report = {
    schema: "runtime-interaction-report.v2",
    base_url: baseUrl,
    plan_path: planPath,
    generated_at: new Date().toISOString(),
    pass: false,
    metrics: {
      case_count: Array.isArray(plan.cases) ? plan.cases.length : 0,
      target_count: targets.length,
      target_passed: 0,
      browser_count: browserCount,
      browsers_passed: 0,
      mobile_context: false,
      trace_on_failure: true,
      user_action_count: 0,
      reload_assertion: false,
      second_context: false,
      console_errors: 0,
      failed_requests: 0,
      runtime_smells: 0,
    },
    targets: [],
    cases: [],
    errors: [],
    devices: current.devices,
    launcher_note: "Chromium/Firefox use HackathonHunter Playwright 1.61; WebKit uses project-local Playwright 1.49 because 1.61 WebKit hung on local HTTP in this Windows environment.",
  };

  for (const target of targets) {
    if (target.isMobile) report.metrics.mobile_context = true;
    const launcher = launchers[target.browser];
    const targetResult = { name: target.name, browser: target.browser, device: target.device || null, mobile: target.isMobile === true, pass: false, cases: [], errors: [] };
    if (!launcher) {
      targetResult.errors.push(`unsupported browser target: ${target.browser}`);
      report.targets.push(targetResult);
      continue;
    }
    const browser = await launcher.launch({ headless: true });
    try {
      for (const testCase of plan.cases || []) {
        const caseResult = await runCase({ browser, target, testCase, baseUrl, projectRoot, artifactDir, report });
        targetResult.cases.push(caseResult);
      }
      targetResult.pass = targetResult.cases.length === plan.cases.length && targetResult.cases.every((item) => item.pass);
    } finally {
      await browser.close();
    }
    report.targets.push(targetResult);
    report.cases.push(...targetResult.cases.map((item) => ({ ...item, target: target.name, browser: target.browser })));
  }

  const passedTargets = report.targets.filter((target) => target.pass);
  report.metrics.target_passed = passedTargets.length;
  report.metrics.browsers_passed = new Set(passedTargets.map((target) => target.browser)).size;
  report.pass =
    report.targets.length > 0 &&
    report.targets.every((target) => target.pass) &&
    report.metrics.browser_count >= 3 &&
    report.metrics.browsers_passed >= 3 &&
    report.metrics.mobile_context === true &&
    report.metrics.user_action_count >= 3 &&
    report.metrics.reload_assertion &&
    report.metrics.second_context &&
    report.metrics.console_errors === 0 &&
    report.metrics.failed_requests === 0 &&
    report.metrics.runtime_smells === 0;

  delete report.devices;
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`runtime stable audit: ${report.pass ? "pass" : "FAIL"}`);
  console.log(`targets=${report.metrics.target_passed}/${report.metrics.target_count}, browsers=${report.metrics.browsers_passed}/${report.metrics.browser_count}, mobile=${report.metrics.mobile_context ? "y" : "n"}`);
  if (report.errors.length) report.errors.slice(0, 10).forEach((error) => console.log(`- ${error}`));
  process.exit(report.pass ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
