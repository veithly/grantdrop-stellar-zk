# User Cases: GrantDrop

## User case 1: Private microgrant claim (HERO PATH)

- User: an eligible builder claiming a community microgrant.
- Situation: the campaign needs to pay eligible people without collecting or publishing their private credential.
- Pain: the claimant wants the grant but does not want to expose why they qualify.
- Trigger: a campaign link says a grant slot is open.
- Desired outcome: claim once and leave with a public paid receipt.
- Product response: validate the hidden condition, block duplicate claims with a nullifier, and record the accepted result on Stellar.
- Demo-visible moment: the claim card flips from pending to paid and shows a Stellar receipt.

## User case 2: Duplicate-claim block

- User: the same claimant, or someone reusing the same private eligibility secret.
- Situation: a campaign must avoid paying the same private credential twice.
- Pain: public allowlists leak identity, but private claims can invite double spending if not checked.
- Trigger: the claimant submits the same eligibility input again.
- Desired outcome: the second claim is blocked without revealing the credential.
- Product response: the nullifier matches the prior claim and the app shows already claimed with the original receipt reference.
- Demo-visible moment: the duplicate card shakes red and links to the first claim state.

## User case 3: Campaign operator inspection

- User: a grant program or community operator.
- Situation: the operator wants to prove funds were distributed by rule without seeing every private credential.
- Pain: normal grant review asks people to overshare, while opaque payouts reduce trust.
- Trigger: after a claim round, the operator opens a receipt.
- Desired outcome: inspect who received a public result and why the system accepted or rejected claims, without exposing private inputs.
- Product response: receipt exposes claim state, nullifier, public inputs, and Stellar reference while hiding the eligibility secret.
- Demo-visible moment: Inspect receipt opens the proof and Stellar path behind the paid receipt.
