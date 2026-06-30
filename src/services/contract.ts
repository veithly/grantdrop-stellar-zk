import type { ClientSigner } from "@/services/stellar";
import { ensureFunded } from "@/services/stellar";
import type { OnChainVerification, ProofEvidence } from "@/types";
import { expectedSecretSquare } from "@/services/proof";

// Deployed Soroban BN254 Groth16 verifier on Stellar testnet.
export const VERIFIER_CONTRACT_ID = "CA7KNPNRCI7I4RRWRJ4H5BJP4SLKPUEWJYSLYH4HWJTOVEDR7FEFU2X2";
export const VERIFIER_CONTRACT_EXPERT_URL = `https://stellar.expert/explorer/testnet/contract/${VERIFIER_CONTRACT_ID}`;

const RPC_URL = "https://soroban-testnet.stellar.org";
const FIELD_MODULUS = 21888242871839275222246405745257275088696311157297823662689037894645226208583n;

function hexToBytes(hex: string) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return arr;
}

// G1 = be(X,32) || be(Y,32), 64 bytes (soroban-sdk BN254 serialization).
function g1Hex(arr: (string | number)[]) {
  const x = (BigInt(String(arr[0])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  const y = (BigInt(String(arr[1])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  return x + y;
}

// G2 = be(X_c1) || be(X_c0) || be(Y_c1) || be(Y_c0), 128 bytes (soroban Fp2 order).
function g2Hex(arr: (string | number)[][]) {
  const xc0 = (BigInt(String(arr[0][0])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  const xc1 = (BigInt(String(arr[0][1])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  const yc0 = (BigInt(String(arr[1][0])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  const yc1 = (BigInt(String(arr[1][1])) % FIELD_MODULUS).toString(16).padStart(64, "0");
  return xc1 + xc0 + yc1 + yc0;
}

/**
 * Verify the Groth16 proof ON-CHAIN by invoking the deployed Soroban verifier.
 *
 * The contract runs the native BN254 pairing check (Protocol 25 host functions,
 * CAP-0074) and enforces eligibility by checking the public secretSquare
 * commitment. This submits a real, signed testnet transaction from the
 * claimant's signer, so the proof's validity is decided on-chain and the
 * invocation is inspectable on Stellar Expert. The accepted claim is gated on
 * this returning true (see src/App.tsx).
 */
export async function verifyProofOnChain(
  evidence: ProofEvidence,
  signer: ClientSigner,
): Promise<OnChainVerification> {
  const base: OnChainVerification = {
    contractId: VERIFIER_CONTRACT_ID,
    contractInspectUrl: VERIFIER_CONTRACT_EXPERT_URL,
    verified: false,
    expectedSecretSquare,
  };

  const proof = evidence.proof;
  if (!proof) return base;

  try {
    // Dynamic import keeps the heavy stellar-sdk out of the initial bundle.
    const stellarSdk = await import("@stellar/stellar-sdk");
    const { rpc, xdr, nativeToScVal, Contract, TransactionBuilder, Networks, BASE_FEE, scValToNative } = stellarSdk;

    const server = new rpc.Server(RPC_URL);
    await ensureFunded(signer.publicKey);

    const vk = await fetch(evidence.verificationKeyPath).then((r) => r.json());

    const bytesVal = (hex: string) => nativeToScVal(hexToBytes(hex));
    const u256Val = (dec: string) => nativeToScVal(BigInt(dec), { type: "u256" });
    const sym = (s: string) => xdr.ScVal.scvSymbol(s);
    // Soroban #[contracttype] structs are ScMaps with key-sorted symbol entries.
    const structSorted = (obj: Record<string, unknown>) =>
      xdr.ScVal.scvMap(
        Object.keys(obj)
          .sort()
          .map((k) => new xdr.ScMapEntry({ key: sym(k), val: obj[k] as never })),
      );

    const vkScVal = structSorted({
      alpha: bytesVal(g1Hex(vk.vk_alpha_1)),
      beta: bytesVal(g2Hex(vk.vk_beta_2)),
      gamma: bytesVal(g2Hex(vk.vk_gamma_2)),
      delta: bytesVal(g2Hex(vk.vk_delta_2)),
      ic: xdr.ScVal.scvVec(vk.IC.map((ic: (string | number)[]) => bytesVal(g1Hex(ic)))),
    });
    const proofScVal = structSorted({
      a: bytesVal(g1Hex(proof.pi_a)),
      b: bytesVal(g2Hex(proof.pi_b)),
      c: bytesVal(g1Hex(proof.pi_c)),
    });
    const pubSignals = xdr.ScVal.scvVec(evidence.publicSignals.map(u256Val));
    const expectedSS = u256Val(expectedSecretSquare);

    const contract = new Contract(VERIFIER_CONTRACT_ID);
    const call = contract.call("verify_claim", vkScVal, proofScVal, pubSignals, expectedSS);
    const account = await server.getAccount(signer.publicKey);
    const tx = new TransactionBuilder(account, { fee: BASE_FEE, networkPassphrase: Networks.TESTNET })
      .addOperation(call)
      .setTimeout(60)
      .build();

    // Simulate first: an invalid proof / wrong secret traps here, so we fail
    // fast without spending a transaction.
    const sim = await server.simulateTransaction(tx);
    if (rpc.Api.isSimulationError(sim)) return base;

    // Broadcast the signed invocation so the on-chain verification is a real,
    // inspectable testnet transaction.
    const prepared = await server.prepareTransaction(tx);
    prepared.sign(signer.keypair);
    const sent = await server.sendTransaction(prepared);
    if (sent.status === "ERROR") return base;

    let got = await server.getTransaction(sent.hash);
    for (let i = 0; i < 40 && got.status === "NOT_FOUND"; i++) {
      await new Promise((r) => setTimeout(r, 1500));
      got = await server.getTransaction(sent.hash);
    }
    if (got.status === "SUCCESS" && got.returnValue && scValToNative(got.returnValue) === true) {
      return { ...base, verified: true, invocationTxHash: sent.hash };
    }
    return base;
  } catch {
    // Network/runtime failure: report unverified. The claim is gated on
    // verified === true, so it will not be accepted on a failed check.
    return base;
  }
}
