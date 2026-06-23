# Demo Interaction Plan: GrantDrop

## Demo Spine

- Scene: a proof-gated microgrant claim.
- User role: claimant.
- Judge role: claimant controlling the hidden input.
- Dominant action: Claim grant.
- Result artifact: GrantDrop receipt.
- Inspection path: receipt -> proof/public inputs -> Stellar tx or contract state -> README command.

## Timed Beats

### 0-10s

- Screen opens on one campaign: "ZK Builder Microgrant".
- The primary card says: "Claim a grant without exposing why you qualify."
- Judge sees three selectable private inputs: valid, invalid, already used.
- No verifier, contract selector, or admin table appears on the first screen.

### 10-30s

- Judge selects a private input and connects or uses the configured Stellar signer.
- Judge clicks Claim grant.
- UI shows a pending claim state tied to one wallet address and one campaign.

### 30-60s

- Valid path: claim card drops into the grant box and flips into a paid receipt.
- Invalid path: claim card stays locked with rejected state.
- Duplicate path: receipt area shakes red and shows already claimed.
- The result changes when the judge changes the input.

### 60-90s

- Judge opens Inspect receipt.
- App shows nullifier, public inputs, claim state, tx or contract reference, and command path.
- README command can reproduce proof verification or Stellar inspection.

## 5-Second Hero Clip

```
0:00 private eligibility card enters the grant box
0:01 proof seal animates behind the card
0:02 receipt flips to PAID
0:03 Stellar tx/contract badge appears
0:04 duplicate card shakes red as ALREADY CLAIMED
```

## Judge Participation

- Input A: valid private condition -> paid receipt.
- Input B: invalid private condition -> rejected receipt.
- Input C: same valid condition again -> already claimed.
- Wallet action: connect/sign for the claim path; read-only replay skips wallet.

## Visual Staging

- Product-native surface: grant claim booth, not a dashboard.
- Success frame: one high-contrast receipt with status, campaign, claim amount, nullifier, and Stellar reference.
- Inspection stays secondary and opens after success.

## Recovery Behavior

- Wallet missing: show Connect wallet required before claim.
- Proof failure: show rejected state and keep claim button available with changed input.
- Duplicate nullifier: show already claimed and link to the prior receipt state.
- Stellar tx pending: show pending state, then success or failed state; never mark paid before a tx/state reference exists.
