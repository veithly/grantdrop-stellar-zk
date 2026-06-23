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
| Pitch/deck first, real browser demo second | final MP4 chapters and contact sheet | locked |
| Required TTS provider is used with no fallback | `TTS_PROVIDER=mimo`, `mimo-v2.5-tts`, voice `Chloe`, measured scene durations | locked |
| Stale TTS chunks were regenerated | speech chunks recreated after copy and provider lock | locked |
| Demo is a real browser/app recording | real browser/app recording plus recorder log | locked |
| No screenshot slideshow is allowed | screenshot slideshow is invalid for the demo segment | locked |
| Recorder fails on broken actions | `allow_action_failures=false`, `allow_empty_scenes=false` in the recorder config | locked |
| Timing uses measured narration durations | scene waits align with measured durations | locked |
| Audio/video sync is within 0.5s | ffprobe report and duration check | locked |
| UI is readable in final encode | H.264/AAC, 1080p, 30fps, video bitrate >= 2.5 Mbps, contact sheet checked | locked |
| No blank/silence segment over 2s | blank-frame and silence logs | locked |

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
| `02_live_action` | 14 | Prove a reviewer can run it. | I can do this too. | Real browser selects valid input, uses signer, clicks `Claim grant`. | pending claim state | live URL route | Open the campaign, use the testnet signer, and claim. | runtime report + recorder log | cursor choreography | lower third | QA frame 02 |
| `03_result` | 10 | Show the action worked. | The product changed state. | Real browser waits for `ACCEPTED`. | accepted receipt with tx hash | `/receipts/gd_c5c586b94b?r=...` | The result is an accepted receipt with a Stellar transaction hash. | public smoke report | component_lift | second zoom | QA frame 03 |
| `04_inspection` | 12 | Remove trust gap. | I can check it. | Open `Inspect receipt` and show public inputs plus tx link. | proof digest and tx hash | Stellar Expert + `npm run proof:verify` | The receipt shows public inputs, proof digest, and Stellar Expert. | verified receipt paths | receipt_montage | repeated link animation | QA frame 04 |
| `05_reopen` | 10 | Show the result travels. | A second browser can reopen it. | Show read-only receipt from second context. | read-only receipt | shared receipt URL | The copied URL reopens without a signer. | public smoke report | result_montage | extra panel | QA frame 05 |
| `06_mechanism` | 11 | Explain why Stellar and ZK matter. | The mechanism runs in code. | Reveal prove, stamp, reopen with source paths. | mechanism card | `src/services/proof.ts`, `src/services/stellar.ts`, `src/services/receiptStore.ts` | GrantDrop proves, stamps, and reopens only public receipt fields. | stack lock and verified receipt paths | architecture reveal | decorative 3D tilt | QA frame 06 |
| `07_ask` | 7 | Give one next action. | I know what to open. | Show live URL, README evidence list, and final video path. | submission package | live demo and README | Open the live campaign and inspect the receipt. | submission copy board | outro lockup | extra contact list | QA frame 07 |

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

Run:

```bash
node C:\Users\Ricky\Documents\Project\hackathonhunter-skill\scripts\audit_video_director.mjs .
```
