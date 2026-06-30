# Public Copy Facts: GrantDrop

> Required before README, deck, narration, subtitles, or submission copy is finalized.
> This file is the source of public wording. It is not public copy.

## Language lock

- Project language: English
- Source: Stellar Hacks ZK listing and `stack.lock.json.project_language`
- Public copy rule: every UI, README, narration, slide, and submission sentence uses English; paths, commands, API names, URLs, and product/technology names stay in their official form.
- Required copy skills: `stop-slop` and English `humanizer` applied before final public copy.

## One product sentence

A grant claimant uses GrantDrop to turn a private eligibility choice into an accepted Stellar testnet receipt whose Groth16 proof is verified on-chain by a Soroban contract.

## Scene

- User: an eligible builder claiming a microgrant.
- Situation: the builder wants a grant receipt without putting the private eligibility fact on the public page.
- Pain / pressure: public allowlists expose why someone qualifies, while private reviews protect the claimant but leave reviewers with no durable public receipt to inspect.
- First action: open `/campaigns/zk-builder-microgrant`, choose the valid private input, use the testnet signer, and click `Claim grant`.
- Visible result: the receipt card changes to `ACCEPTED` only after the Soroban verifier confirms the proof on-chain; it shows wallet, nullifier, proof policy, the on-chain verify tx, and the Stellar receipt tx.
- Inspectable artifact: `/receipts/gd_c5c586b94b?r=...` opens a read-only receipt with public inputs, proof digest, the verifier contract link, and a Stellar Expert link.
- Number / threshold: the contract's `cargo test` passes 4/4 (valid accepted, tampered proof rejected, wrong secret rejected, wrong wallet rejected); accepted desktop/mobile receipts reopen from a second browser context.
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
- on-chain Groth16 verification
- Soroban verifier contract
- BN254 host functions (CAP-0074)

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
| README | A grant claimant chooses a private eligibility input, signs with a Stellar testnet signer, and receives a reopenable receipt whose Groth16 proof is verified on-chain by a Soroban contract. | `docs/assets/grantdrop-desktop-accepted.png` and https://grantdrop-stellar-zk.pages.dev |
| Slide 1 | Private eligibility becomes a public Stellar receipt, with the proof verified on-chain. | accepted receipt screenshot |
| Narration first line | A grant claimant opens GrantDrop, generates a private eligibility proof, and gets an accepted Stellar receipt only after a Soroban contract verifies the proof on-chain. | live campaign route and accepted receipt |
| Submission tagline | Private eligibility becomes an accepted Stellar receipt, verified on-chain in Soroban. | live receipt route and Stellar Expert link |

## Wording guardrails

- Do not say in public copy: payout, paid, disbursed, grant payment, mainnet, custody, KYC, or audited — those paths are not implemented.
- Approved boundary wording: GrantDrop verifies the Groth16 proof on-chain in a deployed Soroban contract (BN254 host functions, CAP-0074) which gates the accepted receipt, then anchors a public receipt marker through a signed Stellar testnet `manageData` transaction.
- Honesty qualifier to keep attached when describing eligibility: the verifier is reusable and the campaign eligibility value is supplied by the app per call, not stored on-chain.
- Remove or keep internal-only (never in README/deck/narration/submission): "Next milestone: connect an external credential source and durable campaign storage…"

## Decision

Decision: PASS (on-chain verification wording applied; boundary accurate after the Soroban verifier shipped)
