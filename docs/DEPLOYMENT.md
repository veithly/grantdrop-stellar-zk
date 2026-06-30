# Deployment

GrantDrop deploys as a static Cloudflare Pages site.

## Cloudflare target

- Project: `grantdrop-stellar-zk`
- Production URL: `https://grantdrop-stellar-zk.pages.dev`
- Build output: `dist`
- Deploy command: `npm run deploy`

## Bindings and secrets

No Cloudflare storage binding is required for this submitted build. The app uses static proof assets, browser IndexedDB, public receipt URL payloads, and Stellar testnet Horizon/Friendbot from the client. There are no D1, KV, R2, Queue, service, or secret bindings to configure.

## Evidence

- On-chain verification: `docs/evidence/onchain-verification.json` (deployed Soroban verifier + `verify_claim` transactions).
- Screenshots: `docs/assets/grantdrop-desktop-accepted.png`, `grantdrop-mobile-accepted.png`, `grantdrop-second-context.png`, `grantdrop-invalid-rejected.png`, `grantdrop-reuse-blocked.png`, `grantdrop-receipt-not-found.png`, `grantdrop-contract-on-stellar-expert.png`.

A live claim opens the production URL, generates a Groth16 proof, has the Soroban contract verify it on-chain, anchors a `manageData` receipt, and reopens the receipt from a second browser context.
