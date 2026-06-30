export type ClaimMode = "valid" | "invalid" | "reuse";

export type ClaimStatus =
  | "idle"
  | "wallet-required"
  | "signing"
  | "proof-generating"
  | "proof-rejected"
  | "on-chain-verifying"
  | "tx-pending"
  | "accepted"
  | "already-claimed"
  | "failed";

export interface Campaign {
  id: string;
  circuitCampaignId: string;
  title: string;
  reward: string;
  policyVersion: string;
  oneClaimRule: string;
}

export interface ProofEvidence {
  protocol: "groth16";
  publicSignals: string[];
  /** Raw snarkjs Groth16 proof (pi_a/pi_b/pi_c), retained for on-chain Soroban verification. */
  proof?: { pi_a: string[]; pi_b: string[][]; pi_c: string[] };
  proofDigest: string;
  verificationKeyPath: string;
  wasmPath: string;
  zkeyPath: string;
}

export interface StellarEvidence {
  network: "testnet";
  account: string;
  txHash: string;
  ledger?: number;
  operation: "manageData";
  inspectUrl: string;
}

export interface OnChainVerification {
  /** Contract ID of the deployed Soroban BN254 Groth16 verifier. */
  contractId: string;
  /** Stellar Expert link to the verifier contract. */
  contractInspectUrl: string;
  /** Whether the on-chain verify_claim call accepted the proof. */
  verified: boolean;
  /** Public secretSquare commitment checked by the contract. */
  expectedSecretSquare: string;
  /** Invocation tx hash, if a real testnet call was made. */
  invocationTxHash?: string;
}

export interface Receipt {
  id: string;
  campaignId: string;
  campaignTitle: string;
  walletAddress: string;
  status: "accepted" | "rejected" | "already_claimed" | "failed" | "pending";
  mode: ClaimMode;
  nullifier: string;
  proofPolicyVersion: string;
  proof?: ProofEvidence;
  stellar?: StellarEvidence;
  onChainVerification?: OnChainVerification;
  priorReceiptId?: string;
  rejectionReason?: string;
  createdAt: string;
}
