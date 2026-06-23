# GrantDrop Video Outline

## Product scene

A grant claimant opens one campaign, chooses a private eligibility input, uses a Stellar testnet signer, and receives an accepted receipt with a proof digest and Stellar tx link.

## First 30 seconds

| Time | Screen action | Viewer should understand | Result artifact | Inspection path |
| ---: | --- | --- | --- | --- |
| 0-6 s | Product title lands beside the accepted receipt screenshot. | GrantDrop makes a receipt, not a generic dashboard. | accepted receipt card | `docs/assets/grantdrop-desktop-accepted.png` |
| 6-12 s | The pressure is named: a claimant wants the grant without publishing the private reason. | The privacy problem is concrete. | private input chip and receipt frame | `/campaigns/zk-builder-microgrant` |
| 12-23 s | Live browser opens the campaign, selects the valid input, and uses the testnet signer. | A fresh reviewer can run the action. | pending claim state | live URL |
| 23-30 s | The claim moves toward an accepted receipt preview. | The product changes state on screen. | receipt preview | `Inspect receipt` button |

## Scene table

| Scene | User stake | Screen action | Result artifact | Inspection path | Focus target |
| --- | --- | --- | --- | --- | --- |
| Cold open | Builder needs a public grant receipt. | Show title, live URL, and accepted receipt screenshot. | accepted receipt | live URL | receipt status |
| Pressure | Builder does not want to reveal why they qualify. | Show private input moving into the claim booth. | private input choice | campaign route | input chip |
| Live claim | Reviewer needs a runable path. | Browser recording selects valid input, uses testnet signer, clicks `Claim grant`. | pending claim state | live app | CTA and signer strip |
| Accepted result | Reviewer needs the state change. | Browser recording waits for `ACCEPTED`. | receipt with tx hash | receipt route | status and Stellar ref |
| Inspect receipt | Reviewer needs trust checks. | Browser opens `Inspect receipt`. | public inputs and proof digest | Stellar Expert link and `npm run proof:verify` | inspection panel |
| Reopen | Reviewer needs a shareable result. | Second context opens the copied receipt URL. | read-only receipt | `/receipts/gd_c5c586b94b?r=...` | readonly receipt |
| Mechanism | Reviewer needs to see why Stellar and ZK matter. | Show three mechanism cards: prove, stamp, reopen. | mechanism map | `src/services/proof.ts`, `src/services/stellar.ts`, `src/services/receiptStore.ts` | code paths |
| Ask | Reviewer needs one next click. | Show live URL, README evidence, and final video path. | submission package | README evidence list | URL lockup |

## Cut rule

Keep the real browser claim, accepted receipt, inspection panel, and receipt reopen. Cut decorative motion before cutting any artifact or inspection path.
