export type ClaimMode = "valid" | "invalid" | "reuse";

export type ClaimStatus =
  | "idle"
  | "wallet-required"
  | "signing"
  | "proof-generating"
  | "proof-rejected"
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
  priorReceiptId?: string;
  rejectionReason?: string;
  createdAt: string;
}
