# Judge Red-Team: GrantDrop

## Inputs

- Live URL: https://grantdrop-stellar-zk.pages.dev
- README: `README.md`
- Video: `pitch/recording/pitch-demo-combined-final.mp4`
- Deck: separate deck omitted; README, video, and live app are the review surfaces.
- SUBMISSION.md: `SUBMISSION.md`
- Claim matrix: `.hunter/claim-matrix.json`

## Fatal Objections

| Objection | Evidence checked | Status | Required action |
|---|---|---|---|
| I cannot tell what it does in 10 seconds. | README first viewport, video first 30s, submission preview | pass | Closed |
| I cannot operate the URL. | `https://grantdrop-stellar-zk.pages.dev/campaigns/zk-builder-microgrant` and `.hunter/runtime-interaction.report.json` | pass | Closed |
| The result looks unverified. | `.hunter/public-smoke.report.json`, `.hunter/public-chain-verification.json`, accepted receipt screenshot | pass | Closed |
| The sponsor/domain tech is decorative. | `src/services/stellar.ts`, Stellar Expert tx links, Groth16 proof command | pass | Closed |
| The copy sounds like a template. | `pitch/public-copy-scorecard.md`, human-copy audit, README opening | pass | Closed |
| Public artifacts disagree. | README, `SUBMISSION.md`, video outline, claim matrix | pass | Closed |

## 10-Second Recall

| Reader | User | Action | Result | Artifact/link | Result |
|---|---|---|---|---|---|
| 1 | eligible builder | signs a private grant claim | accepted Stellar receipt | live URL plus `docs/assets/grantdrop-desktop-accepted.png` | PASS |
| 2 | grant reviewer | opens the receipt | sees proof digest and tx hash | `.hunter/public-smoke.report.json` | PASS |
| 3 | second reviewer | opens copied receipt URL | read-only receipt appears without signer | `docs/assets/grantdrop-second-context.png` | PASS |

Pass rule: at least 2 of 3 readers can recall user, action, result, and artifact/link.

## Conditional Language Check

- First-pass copy contains "with keys installed": no
- First-pass copy contains "production plan": no
- First-pass copy contains "credential blocker": no
- First-pass copy contains "can show either": no
- First-pass copy contains "configured status": no
- First-pass copy contains "would show" or "future integration": no

Pass rule: all answers are no, unless the phrase appears only in limitations and is backed by a live proof ID.

## Red-Team Objections

- Objection 1: The Stellar transaction could be decorative -> answer and inspection path: `src/services/stellar.ts` creates and submits the signed testnet `manageData` tx; `.hunter/public-chain-verification.json` records verified tx hashes.
- Objection 2: The ZK proof might be a label -> answer and inspection path: `src/services/proof.ts` runs Groth16 verification, and `npm run proof:verify` returns snarkJS OK.
- Objection 3: The receipt replay could depend on local browser state -> answer and inspection path: `.hunter/runtime-interaction.report.json` includes a second-context route check, and `docs/assets/grantdrop-second-context.png` shows the reopened receipt.

## Verdict

- Open fatal objections: 0
- Cold recall: PASS
- Conditional language: PASS
- Decision: PASS

## Required Fixes Before Submit

- Ready for human submission review.
