# Public Copy Facts: GrantDrop

> Required before README, deck, narration, subtitles, or submission copy is finalized.
> This file is the source of public wording. It is not public copy.

## Language lock

- Project language: English
- Source: Stellar Hacks ZK listing and `stack.lock.json.project_language`
- Public copy rule: every UI, README, narration, slide, and submission sentence uses English; paths, commands, API names, URLs, and product/technology names stay in their official form.
- Required copy skills: `stop-slop` and English `humanizer` were loaded and recorded in `.hunter/external-skill-usage.json` before final public copy.

## One product sentence

A grant claimant uses GrantDrop to turn a private eligibility choice into an accepted Stellar testnet receipt.

## Scene

- User: an eligible builder claiming a microgrant.
- Situation: the builder wants a grant receipt without putting the private eligibility fact on the public page.
- Pain / pressure: public allowlists expose why someone qualifies, while private payout decisions leave no public check.
- First action: open `/campaigns/zk-builder-microgrant`, choose the valid private input, use the testnet signer, and click `Claim grant`.
- Visible result: the receipt card changes to `ACCEPTED` and shows wallet, nullifier, proof policy, and Stellar tx hash.
- Inspectable artifact: `/receipts/gd_c5c586b94b?r=...` opens a read-only receipt with public inputs, proof digest, and a Stellar Expert link.
- Number / threshold: public smoke created accepted desktop and mobile receipts, then reopened the desktop receipt from a second browser context.
- Real limitation: GrantDrop ships one fixed Stellar testnet campaign and does not move mainnet funds.
- Next milestone: connect an external credential source and durable campaign storage while keeping the same receipt inspection path.

## Vocabulary

Use:
- Stellar testnet receipt
- private eligibility input
- public receipt URL
- nullifier
- proof digest
- Stellar Expert transaction

Translate before public copy:
- `proof` -> public inputs, proof digest, and verification command
- `evidence` -> receipt URL, screenshot, runtime report, or Stellar Expert transaction link
- `claim table` -> verified receipt and runtime paths

Do not use in public copy:
- Internal audit jargon
- Generic AI brochure language
- Binary contrast slogans
- Category-first hackathon framing
- Helper tooling names

Exact blocklist source: `scripts/lib/copy_rules.mjs`

## Public surfaces

| Surface | First sentence | Artifact/link shown |
| --- | --- | --- |
| README | A grant claimant chooses a private eligibility input, signs with a Stellar testnet signer, and receives a reopenable receipt with a Groth16 proof digest and Stellar transaction link. | `docs/assets/grantdrop-desktop-accepted.png` and https://grantdrop-stellar-zk.pages.dev |
| Slide 1 | Private eligibility drops public Stellar grant receipts. | accepted receipt screenshot |
| Narration first line | A reviewer opens GrantDrop, signs a private grant claim, and receives a public Stellar testnet receipt. | live campaign route and accepted receipt |
| Submission tagline | A reviewer opens GrantDrop and receives an accepted Stellar receipt. | live receipt route and Stellar Expert link |

## Decision

Decision: PASS
