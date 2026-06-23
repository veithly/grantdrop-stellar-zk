import {
  BASE_FEE,
  Horizon,
  Keypair,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";
import type { StellarEvidence } from "@/types";

const horizonUrl = "https://horizon-testnet.stellar.org";
const friendbotUrl = "https://friendbot.stellar.org";

export interface ClientSigner {
  type: "client";
  publicKey: string;
  keypair: Keypair;
}

export function createClientSigner(): ClientSigner {
  const keypair = Keypair.random();
  return {
    type: "client",
    publicKey: keypair.publicKey(),
    keypair,
  };
}

async function ensureFunded(publicKey: string) {
  const server = new Horizon.Server(horizonUrl);
  try {
    await server.loadAccount(publicKey);
  } catch {
    const response = await fetch(`${friendbotUrl}?addr=${encodeURIComponent(publicKey)}`);
    if (!response.ok) throw new Error("Friendbot could not fund the testnet signer.");
  }
}

export async function submitReceiptMarker(params: {
  signer: ClientSigner;
  receiptId: string;
  nullifier: string;
}) {
  const server = new Horizon.Server(horizonUrl);
  await ensureFunded(params.signer.publicKey);
  const account = await server.loadAccount(params.signer.publicKey);
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.manageData({
        name: `GrantDrop:${params.receiptId}`.slice(0, 64),
        value: params.nullifier.slice(0, 64),
      }),
    )
    .setTimeout(45)
    .build();

  tx.sign(params.signer.keypair);
  const result = await server.submitTransaction(tx);
  const txHash = result.hash;

  return {
    network: "testnet",
    account: params.signer.publicKey,
    txHash,
    ledger: result.ledger,
    operation: "manageData",
    inspectUrl: `https://stellar.expert/explorer/testnet/tx/${txHash}`,
  } satisfies StellarEvidence;
}
