# Long-Term Roadmap: GrantDrop

> Mature product roadmap staged by product maturity, NOT compressed to the
> contest deadline. Every item closes a named G6 blocker or lifts a named rubric
> score with checkable evidence. From R2 GPT Pro verdict (cannot_win_first).

## Stage 1 — Submission-safe receipt demo (beachhead: make current build submit-safe)

Goal: an honest, complete, compliant submission even if not first-place-competitive.

| Action | Artifact produced | Acceptance evidence | Owner module | Closes / lifts |
|---|---|---|---|---|
| Implement a Soroban on-chain Groth16/proof verifier contract | `contracts/grantdrop_verifier/` + deployed testnet contract address | Contract invocation accepts a valid proof and rejects an invalid proof; Stellar Expert / Horizon shows the contract call; invalid input cannot reach accepted | `contracts/grantdrop_verifier/src/lib.rs`, `src/services/proof.ts`, `src/services/stellar.ts` | FB-01, FB-05; ZK implementation quality, Stellar integration, Chain/protocol interaction |
| Route the accepted path through the verifier contract (`verify_and_claim`), not browser-only verify | Updated claim flow + receipt schema with contract id + invocation hash | Fresh browser accepted receipt only after contract call; browser-only bypass cannot mark accepted | `src/services/stellar.ts`, `src/services/receiptStore.ts`, `src/types.ts` | FB-01, Product-shape fit |
| Re-render the demo video to 120–180s with invalid/valid/inspect/Stellar/reopen/recovery beats | Final MP4, contact sheet, ffprobe report, subtitles | Duration 120–180s; first 30s show result + first action; no payout/on-chain-verifier overclaim | `artifacts/narration.json`, `pitch/director_board.md` | FB-02, FB-03; Submission readiness |
| Capture missing QA screenshots: invalid-rejected, reuse-blocked, receipt-not-found, stellar-expert-tx | screenshot pack mapped to coverage rows | Each state visibly reproduced in a real browser; director-board QA frames closed | `docs/assets/`, `.hunter/implementation-coverage.json` | FB-04; Working demo/UX, Product completeness |
| Remove all payout/disbursement/on-chain-verifier wording; align README + SUBMISSION to exact boundary | updated README, SUBMISSION | grep public copy for banned wording returns nothing; boundary wording matches built mechanism | `README.md`, `SUBMISSION.md`, `pitch/public-copy-facts.md` | FB-03 honesty QA; Live mechanism honesty |

## Stage 2 — Soroban verifier beachhead (make Stellar verify something proof-critical)

Goal: the proof consequence is enforced on Stellar, not only in the browser.

| Action | Artifact produced | Acceptance evidence | Owner module | Closes / lifts |
|---|---|---|---|---|
| Decide proving-system fit for Soroban (direct Groth16 verify, feasible adaptation, or migrate to a system with practical Soroban verification e.g. Noir/UltraHonk) | verifier contract + proving setup docs | documented trade-off; contract verifies the chosen proof system on testnet | `contracts/`, `circuits/`, `docs/` | FB-01 ceiling |
| Enforce nullifier + policy on-chain (one-claim, campaign-scoped) | contract nullifier/policy storage | duplicate nullifier rejected by contract; campaign scoping enforced | `contracts/grantdrop_verifier/` | FB-05; anti-reuse, Real-world applicability |
| Receipt carries contract id + invocation hash as first-class fields | updated Receipt type + UI inspection panel | receipt inspection shows contract-verified proof, not just a tx anchor | `src/types.ts`, receipt UI | Stellar integration, Public flex |

## Stage 3 — Real campaign and credential boundary (from demo input to real eligibility)

Goal: the private fact comes from a real source, not a hardcoded demo choice.

| Action | Artifact produced | Acceptance evidence | Owner module | Closes / lifts |
|---|---|---|---|---|
| Durable campaign storage + issuer/admin role | campaign registry, campaign detail page, issuer console | reviewer can create a second campaign; claimant claims against it; receipts stable after reload | `src/services/campaignStore.ts`, durable DB, `/campaigns/:id` | FB-05; Real-world applicability, Repeat value |
| External credential / eligibility commitment source (no private fact stored) | credential adapter + proof input import path | a claim is gated by an issuer credential / committed dataset; receipt still omits the private fact | `src/services/credentials.ts`, circuit inputs | Desire/Tuesday pull, Privacy boundary |
| Optional testnet disbursement / grant-account state transition after proof verification | contract-controlled grant pool simulation | accepted claim emits both verified receipt and grant-state transition; duplicate cannot claim twice | Soroban contract, `src/services/stellar.ts` | "payout" honesty gap (make payout real or keep absent), Real-world applicability |

## Stage 4 — Production-grade grant primitive (category leadership)

Goal: become the private grant receipt / distribution layer for Stellar programs.

| Action | Artifact produced | Acceptance evidence | Owner module | Closes / lifts |
|---|---|---|---|---|
| Reusable private-receipt engine for multiple programs (grants, event access, private terms, credentialed benefits) | circuit/contract registry, issuer SDK, claimant SDK, receipt explorer | >= 3 campaign types use the same verifier/receipt engine with distinct policies | `packages/sdk`, `contracts/*`, `/explorer` | Innovation, Repeat value, Boring-clone escape |
| Formal privacy/security review + threat model + abuse policy | threat model, audit notes, verifier tests, rate-limit policy | reviewer can verify what is private/public, replay rules, nullifier guarantees, failure behavior | `docs/security.md`, tests, contract specs | Technical correctness, Live mechanism honesty |
| Wallet support beyond demo signer; mainnet/testnet separation; monitoring + recovery | wallet integration, env separation, observability | real Stellar wallet signs; mainnet path gated; failures recoverable | `src/services/stellar.ts`, infra | Real-world applicability, Working demo/UX |
| Audited contracts + durable moat (issuer network, compliance posture, user-owned receipt portability) | audit reports, credential partnerships, API/SLA, retention/privacy policy | third-party issuers depend on the engine; receipts portable without GrantDrop custody | platform infra, legal/security docs | Category leadership, durable moat |

## What NOT to do

- Do not submit implying Soroban/on-chain verification or grant disbursement until those paths are real.
- Do not compress Stage 2-4 into the contest deadline. If a beachhead fix cannot land before submit, it stays in this roadmap and the verdict stays `cannot_win_first`.
- Do not lower ambition to "good enough for a hackathon."
