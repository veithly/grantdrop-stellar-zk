# Submission Copy Board: GrantDrop

## One-line rumor

A hidden condition flips a public Stellar receipt.

## Public recall line

"A valid private input becomes an accepted Stellar testnet receipt with a tx hash."

- Strongest first-pass placement: README opening sentence, `SUBMISSION.md` tagline, and video scene `03_result`.
- Video timestamp where the result is visible: `pitch/recording/pitch-demo-combined-final.mp4` at scene `03_result`, about 26 seconds.
- Repo/test/trace/receipt artifact: `.hunter/public-smoke.report.json`, `.hunter/public-chain-verification.json`, and `src/services/stellar.ts`.

## First-click reasons

- Open the live app and run a claim -> inspection path: `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`
- Watch the working receipt appear -> inspection path: `https://github.com/veithly/grantdrop-stellar-zk/blob/main/pitch/recording/pitch-demo-combined-final.mp4`
- Check the mechanism behind the receipt -> inspection path: `src/services/proof.ts`, `src/services/stellar.ts`, and `src/services/receiptStore.ts`

## Shareable result lines

- GrantDrop turns a private eligibility choice into an accepted Stellar receipt -> visual: `docs/assets/grantdrop-desktop-accepted.png`
- The receipt shows public inputs, proof digest, and Stellar Expert link -> visual: scene `04_inspection`
- A copied receipt URL reopens in a fresh browser without a signer -> visual: `docs/assets/grantdrop-second-context.png`

## Result links to inspect

- Live product: `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`, then click `Use testnet signer` and `Claim grant`.
- Video moment: `https://github.com/veithly/grantdrop-stellar-zk/blob/main/pitch/recording/pitch-demo-combined-final.mp4`, scene `03_result`.
- Repo inspection path: `src/services/proof.ts`, `src/services/stellar.ts`, `src/services/receiptStore.ts`.
- Sponsor/domain artifact: Stellar testnet `manageData` receipt transaction recorded in `.hunter/public-chain-verification.json`.
- User/state artifact: `.hunter/runtime-interaction.report.json` includes reload and second-context receipt checks.

## Sponsor / track fit

- Track: Stellar Hacks: Real-World ZK
- Primary prize only: yes
- Backup prize, if any: no backup target
- Sponsor primitive: Stellar testnet transaction, Horizon/Stellar Expert inspection, Groth16 proof verification.
- Why removal collapses the product: without Stellar the claimant has no public receipt, and without ZK the receipt exposes the eligibility reason.
- Result visible to reviewer: accepted receipt screen plus Stellar Expert tx link.

## Objection handling

- If judge asks "Is Stellar only branding?": the accepted receipt requires a signed Stellar testnet `manageData` transaction; inspect `.hunter/public-chain-verification.json` and `src/services/stellar.ts`.
- If judge asks "Is the private fact actually hidden?": inspect `src/types.ts` and `src/services/receiptStore.ts`; the stored receipt has nullifier, public inputs, digest, and tx reference, not the private eligibility secret.
- If judge asks "Can a fresh reviewer replay the result?": open `.hunter/runtime-interaction.report.json` and `docs/assets/grantdrop-second-context.png`; the second-context receipt path passes.

## Field strategy

- Tagline angle: result first, accepted receipt second, technology third.
- Short description angle: claimant action, private input, visible receipt artifact.
- Long description spine: private input -> browser signer -> Groth16 proof -> Stellar tx -> reopenable receipt.
- Challenges angle: IndexedDB receipt could not travel until the public receipt payload moved into the shared URL.
- Accomplishment angle: public desktop and mobile accepted receipts with second-context reopen evidence.

## Do-not-say

- Privacy platform for everything
- Mainnet grants or custodial payouts
- Internal workflow labels
- with keys installed
- production plan
- credential blocker
- can show either
- configured status
