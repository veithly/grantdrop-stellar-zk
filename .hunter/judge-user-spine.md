# Judge/User Spine: GrantDrop

Checklist terms: judge, user, what they see, what they do, proof, failure, next state.

## Five seconds

### Judge
- What they see: one microgrant campaign, private input chips, and a Claim grant CTA.
- What they do: choose valid or invalid input.
- What proves value: the empty receipt frame shows what will change.
- What can go wrong: first-screen confusion about proof; fix by keeping proof behind the receipt.
- What state appears next: claim attempt with signer requirement.

### User
- What they see: claim a Stellar grant receipt without exposing why you qualify.
- What they do: start the claim without a modal tour.
- What proves value: visible receipt target and one-claim rule.
- What can go wrong: wallet missing; recovery is signer strip.
- What state appears next: signer/proof workbench.

## Thirty seconds

### Judge
- What they see: signer connected and proof/tx rail starting.
- What they do: sign the claim.
- What proves value: signature, proof, and transaction states are visible.
- What can go wrong: signature rejected or proof unavailable.
- What state appears next: proof pending or rejected.

### User
- What they see: contextual progress, not a verifier dashboard.
- What they do: wait or change input after a rejected state.
- What proves value: result state depends on input.
- What can go wrong: pending tx; recovery is pending state plus diagnostic.
- What state appears next: terminal receipt.

## Sixty seconds

### Judge
- What they see: accepted, rejected, or already-claimed receipt.
- What they do: inspect the receipt.
- What proves value: saved receipt, nullifier, proof/public inputs, and Stellar reference.
- What can go wrong: live inspection degraded; recovery is stored reference and command path.
- What state appears next: public receipt replay.

### User
- What they see: receipt with next-step inspection and copy link.
- What they do: share or reopen receipt.
- What proves value: output is traceable and saved.
- What can go wrong: receipt not found; recovery is return to campaign and diagnostic.
- What state appears next: receipt history/replay surface.

## Five minutes

### Judge
- What they see: valid, invalid, duplicate, receipt replay, and degraded paths.
- What they do: vary input, reload, open saved receipt, and inspect evidence.
- What proves value: product still works after variation.
- What can go wrong: limitation is stated as testnet and unaudited.
- What state appears next: continued receipt inspection loop.

### User
- What they see: reason to return through receipt links.
- What they do: reuse, rerun, compare, or share.
- What proves value: persistence, ownership, and public inspection.
- What can go wrong: abuse/cost/access boundary; recovery is rate-limit and support path.
- What state appears next: saved receipt library in the post-hackathon product backlog.
