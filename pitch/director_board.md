# Demo Director Board: GrantDrop

## Source Of Truth

- Product sentence: `A builder uses GrantDrop to turn a private eligibility choice into an accepted Stellar testnet receipt.`
- Hero moment: `The live claim changes into an ACCEPTED receipt with a Stellar tx hash.`
- Result artifact: `GrantDrop receipt at /receipts/gd_c5c586b94b?r=...`
- Inspection path: `Inspect receipt -> public inputs, proof digest, Stellar Expert tx link, npm run proof:verify`
- Live URL: `https://grantdrop-stellar-zk.pages.dev`
- Demo URL: `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant`
- Delivery mode: `combined-pitch-demo`
- Composition: combined product video HTML

## Roadshow Video Gate

| Requirement | Evidence | Result |
| --- | --- | --- |
| Pitch/deck first, real browser demo second | final MP4 chapters and contact sheet | R1-open: re-render needed at target duration |
| Required TTS provider is used with no fallback | `TTS_PROVIDER=mimo`, `mimo-v2.5-tts`, voice `Chloe`, measured scene durations | R1-open: re-render needed at target duration |
| Stale TTS chunks were regenerated | speech chunks recreated after copy and provider lock | R1-open: re-render needed at target duration |
| Demo is a real browser/app recording | real browser/app recording plus recorder log | R1-open: re-render needed at target duration |
| No screenshot slideshow is allowed | screenshot slideshow is invalid for the demo segment | R1-open: re-render needed at target duration |
| Recorder fails on broken actions | `allow_action_failures=false`, `allow_empty_scenes=false` in the recorder config | R1-open: re-render needed at target duration |
| Timing uses measured narration durations | scene waits align with measured durations | R1-open: re-render needed at target duration |
| Audio/video sync is within 0.5s | ffprobe report and duration check | R1-open: re-render needed at target duration |
| UI is readable in final encode | H.264/AAC, 1080p, 30fps, video bitrate >= 2.5 Mbps, contact sheet checked | R1-open: re-render needed at target duration |
| No blank/silence segment over 2s | blank-frame and silence logs | R1-open: re-render needed at target duration |
| Final duration is 120–180 seconds | ffprobe duration report | open: must render to the ~152s narration structure |
| No payment/disbursement overclaim | caption QA grep | open: any caption implying payout, disbursement, mainnet, custody, KYC, or audited fails QA. On-chain proof verification IS allowed — the Soroban verifier is deployed and gates the claim. |

## QA Frames To Add

- invalid input rejected before any receipt
- reuse-blocked (nullifier / already-claimed after first accepted claim)
- on-chain verify_claim transaction succeeding (Soroban verifier returns true)
- Stellar Expert transaction open
- missing receipt recovery
- trust boundary: Soroban verifies the proof on-chain / browser generates the proof / Stellar anchors the receipt

## First 30 Seconds Gate

Render this slice before the full video.

| Time | Must be visible | Failure if missing | Result |
| ---: | --- | --- | --- |
| 0-5 s | Product name plus accepted receipt screenshot | Viewer cannot say what the product does. | locked |
| 5-12 s | Builder pressure: private reason, public receipt | Sounds like a generic category. | locked |
| 12-22 s | Live campaign and first action starts | Video is only slides. | locked |
| 22-30 s | Accepted receipt preview or inspection teaser | Trust is deferred. | locked |

## Scene Board

| Scene | Seconds | Why this scene exists | Judge belief | Screen action | Result artifact | Inspection path | Public copy line | Evidence source | Primary treatment | What to cut if slow | QA frame |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `00_cold_open` | 5 | Put the result on screen first. | This is a receipt product. | Show GrantDrop, live URL, and accepted receipt screenshot. | accepted receipt | README and live URL | GrantDrop turns private eligibility into a public Stellar receipt. | README + screenshot | `artifact_stack_3d` | decorative package montage | QA frame 00 |
| `01_pressure` | 7 | Name the builder pressure. | The privacy need is concrete. | Show private input and public receipt frame. | private input choice | campaign route | The builder wants the grant without publishing the reason. | public copy facts | marker sweep | extra floating note | QA frame 01 |
| `02_live_action` | 14 | Prove a reviewer can run it. | I can do this too. | Real browser rejects invalid input, then selects valid input, uses signer, clicks `Claim grant`. | pending claim state | live URL route | Invalid rejects; then claim with the testnet signer. | runtime report + recorder log | cursor choreography | lower third | QA frame 02 |
| `03_onchain_verify` | 16 | Show the proof is verified on Stellar. | Stellar actually verifies the proof. | Show the signed `verify_claim` invocation returning true. | on-chain verify tx | Soroban contract `CA7K...U2X2` + Stellar Expert | The Soroban contract runs the Groth16 BN254 pairing check on-chain; the claim is accepted only if it returns true. | `docs/evidence/onchain-verification.json` | component_lift | second zoom | QA frame 03 |
| `04_result_inspect` | 14 | Show state change + trust checks. | I can check it. | Show `ACCEPTED`, open `Inspect receipt` with on-chain verify tx + contract link. | accepted receipt, proof digest, on-chain tx | `/receipts/gd_...?r=...` + Stellar Expert | Accepted receipt shows public inputs, proof digest, contract link, and on-chain verify tx. | verified receipt paths | receipt_montage | repeated link animation | QA frame 04 |
| `05_reopen` | 10 | Show the result travels. | A second browser can reopen it. | Show read-only receipt from second context; show missing-id recovery. | read-only receipt | shared receipt URL | The copied URL reopens without a signer. | second-context screenshot | result_montage | extra panel | QA frame 05 |
| `06_mechanism` | 11 | Explain why Stellar and ZK matter. | The mechanism runs in code. | Reveal prove (browser), verify (Soroban), anchor (Stellar) with source paths. | trust boundary card | `src/services/proof.ts`, `contracts/grantdrop_verifier/`, `src/services/stellar.ts` | GrantDrop proves in the browser, verifies on-chain, and anchors a public receipt. | contract + verified receipt paths | architecture reveal | decorative 3D tilt | QA frame 06 |
| `07_ask` | 7 | Give one next action. | I know what to open. | Show live URL, contract on Stellar Expert, README evidence. | submission package | live demo and README | Open the live campaign, claim, and follow the on-chain verification. | submission copy board | outro lockup | extra contact list | QA frame 07 |

## Treatment Rules

- Each scene chooses one primary treatment.
- Captions and lower-thirds support the screen action.
- Any treatment that makes the receipt harder to read gets cut.
- Do not stack component_lift, marker sweep, result_montage, 3D tilt, and captions at the same timestamp.
- QA frames must read like product launch frames, not raw screen shares with stickers.

## QA Frames To Extract

- [x] 00:05 cold open complete package
- [x] first belief checkpoint
- [x] first action begins
- [x] result artifact peak frame
- [x] inspection path open
- [x] mechanism full state
- [x] outro lockup

Reject and rerender if any QA frame:

- looks like a plain screen share with stickers;
- contains developer-only transport output as the main result;
- has unreadable text;
- clips a floating card or lifted component;
- lets captions cover the active UI;
- uses effects that do not clarify the judge belief.

Run the director-board audit (hackathonhunter `scripts/audit_video_director.mjs`) against the repo root before accepting the render.
