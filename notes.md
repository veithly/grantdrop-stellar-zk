# Notes: Stellar Hacks ZK Prize Project

## Workflow Findings

- `hackathonhunter` full mode is mandatory because the user asked for all flows, "拿大奖", supplied a contest URL, and the contest is Web3/ZK.
- Full mode requires one gate at a time: G0 prize thesis, G1 concept lock, G2 product spec, G3 visual contract, G4 real loop, G5 public smoke, G6 package, G7 submit.
- First product artifacts must be gate evidence, not app scaffolding.
- Required frontend polish skills for UI work: `impeccable` and `design-taste-frontend`.
- Required public copy pass: `stop-slop` plus a humanizer for the copy language.

## Repository Findings

- Workspace path: `C:\Users\Ricky\Documents\Project\Hackathon\stellar-hacks-zk`
- Current files: only `.vite/deps` cache metadata.
- `git status` reports the current directory is not a git repository.

## Source Notes

- DoraHacks URL: `https://dorahacks.io/hackathon/stellar-hacks-zk/detail`
- Direct `curl` reached an AWS WAF human verification page, not the hackathon details.
- Browser text capture from DoraHacks confirmed:
  - Hackathon: Stellar Hacks: Real-World ZK
  - Prize pool: $10,000
  - Deadline: 2026-06-29 12:00 PST / 2026-06-30 03:00 Asia/Shanghai
  - Required: open-source repo, 2-3 minute demo video, meaningful ZK + Stellar integration
  - BUIDL list is private, so competitor saturation must come from official Ideas/resources and external examples.
- DoraHacks Ideas page lanes include proof-of-funds, eligibility, private allowlist, verifiable off-chain computation, private payments, confidential payroll/invoicing, privacy pool, confidential token, private RWA settlement, fully shielded wallet, private remittance corridor, proof aggregation, and cross-chain private bridge.

## Technical Findings

- Official Stellar CLI release `stellar-cli-27.0.0-x86_64-pc-windows-msvc.tar.gz` was downloaded and extracted to `.tools/stellar-cli/stellar.exe`.
- `.tools/stellar-cli/stellar.exe --version` returns `stellar 27.0.0`.
- Rust has `wasm32-unknown-unknown` installed, but `cargo install stellar-cli` fails without `link.exe`; use prebuilt CLI instead.
- Stellar `soroban-examples/groth16_verifier` is a demonstration Soroban Groth16 verifier using BLS12-381 pairing checks. The README warns it is demonstration-only and not audited.
- Nethermind's `stellar-risc0-verifier` README describes an on-chain RISC Zero proof verifier for Stellar with router, emergency stop, and Groth16 verifier components. It is also explicitly not audited.
