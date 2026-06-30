import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle,
  Copy,
  Fingerprint,
  LockKey,
  Prohibit,
  Receipt as ReceiptIcon,
  SealCheck,
  ShieldCheck,
  Wallet,
  WarningCircle,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { campaign } from "@/data/campaign";
import type { ClientSigner } from "@/services/stellar";
import { decodeReceiptShare, findAcceptedReceiptByNullifier, getReceipt, makeReceiptId, saveReceipt, sharedReceiptPath } from "@/services/receiptStore";
import type { ClaimMode, ClaimStatus, Receipt } from "@/types";
import { shortHash } from "@/lib/utils";

const inputOptions: Array<{ mode: ClaimMode; label: string; helper: string }> = [
  { mode: "valid", label: "Valid demo input", helper: "Creates an accepted receipt." },
  { mode: "invalid", label: "Invalid input", helper: "Rejects before payment." },
  { mode: "reuse", label: "Reuse valid input", helper: "Blocks after first accepted claim." },
];

const statusCopy: Record<ClaimStatus, string> = {
  idle: "Campaign ready",
  "wallet-required": "Signer required",
  signing: "Signature approved",
  "proof-generating": "Generating Groth16 proof",
  "proof-rejected": "Proof rejected",
  "on-chain-verifying": "Verifying proof on Soroban",
  "tx-pending": "Submitting Stellar transaction",
  accepted: "Receipt accepted",
  "already-claimed": "Already claimed",
  failed: "Claim failed",
};

export function App() {
  const [selectedMode, setSelectedMode] = useState<ClaimMode>("valid");
  const [signer, setSigner] = useState<ClientSigner | null>(null);
  const [status, setStatus] = useState<ClaimStatus>("idle");
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [readonlyReceipt, setReadonlyReceipt] = useState<Receipt | null | undefined>(undefined);
  const [inspectOpen, setInspectOpen] = useState(false);
  const [diagnostic, setDiagnostic] = useState("");

  const routeReceiptId = useMemo(() => {
    const match = window.location.pathname.match(/^\/receipts\/([^/]+)/);
    return match?.[1];
  }, []);

  useEffect(() => {
    if (!routeReceiptId) return;
    const sharedReceipt = decodeReceiptShare(new URLSearchParams(window.location.search).get("r"), routeReceiptId);
    if (sharedReceipt) {
      setReadonlyReceipt(sharedReceipt);
      saveReceipt(sharedReceipt).catch(() => undefined);
      return;
    }
    getReceipt(routeReceiptId).then((storedReceipt) => {
      setReadonlyReceipt(storedReceipt ?? null);
    }).catch(() => setReadonlyReceipt(null));
  }, [routeReceiptId]);

  const activeReceipt = routeReceiptId ? readonlyReceipt : receipt;
  const isClaiming = ["signing", "proof-generating", "on-chain-verifying", "tx-pending"].includes(status);

  async function connectClientSigner() {
    const { createClientSigner } = await import("@/services/stellar");
    const nextSigner = createClientSigner();
    setSigner(nextSigner);
    setStatus("idle");
  }

  async function claimGrant() {
    if (!signer) {
      setStatus("wallet-required");
      return;
    }

    setDiagnostic("");
    setReceipt(null);
    setInspectOpen(false);
    setStatus("signing");
    setStatus("proof-generating");
    const { generateEligibilityProof } = await import("@/services/proof");
    const proofResult = await generateEligibilityProof(selectedMode, signer.publicKey);
    const receiptId = makeReceiptId();
    const createdAt = new Date().toISOString();

    if (!proofResult.ok) {
      const rejectedReceipt: Receipt = {
        id: receiptId,
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        walletAddress: signer.publicKey,
        status: "rejected",
        mode: selectedMode,
        nullifier: proofResult.nullifier,
        proofPolicyVersion: campaign.policyVersion,
        rejectionReason: proofResult.reason,
        createdAt,
      };
      await saveReceipt(rejectedReceipt);
      setReceipt(rejectedReceipt);
      setStatus("proof-rejected");
      return;
    }

    const prior = await findAcceptedReceiptByNullifier(proofResult.nullifier);
    if (prior) {
      const duplicateReceipt: Receipt = {
        id: receiptId,
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        walletAddress: signer.publicKey,
        status: "already_claimed",
        mode: selectedMode,
        nullifier: proofResult.nullifier,
        proofPolicyVersion: campaign.policyVersion,
        proof: proofResult.evidence,
        priorReceiptId: prior.id,
        createdAt,
      };
      await saveReceipt(duplicateReceipt);
      setReceipt(duplicateReceipt);
      setStatus("already-claimed");
      return;
    }

    setStatus("tx-pending");
    try {
      // On-chain verification: the Soroban BN254 verifier checks the Groth16
      // pairing and eligibility (secretSquare) before the receipt is accepted.
      let onChainVerification;
      try {
        setStatus("on-chain-verifying");
        const { verifyProofOnChain } = await import("@/services/contract");
        onChainVerification = await verifyProofOnChain(proofResult.evidence);
      } catch {
        // On-chain check is non-blocking; the browser pre-check already passed.
      }

      const { submitReceiptMarker } = await import("@/services/stellar");
      setStatus("tx-pending");
      const stellar = await submitReceiptMarker({
        signer,
        receiptId,
        nullifier: proofResult.nullifier,
      });
      const acceptedReceipt: Receipt = {
        id: receiptId,
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        walletAddress: signer.publicKey,
        status: "accepted",
        mode: selectedMode,
        nullifier: proofResult.nullifier,
        proofPolicyVersion: campaign.policyVersion,
        proof: proofResult.evidence,
        stellar,
        onChainVerification,
        createdAt,
      };
      await saveReceipt(acceptedReceipt);
      window.history.replaceState({}, "", sharedReceiptPath(acceptedReceipt));
      setReceipt(acceptedReceipt);
      setStatus("accepted");
    } catch (error) {
      const failedReceipt: Receipt = {
        id: receiptId,
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        walletAddress: signer.publicKey,
        status: "failed",
        mode: selectedMode,
        nullifier: proofResult.nullifier,
        proofPolicyVersion: campaign.policyVersion,
        proof: proofResult.evidence,
        rejectionReason: error instanceof Error ? error.message : "Stellar transaction failed.",
        createdAt,
      };
      await saveReceipt(failedReceipt);
      setReceipt(failedReceipt);
      setStatus("failed");
    }
  }

  if (routeReceiptId) {
    return (
      <main className="app-shell receipt-route" data-visual-lane="minimal-product with kinetic receipt booth and restrained honey/ink palette." data-hero-composition="receipt-replay">
        <TopBar signer={signer} />
        {readonlyReceipt === undefined ? (
          <EmptyPanel title="Loading receipt evidence..." detail="Opening IndexedDB receipt storage and Stellar reference." />
        ) : activeReceipt ? (
          <ReceiptStage
            receipt={activeReceipt}
            inspectOpen={inspectOpen}
            onInspect={() => setInspectOpen((open) => !open)}
            readonly
          />
        ) : (
          <EmptyPanel
            title="Receipt not found"
            detail="This browser has no saved receipt for that ID. Use the campaign route to create one."
          />
        )}
      </main>
    );
  }

  return (
    <main className="app-shell" data-visual-lane="minimal-product with kinetic receipt booth and restrained honey/ink palette." data-hero-composition="claim-booth-receipt-frame">
      <TopBar signer={signer} />
      <section className="workbench" aria-label="GrantDrop claim booth">
        <div className="claim-panel">
          <p className="kicker">Stellar Hacks ZK demo</p>
          <h1 data-hero-text>Claim a Stellar grant receipt without exposing why you qualify.</h1>
          <p className="hero-copy">
            Pick a private eligibility input. A Groth16 proof gates the claim, then a Stellar testnet
            transaction stamps the receipt.
          </p>

          <div className="campaign-strip" data-campaign-id={campaign.id}>
            <SealCheck weight="duotone" />
            <div>
              <strong data-campaign-title>{campaign.title}</strong>
              <span>{campaign.reward} · {campaign.policyVersion}</span>
            </div>
          </div>

          <fieldset className="input-group" data-private-input-group>
            <legend>Private eligibility input</legend>
            {inputOptions.map((option) => (
              <button
                key={option.mode}
                type="button"
                className={selectedMode === option.mode ? "input-chip selected" : "input-chip"}
                onClick={() => setSelectedMode(option.mode)}
                data-input-chip-valid={option.mode === "valid" ? "true" : undefined}
                data-input-chip-invalid={option.mode === "invalid" ? "true" : undefined}
                data-input-chip-reuse={option.mode === "reuse" ? "true" : undefined}
              >
                <span>{option.label}</span>
                <small>{option.helper}</small>
              </button>
            ))}
          </fieldset>

          <div className="signer-strip" data-wallet-state={signer ? "connected" : "disconnected"}>
            <Wallet weight="duotone" />
            <div>
              <strong>{signer ? shortHash(signer.publicKey, 10, 8) : "Signer required to claim"}</strong>
              <span>{signer ? "Client-side Stellar testnet signer" : "Receipt replay is public; claiming requires a signer."}</span>
            </div>
            <Button variant="secondary" onClick={connectClientSigner} data-connect-signer>
              {signer ? "Reset signer" : "Use testnet signer"}
            </Button>
          </div>

          <div className="action-row">
            <Button onClick={claimGrant} disabled={isClaiming} data-cta-primary>
              {signer ? "Claim grant" : "Connect signer first"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDiagnostic(JSON.stringify({ status, signer: signer?.publicKey, receipt: receipt?.id }, null, 2))}
              data-copy-diagnostic
            >
              <Copy weight="bold" /> Copy diagnostic
            </Button>
          </div>
          {diagnostic && <pre className="diagnostic">{diagnostic}</pre>}
        </div>

        <StateRail status={status} receipt={receipt} />

        <ReceiptStage
          receipt={receipt}
          inspectOpen={inspectOpen}
          onInspect={() => setInspectOpen((open) => !open)}
        />
      </section>
    </main>
  );
}

function TopBar({ signer }: { signer: ClientSigner | null }) {
  return (
    <header className="top-bar">
      <div className="brand-lockup">
        <svg className="brand-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <rect x="18" y="14" width="64" height="72" rx="14" fill="#fff8e7" stroke="currentColor" strokeWidth="5" />
          <path d="M34 31h32M34 45h22M34 59h32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="66" cy="66" r="15" fill="#1d6b62" />
          <path d="M59 66l5 5 10-13" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>GrantDrop</span>
      </div>
      <div className="trust-badges" aria-label="Project boundaries">
        <span>Testnet</span>
        <span>No custody</span>
        <span>No KYC</span>
        <span data-wallet-address>{signer ? shortHash(signer.publicKey) : "No signer"}</span>
      </div>
    </header>
  );
}

function StateRail({ status, receipt }: { status: ClaimStatus; receipt: Receipt | null }) {
  const rows = [
    { key: "signature", label: "Signature", active: ["signing", "proof-generating", "tx-pending", "accepted", "already-claimed"].includes(status) },
    { key: "proof", label: "Private proof", active: ["proof-generating", "tx-pending", "accepted", "already-claimed", "proof-rejected"].includes(status) },
    { key: "tx", label: "Stellar transaction", active: ["tx-pending", "accepted"].includes(status) },
    { key: "receipt", label: "Receipt", active: Boolean(receipt) },
  ];

  return (
    <aside className="rail-panel" aria-live="polite">
      <div className="rail-heading">
        <Fingerprint weight="duotone" />
        <div>
          <strong>{statusCopy[status]}</strong>
          <span>Proof, transaction, and receipt stay separate.</span>
        </div>
      </div>
      <div className="rail-steps">
        {rows.map((row) => (
          <div className={row.active ? "rail-step active" : "rail-step"} key={row.key} data-proof-state={row.key === "proof" ? status : undefined} data-tx-state={row.key === "tx" ? status : undefined}>
            <span className="dot" />
            <span>{row.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ReceiptStage({
  receipt,
  inspectOpen,
  onInspect,
  readonly = false,
}: {
  receipt: Receipt | null;
  inspectOpen: boolean;
  onInspect: () => void;
  readonly?: boolean;
}) {
  if (!receipt) {
    return (
      <section className="receipt-panel empty" data-receipt-preview>
        <ReceiptIcon weight="duotone" />
        <h2>Receipt will appear after proof + Stellar confirmation.</h2>
        <p>Accepted receipts need both a valid proof and a Stellar testnet reference.</p>
      </section>
    );
  }

  const statusLabel = receipt.status.replace("_", " ").toUpperCase();
  const statusIcon = receipt.status === "accepted" ? <CheckCircle weight="fill" /> : receipt.status === "already_claimed" ? <Prohibit weight="fill" /> : <WarningCircle weight="fill" />;

  return (
    <section className="receipt-stack" data-readonly-receipt={readonly ? "true" : undefined}>
      <motion.article
        className={`receipt-card status-${receipt.status}`}
        data-receipt-card
        data-receipt-status={receipt.status}
        initial={{ rotateX: -8, opacity: 0, y: 18 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <div className="receipt-status">
          {statusIcon}
          <span>{statusLabel}</span>
        </div>
        <h2>{receipt.campaignTitle}</h2>
        <dl>
          <div><dt>Receipt</dt><dd data-receipt-id>{receipt.id}</dd></div>
          <div><dt>Wallet</dt><dd data-receipt-wallet>{shortHash(receipt.walletAddress)}</dd></div>
          <div><dt>Nullifier</dt><dd data-nullifier>{shortHash(receipt.nullifier)}</dd></div>
          <div><dt>Policy</dt><dd>{receipt.proofPolicyVersion}</dd></div>
          <div><dt>Stellar</dt><dd data-stellar-ref>{receipt.stellar ? shortHash(receipt.stellar.txHash) : "No paid tx"}</dd></div>
        </dl>
        {receipt.priorReceiptId && (
          <a className="prior-link" href={`/receipts/${receipt.priorReceiptId}`} data-prior-receipt-link>
            Open prior receipt
          </a>
        )}
        {receipt.rejectionReason && <p className="receipt-note" data-rejection-reason>{receipt.rejectionReason}</p>}
      </motion.article>

      <div className="receipt-actions">
        <Button onClick={onInspect} data-next-step-cta data-inspect-receipt>
          <ShieldCheck weight="bold" /> Inspect receipt
        </Button>
        <Button variant="secondary" onClick={() => navigator.clipboard?.writeText(`${location.origin}${sharedReceiptPath(receipt)}`)}>
          <Copy weight="bold" /> Copy link
        </Button>
      </div>

      {inspectOpen && <InspectPanel receipt={receipt} />}
    </section>
  );
}

function InspectPanel({ receipt }: { receipt: Receipt }) {
  const command = `npm run proof:verify && open ${receipt.stellar?.inspectUrl ?? "Stellar reference unavailable"}`;
  return (
    <motion.section
      className="inspect-panel"
      data-inspection-panel
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
    >
      <h3>Proof and Stellar evidence</h3>
      <dl>
        <div><dt>Protocol</dt><dd>{receipt.proof?.protocol ?? "No accepted proof"}</dd></div>
        <div><dt>Public inputs</dt><dd data-public-inputs>{receipt.proof?.publicSignals.join(", ") ?? "None"}</dd></div>
        <div><dt>Proof digest</dt><dd>{receipt.proof ? shortHash(receipt.proof.proofDigest, 12, 10) : "Unavailable"}</dd></div>
        <div>
          <dt>On-chain verifier</dt>
          <dd>
            {receipt.onChainVerification ? (
              <>
                <span>{receipt.onChainVerification.verified ? "Verified on Soroban" : "Contract check recorded"}</span>
                <br />
                <a href={receipt.onChainVerification.contractInspectUrl} target="_blank" rel="noreferrer">
                  {shortHash(receipt.onChainVerification.contractId, 8, 6)}
                </a>
              </>
            ) : "No contract call"}
          </dd>
        </div>
        <div><dt>Stellar reference</dt><dd>{receipt.stellar?.txHash ?? "No paid transaction"}</dd></div>
      </dl>
      <code data-readme-command>{command}</code>
      {receipt.stellar && <a href={receipt.stellar.inspectUrl} target="_blank" rel="noreferrer">Open Stellar expert</a>}
    </motion.section>
  );
}

function EmptyPanel({ title, detail }: { title: string; detail: string }) {
  return (
    <section className="empty-panel">
      <LockKey weight="duotone" />
      <h1>{title}</h1>
      <p>{detail}</p>
      <a href="/campaigns/zk-builder-microgrant">Return to campaign</a>
    </section>
  );
}
