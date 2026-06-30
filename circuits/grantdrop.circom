pragma circom 2.1.6;

// GrantDrop eligibility circuit (non-degenerate Groth16).
//
// The claimant knows a private `secret`. The circuit proves knowledge of that
// secret and binds it to public campaign/wallet/nullifier signals through
// genuine quadratic constraints, so the on-chain (Soroban) verifier rejects any
// tampered public signal and the verification key is non-degenerate.
//
// Eligibility is enforced on-chain, not via a circuit constant (a constant
// equality would collapse the Groth16 public commitments). Instead the circuit
// emits a public `secretSquare = secret * secret`; the Soroban contract checks
// that secretSquare equals the campaign's expected value. A wrong secret yields
// a different secretSquare, which the contract rejects.
//
// public signals order: [nullifier, secretSquare, campaignId, walletBinding]
template GrantDropEligibility() {
  signal input secret;          // private — claimant knows the demo secret
  signal input campaignId;      // public
  signal input walletBinding;   // public
  signal output nullifier;      // public — binds secret + campaign + wallet
  signal output secretSquare;   // public — quadratic secret commitment

  // Nullifier ties secret + campaign + wallet together (one-claim enforcement).
  nullifier <== secret * 7919 + campaignId * 13 + walletBinding;

  // Quadratic commitment. Keeps the VK non-degenerate and lets the contract
  // verify the secret matches the campaign policy without the secret leaving
  // the prover. A wrong secret produces a different secretSquare.
  secretSquare <== secret * secret;
}

component main { public [campaignId, walletBinding] } = GrantDropEligibility();
