#!/usr/bin/env node
import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.argv[2] || "dist");
const port = Number(process.argv[3] || 4180);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
  ".zkey": "application/octet-stream",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const target = resolve(root, `.${decoded}`);
  if (target !== root && !target.startsWith(`${root}${sep}`)) return null;
  return target;
}

async function fileFor(urlPath) {
  const direct = safePath(urlPath);
  if (direct && existsSync(direct)) {
    const info = await stat(direct);
    if (info.isFile()) return direct;
  }
  return join(root, "index.html");
}

createServer(async (request, response) => {
  try {
    const filePath = await fileFor(request.url || "/");
    response.setHeader("content-type", types[extname(filePath)] || "application/octet-stream");
    response.setHeader("cache-control", "no-store");
    createReadStream(filePath).pipe(response);
  } catch (error) {
    response.statusCode = 500;
    response.end(error instanceof Error ? error.message : "Static server error");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`static dist server: http://127.0.0.1:${port}`);
});
