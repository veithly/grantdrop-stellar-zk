#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = resolve(process.argv[2] || ".");
const baseUrl = process.argv[3] || "https://grantdrop-stellar-zk.pages.dev";
const outDir = resolve(projectRoot, ".hunter/public-smoke");
const playwright = await import(pathToFileURL("C:/Users/Ricky/Documents/Project/hackathonhunter-skill/node_modules/playwright/index.mjs").href);
const { chromium } = playwright;

async function horizonTx(stellarExpertUrl) {
  const hash = stellarExpertUrl?.split("/tx/").pop();
  if (!hash) return null;
  let lastError = "";
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`https://horizon-testnet.stellar.org/transactions/${hash}`, {
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) return { hash, status: response.status, successful: false };
      const data = await response.json();
      return {
        hash: data.hash,
        ledger: data.ledger,
        successful: data.successful === true,
        created_at: data.created_at,
        source_account: data.source_account,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      await new Promise((resolveDelay) => setTimeout(resolveDelay, attempt * 1500));
    }
  }
  return { hash, successful: false, error: lastError };
}

async function runAcceptedClaim(browser, name, options) {
  const context = await browser.newContext(options.context);
  const page = await context.newPage();
  const warnings = [];
  page.on("console", (message) => {
    if (message.type() === "error") warnings.push(message.text());
  });
  page.on("requestfailed", (request) => warnings.push(`${request.url()} ${request.failure()?.errorText || ""}`));

  await page.goto(`${baseUrl}/campaigns/zk-builder-microgrant`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.getByRole("button", { name: "Use testnet signer" }).click({ timeout: 10000 });
  await page.getByRole("button", { name: "Claim grant" }).click({ timeout: 10000 });
  await page.locator('[data-receipt-status="accepted"]').waitFor({ timeout: 180000 });
  await page.getByRole("button", { name: /Inspect receipt/i }).click({ timeout: 10000 });
  await page.locator("[data-inspection-panel]").waitFor({ timeout: 10000 });

  const receipt = await page.evaluate(() => {
    const inspectPanel = document.querySelector("[data-inspection-panel]");
    const link = inspectPanel?.querySelector('a[href*="stellar.expert"]');
    const payload = new URLSearchParams(location.search).get("r");
    let sharedReceipt = null;
    if (payload) {
      try {
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
        sharedReceipt = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))));
      } catch {
        sharedReceipt = null;
      }
    }
    return {
      url: location.href,
      receiptId: document.querySelector("[data-receipt-id]")?.textContent,
      wallet: document.querySelector("[data-receipt-wallet]")?.textContent,
      nullifier: document.querySelector("[data-nullifier]")?.textContent,
      stellarRefShort: document.querySelector("[data-stellar-ref]")?.textContent,
      publicInputs: document.querySelector("[data-public-inputs]")?.textContent,
      inspectText: inspectPanel?.textContent?.replace(/\s+/g, " ").trim(),
      stellarExpertUrl: link?.getAttribute("href"),
      stellarTxHash: sharedReceipt?.stellar?.txHash,
      stellarLedger: sharedReceipt?.stellar?.ledger,
    };
  });
  const screenshot = `.hunter/public-smoke/${name}-accepted.png`;
  await page.screenshot({ path: resolve(projectRoot, screenshot), fullPage: true });
  const tx = await horizonTx(receipt.stellarExpertUrl);
  await context.close();

  return {
    name,
    pass: Boolean(receipt.receiptId && receipt.stellarExpertUrl && receipt.publicInputs && receipt.stellarTxHash && receipt.stellarLedger),
    receipt,
    tx,
    screenshot,
    warnings,
  };
}

async function runSecondContext(browser, receiptUrl) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto(receiptUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.locator('[data-readonly-receipt="true"] [data-receipt-status="accepted"]').waitFor({ timeout: 15000 });
  const reopened = await page.evaluate(() => ({
    url: location.href,
    receiptId: document.querySelector("[data-receipt-id]")?.textContent,
    stellarRefShort: document.querySelector("[data-stellar-ref]")?.textContent,
    readonly: document.querySelector('[data-readonly-receipt="true"]') !== null,
  }));
  const screenshot = ".hunter/public-smoke/second-context-reopen.png";
  await page.screenshot({ path: resolve(projectRoot, screenshot), fullPage: true });
  await context.close();
  return {
    pass: Boolean(reopened.readonly && reopened.receiptId),
    reopened,
    screenshot,
  };
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const desktop = await runAcceptedClaim(browser, "desktop", { context: { viewport: { width: 1440, height: 1000 } } });
const mobile = await runAcceptedClaim(browser, "mobile-pixel7", {
  context: { viewport: { width: 393, height: 852 }, isMobile: true, hasTouch: true },
});
const secondContext = await runSecondContext(browser, desktop.receipt.url);
await browser.close();

const report = {
  schema: "public-smoke-report.v1",
  base_url: baseUrl,
  generated_at: new Date().toISOString(),
  pass: desktop.pass && mobile.pass && secondContext.pass,
  desktop,
  mobile,
  second_context: secondContext,
};

await writeFile(resolve(projectRoot, ".hunter/public-smoke.report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(`public smoke: ${report.pass ? "pass" : "FAIL"}`);
console.log(`desktop=${desktop.pass ? "pass" : "FAIL"} mobile=${mobile.pass ? "pass" : "FAIL"} second-context=${secondContext.pass ? "pass" : "FAIL"}`);
process.exit(report.pass ? 0 : 1);
