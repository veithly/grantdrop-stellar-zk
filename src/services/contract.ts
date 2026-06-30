import type { OnChainVerification, ProofEvidence } from "@/types";
import { expectedSecretSquare } from "@/services/proof";

// Deployed Soroban BN254 Groth16 verifier on Stellar testnet.
export const VERIFIER_CONTRACT_ID = "CA7KNPNRCI7I4RRWRJ4H5BJP4SLKPUEWJYSLYH4HWJTOVEDR7FEFU2X2";
export const VERIFIER_CONTRACT_EXPERT_URL = `https://stellar.expert/explorer/testnet/contract/${VERIFIER_CONTRACT_ID}`;

/**
 * On-chain verification status. The contract runs the native BN254 pairing
 * check (Protocol 25 host functions, CAP-0074) and enforces eligibility by
 * checking the public secretSquare commitment equals the expected value.
 *
 * Browser-side, this currently does a read-only simulation of verify_claim
 * against the live testnet contract. A full (signed) invocation is captured by
 * the deploy script and CLI evidence; the receipt records the contract id and
 * whether the simulation accepted the proof.
 */
export async function verifyProofOnChain(evidence: ProofEvidence): Promise<OnChainVerification> {
  const base: OnChainVerification = {
    contractId: VERIFIER_CONTRACT_ID,
    contractInspectUrl: VERIFIER_CONTRACT_EXPERT_URL,
    verified: false,
    expectedSecretSquare,
  };

  try {
    // Dynamic import keeps the heavy stellar-sdk out of the initial bundle.
    const stellarSdk = await import("@stellar/stellar-sdk");
    const { rpc, nativeToScVal, xdr, Contract } = stellarSdk;

    const server = new rpc.Server("https://soroban-testnet.stellar.org");

    // Build the VK/proof hex (G1=64B, G2=128B big-endian) from the snarkjs JSON.
    const vk = await fetch(evidence.verificationKeyPath).then((r) => r.json());
    const proof = evidence.proof;
    if (!proof) return { ...base, verified: false };

    function g1Hex(arr: (string | number)[]) {
      const p = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;
      const x = (BigInt(String(arr[0])) % p).toString(16).padStart(64, "0");
      const y = (BigInt(String(arr[1])) % p).toString(16).padStart(64, "0");
      return x + y;
    }
    function g2Hex(arr: (string | number)[][]) {
      const p = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;
      const xc0 = (BigInt(String(arr[0][0])) % p).toString(16).padStart(64, "0");
      const xc1 = (BigInt(String(arr[0][1])) % p).toString(16).padStart(64, "0");
      const yc0 = (BigInt(String(arr[1][0])) % p).toString(16).padStart(64, "0");
      const yc1 = (BigInt(String(arr[1][1])) % p).toString(16).padStart(64, "0");
      // Soroban G2 = be(X_c1)||be(X_c0)||be(Y_c1)||be(Y_c0)
      return xc1 + xc0 + yc1 + yc0;
    }

    function bytes(hex: string) {
      const arr = new Uint8Array(hex.length / 2);
      for (let i = 0; i < arr.length; i++) arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
      return nativeToScVal(arr);
    }

    const vkScVal = nativeToScVal({
      alpha: bytes(g1Hex(vk.vk_alpha_1)),
      beta: bytes(g2Hex(vk.vk_beta_2)),
      gamma: bytes(g2Hex(vk.vk_gamma_2)),
      delta: bytes(g2Hex(vk.vk_delta_2)),
      ic: vk.IC.map((ic: (string | number)[]) => bytes(g1Hex(ic))),
    });
    const proofScVal = nativeToScVal({
      a: bytes(g1Hex(proof.pi_a)),
      b: bytes(g2Hex(proof.pi_b)),
      c: bytes(g1Hex(proof.pi_c)),
    });

    function u256(decimalStr: string) {
      // UInt256Parts = 4x u64 limbs: hiHi (MSB), hiLo, loHi, loLo (LSB)
      const v = BigInt(decimalStr);
      const mask = 0xffffffffffffffffn;
      const parts = {
        loLo: v & mask,
        loHi: (v >> 64n) & mask,
        hiLo: (v >> 128n) & mask,
        hiHi: (v >> 192n) & mask,
      };
      return xdr.ScVal.scvU256(new xdr.UInt256Parts(parts as any));
    }
    const pubSignals = xdr.ScVal.scvVec(evidence.publicSignals.map(u256));
    const expectedSS = u256(expectedSecretSquare);

    const contract = new Contract(VERIFIER_CONTRACT_ID);
    // Read-only simulation: no signer needed, verifies the proof on-chain.
    const call = contract.call("verify_claim", vkScVal, proofScVal, pubSignals, expectedSS);
    const account = await server.getAccount("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF");
    const { TransactionBuilder, Networks, BASE_FEE } = stellarSdk;
    const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase: Networks.TESTNET })
      .addOperation(call)
      .setTimeout(30)
      .build();

    const sim = await server.simulateTransaction(tx);
    const ok = !rpc.Api.isSimulationError(sim);
    return { ...base, verified: ok };
  } catch {
    // Network/runtime failure should not block the claim; the browser pre-check
    // already passed and the contract logic is proven by Rust tests.
    return { ...base, verified: false };
  }
}
