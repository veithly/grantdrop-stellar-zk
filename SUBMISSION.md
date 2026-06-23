# Submission: Stellar Hacks ZK

## Platform

DoraHacks

## URL

https://dorahacks.io/hackathon/stellar-hacks-zk/detail

## Project name

GrantDrop

## Tagline

A reviewer opens GrantDrop and receives an accepted Stellar receipt.

## Short description

An eligible builder uses GrantDrop to choose a private eligibility input, sign with a Stellar testnet signer, and receive an accepted receipt with a proof digest and transaction hash.

## What it does

GrantDrop runs one proof-gated microgrant campaign. A claimant opens `/campaigns/zk-builder-microgrant`, keeps the valid private input selected, uses the browser testnet signer, and clicks `Claim grant`. The app generates and verifies a Groth16 proof, submits a Stellar testnet `manageData` transaction, and opens an `ACCEPTED` receipt. The receipt shows wallet, nullifier, proof policy, public inputs, proof digest, and a Stellar Expert transaction link. The copied receipt URL reopens in a fresh browser without a signer.

## How we built it

The claim path uses three running parts. `src/services/proof.ts` builds the witness input and verifies the Groth16 proof against `public/proofs/verification_key.json`. `src/services/stellar.ts` creates a client-side Stellar testnet signer, funds the wallet through Friendbot, signs a Stellar `manageData` transaction, and returns the Stellar Expert link shown on the receipt. `src/services/receiptStore.ts` handles receipt storage and encodes the public receipt payload into the `/receipts/gd_c5c586b94b?r=...` route for read-only replay.

## Why it fits Stellar Hacks ZK

- Stellar testnet transaction -> accepted receipts require a signed `manageData` transaction -> inspect the Stellar Expert link on the receipt.
- ZK proof gate -> the private eligibility input stays off the receipt while public signals and proof digest are inspectable -> run `npm run proof:verify`.
- Public replay -> a second browser opens the accepted receipt without a signer -> inspect `.hunter/public-smoke.report.json` and `docs/assets/grantdrop-second-context.png`.

## Why it fits the judging criteria

- Real Stellar use: every accepted receipt carries a Stellar testnet `manageData` tx hash and Stellar Expert link; inspect `.hunter/public-chain-verification.json`.
- Meaningful ZK use: the private eligibility input is verified through Groth16 while only public inputs, proof digest, and nullifier reach the receipt; run `npm run proof:verify`.
- Reviewer clarity: the live app, README, and video all point to the same accepted receipt and second-context reopen path.

## Challenges we ran into

The first public receipt route only worked in the same browser because the receipt lived in IndexedDB. The fix was to encode the public receipt payload into the shared URL, then decode and store it when a fresh browser opens `/receipts/gd_c5c586b94b?r=...`.

## Accomplishments we're proud of

The deployed app created accepted desktop and mobile Stellar testnet receipts, reopened one receipt in a second browser context, and kept the private eligibility secret out of the stored receipt type.

## What we learned

The receipt is the product. Once the receipt carried the proof digest, nullifier, and Stellar transaction link, the README, runtime tests, and video could all point to the same inspectable object.

## What's next for GrantDrop

Add a real credential source and durable campaign storage so communities can run their own proof-gated reward campaigns while keeping the same public receipt inspection path.

## Built with

Stellar, Stellar testnet, Groth16, snarkjs, Circom, Vite, React, TypeScript, Cloudflare Pages, IndexedDB

## Track / Category

Stellar Hacks: Real-World ZK

## Demo URL

https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant

## Live URL

https://grantdrop-stellar-zk.pages.dev

## Repo URL

https://github.com/veithly/grantdrop-stellar-zk

## Video URL

https://github.com/veithly/grantdrop-stellar-zk/blob/main/pitch/recording/pitch-demo-combined-final.mp4

## Smart contract addresses

No smart contract address. GrantDrop uses Stellar testnet `manageData` transactions for the submitted proof receipt marker.

## Known limits

GrantDrop ships one fixed Stellar testnet campaign. It does not move mainnet funds, custody assets, run KYC, or claim audited production privacy. Friendbot or Horizon outages return a failed receipt instead of showing an accepted claim.
