# Submission Pack: GrantDrop

## Title

GrantDrop - private grant receipts on Stellar

## One-line description

A builder signs a private grant claim and receives an accepted Stellar testnet receipt with a Groth16 proof digest and tx hash.

## Who it's for

Grant programs that need to approve eligible builders without asking them to publish the private reason they qualify.

## Problem

Grant distribution usually makes the claimant choose between public eligibility disclosure and an unverifiable private review. The reviewer still needs a durable result they can inspect after the claim.

## Core features

- Claimant opens the live campaign, keeps the valid private input selected, signs with the browser testnet signer, and receives an `ACCEPTED` receipt.
- Receipt inspection shows Groth16 public inputs, proof digest, proof asset paths, and a Stellar Expert transaction link.
- A copied receipt URL reopens the same public receipt in a fresh browser without a signer, verified by `.hunter/runtime-interaction.report.json`.

## Sponsor usage

GrantDrop uses Stellar testnet as the public receipt layer. `src/services/stellar.ts` creates a client-side testnet signer, funds it through Friendbot, submits a signed `manageData` transaction, and returns the Stellar Expert URL shown on the receipt. `src/services/proof.ts` verifies the Groth16 proof before that accepted receipt is created.

## Web3 / Hook proof, if applicable

- Hook primitive: outside this Stellar receipt flow.
- Chain / PoolManager: Stellar testnet.
- Hook address: outside this Stellar receipt flow.
- PoolId: outside this Stellar receipt flow.
- Swap tx that triggers the Hook: outside this Stellar receipt flow.
- Counted wallet/frontend route: `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`
- Claim reality matrix status: `.hunter/claim-matrix.json` has four verified claim rows.
- Social proof post: the submitted artifact is the live app, README, and final video.

## Demo steps

1. Open `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`.
2. Click `Use testnet signer`, keep the valid private input selected, and click `Claim grant`.
3. Inspect the `ACCEPTED` receipt, proof digest, public inputs, and Stellar Expert transaction link.
4. Copy the receipt URL or open the second-context screenshot to see the same receipt reopen without a signer.

## Demo credentials

No login, wallet extension, or test account is needed. The app creates a client-side Stellar testnet signer in the browser for the claim path, and public receipt replay needs no signer.

## Known limitations

GrantDrop ships one fixed Stellar testnet campaign and does not move mainnet funds. Friendbot or Horizon outages return a failed receipt instead of marking a claim accepted.

## Video storybeat

0-10s: the accepted receipt appears first. 10-30s: the reviewer sees the private-input pressure and the live claim action. 30-50s: the receipt, proof digest, Stellar tx hash, and second-context reopen remove the trust gap. Final seconds: the mechanism points to the proof, Stellar, and receipt storage source paths.

## Deck vertebrae

- A hidden condition flips a public Stellar receipt.
- Builders need a grant result without publishing the reason they qualify.
- Live campaign action creates an accepted receipt.
- Groth16 verifies the private input; Stellar testnet records the receipt marker.
- Evidence is the live URL, final video, README screenshots, runtime reports, and claim matrix.

## FAQ for judges

- Q: How do I know the Stellar part is real? A: The receipt shows a Stellar Expert tx link, and `.hunter/public-chain-verification.json` records successful Horizon checks for desktop and mobile tx hashes.
- Q: Where is the ZK proof? A: `src/services/proof.ts` runs Groth16 verification against `public/proofs/verification_key.json`; `npm run proof:verify` returns snarkJS OK.
- Q: Does the private eligibility reason get stored? A: No; inspect `src/types.ts` and `src/services/receiptStore.ts`, which store status, wallet, nullifier, public inputs, proof digest, and tx reference.

## Claim source

- Claim matrix: `.hunter/claim-matrix.json`
- Runtime report: `.hunter/runtime-interaction.report.json`
- Judge red-team: `pitch/judge-red-team.md`
