# Task Plan: Stellar Hacks ZK Prize Project

## Goal
Build and package a prize-grade Stellar/ZK hackathon project from an empty workspace, following the full HackathonHunter G0-G7 flow.

## Phases
- [x] Phase 1: Load workflow rules and inspect repository state
- [x] Phase 2: Gather hackathon rules, Stellar/ZK technical constraints, and winner signals
- [x] Phase 3: Produce G0/G1 prize thesis and concept-lock artifacts
- [x] Phase 4: Produce G2 product spec, stack lock, and visual contract
- [x] Phase 5: Build the smallest real product loop
- [x] Phase 6: Verify desktop/mobile/runtime behavior
- [x] Phase 7: Package README, submission copy, and evidence
- [x] Phase 8: Produce demo video and final DoraHacks submission package

## Key Questions
1. What exact Stellar/ZK construct must the demo visibly prove?
2. Which front-stage user action gives judges a replayable state change in under 30 seconds?
3. What can be implemented with real local or testnet evidence inside this workspace?

## Decisions Made
- Full HackathonHunter mode: User explicitly requested all flows, a prize-grade result, provided a contest URL, and the contest is Web3/ZK.
- Repository baseline: Current workspace is not a git repo and only contains a `.vite` cache directory.
- Stellar CLI path: use project-local `.tools/stellar-cli/stellar.exe` version 27.0.0 from official GitHub release.
- Current product: GrantDrop, a Stellar testnet + Groth16 receipt loop for proving grant eligibility privately and publishing an inspectable Stellar receipt.
- G4 real loop passed: runtime interaction report, accepted browser claim, Horizon tx verification, claim matrix, and operations check are present.
- G5 public smoke passed: Cloudflare Pages URL, public runtime report, desktop/mobile accepted screenshots, second-context receipt reopen, and Horizon tx checks are present.
- Current gate: G7 submit package. README, public copy, video board, real demo recording, polished video, submission pack, manifest, and judge red-team audit are green.

## Errors Encountered
- DoraHacks direct page request returned AWS WAF human verification. Resolution: continue with browser/search/API fallbacks and record source quality.
- PowerShell login shell printed `vswhere.exe` errors. Resolution: use shell commands with `login:false`.
- `cargo install stellar-cli --version 27.0.0 --locked` failed because Windows MSVC linker `link.exe` is missing. Resolution: downloaded the official Windows prebuilt release into `.tools/stellar-cli/`.
- First I1-I3 GPT Pro batch using `hh-idea-i1/i2/i3` hit stale ChatGPT session recovery and WebBridge fill/upload timeouts. Resolution: restart the batch with unique `hh-zk-idea-*` sessions and `--fresh`, then await only after all three starts succeed.
- PowerShell `git status` failed because this workspace is not a git repository. Resolution: use Hunter audit outputs and file artifacts as progress evidence.
- Playwright 1.61 WebKit hung on local HTTP in this Windows environment. Resolution: keep Chromium/Firefox on Hunter Playwright 1.61 and use project-local Playwright 1.49 for WebKit in `scripts/audit-runtime-stable.mjs`; runtime report records this launcher note.

## Status
**Completed Phase 8** - Final video, public deployment, submission package, manifest, and red-team audit are ready. Actual DoraHacks submit click still requires human confirmation.
