import { copyFile, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const buildDir = path.join(root, "build", "proofs");
const publicDir = path.join(root, "public", "proofs");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

await rm(buildDir, { recursive: true, force: true });
await rm(publicDir, { recursive: true, force: true });
await mkdir(buildDir, { recursive: true });
await mkdir(publicDir, { recursive: true });

run(`${process.env.HOME}/.local/bin/circom`, [
  "circuits/grantdrop.circom",
  "--r1cs",
  "--wasm",
  "--sym",
  "--O0",
  "-o",
  "build/proofs",
  "-l",
  "node_modules",
]);
// circom 2.x writes grantdrop_js/ + grantdrop.wasm into the output dir; normalize
// the wasm path so the app and prover keep loading public/proofs/grantdrop.wasm.
await copyFile("build/proofs/grantdrop_js/grantdrop.wasm", "public/proofs/grantdrop.wasm");

run("npx", ["snarkjs", "powersoftau", "new", "bn128", "12", "build/proofs/pot12_0000.ptau"]);
run("npx", [
  "snarkjs",
  "powersoftau",
  "prepare",
  "phase2",
  "build/proofs/pot12_0000.ptau",
  "build/proofs/pot12_final.ptau",
]);
run("npx", [
  "snarkjs",
  "groth16",
  "setup",
  "build/proofs/grantdrop.r1cs",
  "build/proofs/pot12_final.ptau",
  "build/proofs/grantdrop_0000.zkey",
]);
run("npx", [
  "snarkjs",
  "zkey",
  "contribute",
  "build/proofs/grantdrop_0000.zkey",
  "build/proofs/grantdrop_final.zkey",
  "--name=GrantDrop automated contribution",
  "-v",
  "-e=grantdrop-stellar-zk-2026-06-30-local-ceremony",
]);
run("npx", [
  "snarkjs",
  "zkey",
  "verify",
  "build/proofs/grantdrop.r1cs",
  "build/proofs/pot12_final.ptau",
  "build/proofs/grantdrop_final.zkey",
]);
await copyFile("build/proofs/grantdrop_final.zkey", "public/proofs/grantdrop_final.zkey");
run("npx", [
  "snarkjs",
  "zkey",
  "export",
  "verificationkey",
  "public/proofs/grantdrop_final.zkey",
  "public/proofs/verification_key.json",
]);

console.log("Proof assets generated in public/proofs.");
