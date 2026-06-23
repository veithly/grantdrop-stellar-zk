# Public Copy Cold Read: GrantDrop

> Internal only. Do not paste this into public project surfaces.

## Source facts

- Project language: English
- Language source / override: Stellar Hacks ZK listing and `stack.lock.json.project_language`
- Copy skills loaded: `stop-slop` + `humanizer` recorded in `.hunter/external-skill-usage.json`: yes
- Specific user: eligible builder claiming a microgrant
- Visible action: choose private eligibility, use the Stellar testnet signer, click `Claim grant`
- Result artifact: accepted GrantDrop receipt
- Inspection path: `/receipts/gd_c5c586b94b?r=...`, `Inspect receipt`, Stellar Expert tx link, `npm run proof:verify`
- Real limitation: one fixed campaign on Stellar testnet; no mainnet funds or KYC provider
- Strongest public claim: accepted receipts include Groth16 public signals and a Stellar testnet transaction reference before the UI shows `ACCEPTED`
- Template sections deleted/reordered and why: public surfaces lead with the live receipt result before implementation details so a judge sees the product action first.

## Surface alignment

| Surface | First line shown | Same user/action/result? | Same artifact/link? | Edit |
|---|---|---|---|---|
| README first viewport | A grant claimant chooses a private eligibility input, signs with a Stellar testnet signer, and receives a reopenable receipt with a Groth16 proof digest and Stellar transaction link. | yes | yes | shipped |
| Slide 1 / deck opener | Private eligibility drops public Stellar grant receipts. | yes | yes | expand speaker notes around the accepted receipt |
| Video first 30 seconds | A reviewer opens GrantDrop, signs a private grant claim, and receives a public Stellar testnet receipt. | yes | yes | keep live action inside first 30 seconds |
| Submission preview | A reviewer opens GrantDrop and receives an accepted Stellar receipt. | yes | yes | keep the live URL and receipt URL adjacent |

## Cold-read result

- Reader: reviewer cold-read simulation
- Materials shown: README first viewport, accepted receipt screenshot, video outline, submission preview
- Could repeat the user/action/result after 10 seconds: yes
- Clicked or wanted to click the artifact/demo: yes
- Line that sounded generic or transferable to another project: `privacy-preserving grant platform`
- Edit applied: replaced category wording with `builder chooses private eligibility, signs, receives accepted Stellar receipt`.

## Decision

- Ship public copy: yes
- Remaining line to rewrite: shipped
