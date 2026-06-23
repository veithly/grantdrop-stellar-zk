## Slide 1: Private eligibility drops public Stellar grant receipts.

# Private eligibility drops public Stellar grant receipts.

An eligible builder opens GrantDrop, chooses a private input, signs with the Stellar testnet signer, and receives an accepted receipt with a proof digest and transaction hash.

Artifact: `docs/assets/grantdrop-desktop-accepted.png`
Inspect: `https://grantdrop-stellar-zk.pages.dev/receipts/gd_c5c586b94b?r=...`

## Slide 2: The pressure

The claimant wants the grant, but the public page should not reveal why they qualify.

On screen: private input chips, one claim button, and an empty receipt frame.
Result to watch: the receipt frame changes only after proof and Stellar transaction steps finish.

## Slide 3: Live claim

A reviewer opens `/campaigns/zk-builder-microgrant`, keeps the valid private input, uses the testnet signer, and clicks `Claim grant`.

The browser run produces an `ACCEPTED` receipt with wallet, nullifier, policy, and Stellar reference.

## Slide 4: Inspect the result

The receipt opens its inspection panel with Groth16 public inputs, proof digest, verification asset paths, and the Stellar Expert transaction link.

The same receipt URL opens in a second browser context without a signer.

## Slide 5: Why Stellar and ZK are required

GrantDrop keeps the private eligibility input off the receipt, publishes the nullifier and proof digest, and stamps the accepted claim through a Stellar testnet `manageData` transaction.

Implementation paths: `src/services/proof.ts`, `src/services/stellar.ts`, `src/services/receiptStore.ts`.
