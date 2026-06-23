import { groth16 } from "snarkjs";
import { campaign, demoSecrets } from "@/data/campaign";
import type { ClaimMode, ProofEvidence } from "@/types";
import { numericBinding, sha256Hex } from "@/lib/utils";

const secretMultiplier = 7919n;
const campaignMultiplier = 13n;

export function computeNullifier(secret: string, walletBinding: bigint) {
  return (
    BigInt(secret) * secretMultiplier +
    BigInt(campaign.circuitCampaignId) * campaignMultiplier +
    walletBinding
  ).toString();
}

export async function buildProofInput(mode: ClaimMode, walletAddress: string) {
  const walletBinding = await numericBinding(walletAddress);
  const secret = mode === "invalid" ? demoSecrets.invalid : demoSecrets.valid;

  return {
    secret,
    campaignId: campaign.circuitCampaignId,
    walletBinding: walletBinding.toString(),
    nullifier: computeNullifier(secret, walletBinding),
  };
}

export async function generateEligibilityProof(mode: ClaimMode, walletAddress: string): Promise<{
  ok: true;
  evidence: ProofEvidence;
  nullifier: string;
} | {
  ok: false;
  nullifier: string;
  reason: string;
}> {
  const input = await buildProofInput(mode, walletAddress);

  try {
    const { proof, publicSignals } = await groth16.fullProve(
      input,
      "/proofs/grantdrop.wasm",
      "/proofs/grantdrop_final.zkey",
    );
    const verificationKey = await fetch("/proofs/verification_key.json").then((response) => response.json());
    const verified = await groth16.verify(verificationKey, publicSignals, proof);
    if (!verified) {
      return {
        ok: false,
        nullifier: input.nullifier,
        reason: "The proof was generated but failed local Groth16 verification.",
      };
    }

    return {
      ok: true,
      nullifier: input.nullifier,
      evidence: {
        protocol: "groth16",
        publicSignals,
        proofDigest: await sha256Hex(JSON.stringify(proof)),
        verificationKeyPath: "/proofs/verification_key.json",
        wasmPath: "/proofs/grantdrop.wasm",
        zkeyPath: "/proofs/grantdrop_final.zkey",
      },
    };
  } catch {
    return {
      ok: false,
      nullifier: input.nullifier,
      reason: "This proof did not satisfy the campaign rule.",
    };
  }
}
