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

GrantDrop runs one proof-gated microgrant campaign. A claimant opens `/campaigns/zk-builder-microgrant`, keeps the valid private input selected, uses the browser testnet signer, and clicks `Claim grant`. The app generates a Groth16 proof, a deployed Soroban contract verifies it on-chain (and the receipt is accepted only if that returns true), then a Stellar testnet `manageData` transaction anchors the receipt and an `ACCEPTED` receipt opens. The receipt shows wallet, nullifier, proof policy, public inputs, proof digest, the on-chain `verify_claim` transaction, and a Stellar Expert link. The copied receipt URL reopens in a fresh browser without a signer.

## How we built it

The claim path uses four running parts. `src/services/proof.ts` builds the witness input, generates the Groth16 proof with snarkjs, and fast-fails ineligible input in the browser (UX guardrail). `src/services/contract.ts` then submits a signed `verify_claim` invocation to a deployed Soroban Groth16 verifier contract (`contracts/grantdrop_verifier/`) that runs the native BN254 pairing check (Stellar Protocol 25 host functions, CAP-0074) and checks the public `secretSquare` eligibility commitment — the receipt is marked accepted only if this on-chain call returns true, so a browser-only result cannot accept a claim. `src/services/stellar.ts` creates a client-side Stellar testnet signer, funds the wallet through Friendbot, signs a Stellar `manageData` transaction, and returns the Stellar Expert link shown on the receipt. `src/services/receiptStore.ts` handles receipt storage and encodes the public receipt payload into the `/receipts/gd_c5c586b94b?r=...` route for read-only replay.

## Why it fits Stellar Hacks ZK

- On-chain ZK verification -> the Groth16 proof is verified inside a deployed Soroban contract (BN254 host functions, CAP-0074) and that on-chain result gates the accepted receipt -> inspect the contract on Stellar Expert and the `verify_claim` tx on the receipt.
- Real Stellar transaction -> accepted receipts also carry a signed `manageData` receipt marker -> inspect the Stellar Expert link on the receipt.
- Public replay -> a second browser opens the accepted receipt without a signer -> see `docs/assets/grantdrop-second-context.png`.

## Why it fits the judging criteria

- Real Stellar use: the proof is verified on-chain by a deployed Soroban contract, and every accepted receipt carries on-chain `verify_claim` and `manageData` transactions; inspect `docs/evidence/onchain-verification.json`.
- Meaningful ZK use: a non-degenerate Groth16 circuit gates eligibility, the private input stays off the receipt, and the pairing check runs on-chain; `cargo test` covers valid/tampered/wrong-secret/wrong-wallet, and `npm run proof:verify` checks the proof locally.
- Reviewer clarity: the live app, README, and screenshots all point to the same accepted receipt, on-chain verification tx, and second-context reopen path.

## Challenges we ran into

Calling the Soroban verifier from the client kept trapping until we matched the exact `ScVal` encoding: BN254 points as 64-byte (G1) and 128-byte (G2) values, struct fields serialized as a map with alphabetically sorted symbol keys, and simulation run from a funded account. Once that matched, `verify_claim` returns true on-chain and gates the receipt. Separately, the public receipt route first only worked in the same browser because the receipt lived in IndexedDB; we fixed it by encoding the public receipt payload into the shared URL, then decoding and storing it when a fresh browser opens `/receipts/gd_c5c586b94b?r=...`.

## Accomplishments we're proud of

We moved the Groth16 verification on-chain: a deployed Soroban contract runs the BN254 pairing check and gates the accepted receipt, proven by `verify_claim` transactions and a 4/4 `cargo test` suite. The app created accepted desktop and mobile receipts, reopened one in a second browser context, and kept the private eligibility secret out of the stored receipt.

## What we learned

The receipt is the product. Once the receipt carried the proof digest, nullifier, and Stellar transaction link, the README, runtime tests, and video could all point to the same inspectable object.

## What's next for GrantDrop

Add a real credential source and durable campaign storage so communities can run their own proof-gated reward campaigns while keeping the same public receipt inspection path.

## Built with

Stellar, Stellar testnet, Soroban, Soroban BN254 host functions (CAP-0074), Groth16, snarkjs, Circom, Rust, Vite, React, TypeScript, Cloudflare Pages, IndexedDB

## Track / Category

Stellar Hacks: Real-World ZK

## Demo URL

https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant

## Live URL

https://grantdrop-stellar-zk.pages.dev

## Repo URL

https://github.com/veithly/grantdrop-stellar-zk

## Video URL

Pending: a 120–180s combined pitch/demo is being re-rendered to the `artifacts/narration.json` structure (invalid rejected → valid claim → on-chain `verify_claim` → inspect → Stellar Expert → second-context reopen → trust boundary). The link will be published here once the render passes the duration and QA checks.

## Smart contract addresses

Soroban Groth16 verifier: `CA7KNPNRCI7I4RRWRJ4H5BJP4SLKPUEWJYSLYH4HWJTOVEDR7FEFU2X2` (Stellar testnet). The contract runs the native BN254 pairing check (Protocol 25 host functions, CAP-0074) and enforces eligibility via the public `secretSquare` commitment. Source: `contracts/grantdrop_verifier/` (`cargo test` passes 4/4). GrantDrop also uses Stellar testnet `manageData` transactions for the public receipt marker.

## Known limits

GrantDrop ships one fixed Stellar testnet campaign. It does not move mainnet funds, custody assets, run KYC, or claim audited production privacy. Friendbot or Horizon outages return a failed receipt instead of showing an accepted claim.
