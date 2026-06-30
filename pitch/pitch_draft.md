# Pitch Draft: GrantDrop (Stellar Hacks: Real-World ZK)

> Beat-by-beat deck outline. Slide job + speaker line + visual/artifact.
> R3-onchain: trust boundary updated after the Soroban on-chain verifier shipped.
> Source for the G6 re-run review. Rendered in G7.

## Delivery

- Runtime: 2–3 minute combined pitch/demo walkthrough, target ~152s (outcome → pressure → guardrail → live run → on-chain verify → result → inspect → reopen → trust boundary → ask).
- Project language: English. Identifiers, commands, URLs stay as-is.
- Product sentence: A grant claimant turns a private eligibility choice into an accepted Stellar receipt whose Groth16 proof is verified on-chain by a Soroban contract.

## Trust boundary (must stay accurate through every slide)

- On-chain (Soroban): the deployed `grantdrop_verifier` contract runs the Groth16 BN254 pairing check and the eligibility check (public `secretSquare` equals the campaign value) inside Soroban using Protocol 25 host functions (CAP-0074). An accepted receipt requires this signed `verify_claim` invocation to return true — a browser-only result cannot mark a claim accepted.
- Browser: snarkjs generates the Groth16 proof and fast-fails ineligible input for UX before any transaction. The private secret never leaves the browser and is never stored in the receipt.
- Stellar: a signed `manageData` testnet transaction anchors the public receipt marker; the receipt URL reopens only public fields.
- Honest scope: the verifier is a reusable contract — the campaign eligibility value is supplied by the app per call, not stored as an on-chain campaign registry. One fixed testnet campaign. No mainnet, custody, KYC, disbursement, external credential source, or durable admin storage.
- Banned wording unless implemented: payout, paid, disbursed, grant payment, mainnet, custody, KYC, audited.

---

## Slide 1 — Outcome first (cold open)

- Slide job: put the accepted receipt on screen before any explanation. A tired judge sees what the product is in one frame.
- Speaker line: "This is a GrantDrop receipt. A claimant got an accepted Stellar testnet receipt, and the proof behind it was verified on-chain — without exposing why they qualify."
- Visual / artifact: `docs/assets/grantdrop-desktop-accepted.png` — accepted receipt card plus inspection area showing wallet, nullifier, public inputs, proof digest, on-chain verify tx, and Stellar tx reference.

## Slide 2 — Pressure

- Slide job: name the concrete human pressure, not a category.
- Speaker line: "Grant programs force a choice: publish why you qualify on a public allowlist, or accept an unverifiable private review. The reviewer still needs a durable result they can check later."
- Visual / artifact: private-input chip moving into the claim booth; campaign route `/campaigns/zk-builder-microgrant`.

## Slide 3 — Setup / how it works (trust boundary explicit)

- Slide job: one sentence each for the three running parts, naming exactly where each check happens.
- Speaker line: "Three things run on the claim path. First, the browser generates a Groth16 proof with snarkjs and fast-fails ineligible input. Second, a deployed Soroban contract verifies that proof on-chain with Stellar's native BN254 pairing and checks eligibility — and the claim is accepted only if it returns true. Third, a signed Stellar `manageData` transaction anchors the public receipt."
- Visual / artifact: mechanism cards — `src/services/proof.ts`, `contracts/grantdrop_verifier/`, `src/services/stellar.ts`.

## Slide 4 — Live product run (guardrail first)

- Slide job: prove a fresh reviewer can run the hero action, and prove invalid input fails before any receipt.
- Speaker line: "First, ineligible input is rejected before a receipt is stamped. Then switch to the valid input, use the testnet signer, and claim. The browser generates the proof and submits it to the verifier."
- Visual / artifact: live browser at `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`; invalid → rejected, then valid → proof-generating → on-chain-verifying → accepted.

## Slide 5 — On-chain verification (the core)

- Slide job: show the proof is verified on Stellar, not just in the browser.
- Speaker line: "This is the core. The deployed Soroban contract runs the Groth16 pairing check on Stellar's BN254 host functions and confirms eligibility, all on-chain, in a signed transaction. The receipt is accepted only because that verification returned true."
- Visual / artifact: on-chain `verify_claim` invocation; contract `CA7KNPNRCI7I4RRWRJ4H5BJP4SLKPUEWJYSLYH4HWJTOVEDR7FEFU2X2`; verification tx on Stellar Expert.

## Slide 6 — Result + proof inspection

- Slide job: show the state change and remove the trust gap honestly.
- Speaker line: "The claim flips to accepted. Open `Inspect receipt`: it shows Groth16 public inputs, a proof digest, the verifier contract link, and the on-chain verification transaction. The private eligibility secret never reaches the stored receipt. `cargo test` covers the contract: valid accepted, tampered proof rejected, wrong secret rejected, wrong wallet rejected."
- Visual / artifact: ACCEPTED receipt with on-chain verify tx; inspection panel; `contracts/grantdrop_verifier/src/test.rs`.

## Slide 7 — Reopen / return use (split reopen and recovery)

- Slide job: the result travels without a signer; recovery is a real state.
- Speaker line: "A second browser opens the copied receipt URL without a signer and rebuilds the accepted read-only receipt from the public payload. A separate missing-id route shows `Receipt not found` and returns the user to the campaign."
- Visual / artifact: `docs/assets/grantdrop-second-context.png`; `docs/assets/grantdrop-receipt-not-found.png`.

## Slide 7A — What Stellar verifies / what the browser verifies

- Slide job: state the boundary precisely.
- Speaker line: "Stellar verifies the Groth16 proof on-chain through the Soroban contract and records the signed receipt marker. The browser only generates the proof and fast-fails for UX. The receipt ties those artifacts together without storing the private eligibility fact."
- Visual / artifact: three-column trust boundary — Browser proof-gen → Soroban on-chain verify → Stellar `manageData` receipt.

## Slide 8 — Why it fits the track

- Slide job: tie to the selected primary prize, no overclaim.
- Speaker line: "GrantDrop's boundary is precise: ZK gates the claim and the proof is verified on Stellar in Soroban; the testnet records a signed, inspectable receipt. Remove ZK and the private eligibility gate disappears. Remove Stellar and both the on-chain verification and the public receipt disappear."
- Visual / artifact: `docs/evidence/onchain-verification.json` (contract + verify_claim txs); `docs/assets/grantdrop-contract-on-stellar-expert.png`.

## Slide 9 — Try / ask

- Slide job: one next click.
- Speaker line: "Open the live campaign and claim a grant. Repo, live demo, the verifier contract on Stellar Expert, and the on-chain verification transaction are linked below."
- Visual / artifact: live URL, repo URL, contract on Stellar Expert. (Video link returns after a 120–180s render is verified.)

---

## Honesty notes (do not paper over in deck)

- The Groth16 proof IS verified on-chain inside a deployed Soroban contract (BN254 pairing, CAP-0074); the accepted receipt is gated on that signed `verify_claim` returning true.
- The verifier is reusable: the campaign eligibility value is supplied by the app per call, not stored on-chain as a campaign registry.
- One fixed testnet campaign. No mainnet funds, custody, KYC, disbursement, external credential source, durable admin storage, or audited production privacy.

## Blocker status (after on-chain + screenshot work)

- FB-01: on-chain/Soroban proof verification → RESOLVED (deployed verifier gates the claim; `cargo test` 4/4; verify_claim tx evidence).
- FB-04: failure/recovery screenshots (invalid-rejected, reuse-blocked, receipt-not-found, contract-on-stellar-expert) → RESOLVED (captured in `docs/assets/`).
- FB-02 / FB-03: demo video must be re-rendered to 120–180s with the full QA pass → pending.
- FB-05: product maturity (credential source, durable storage, disbursement) → roadmap; on-chain enforcement now present.
