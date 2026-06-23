import type { Receipt } from "@/types";

const dbName = "grantdrop-demo";
const storeName = "receipts";
const dbVersion = 1;

export type D1DatabaseCompatibleReceiptStore = IDBDatabase;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: "id" });
        store.createIndex("byNullifier", "nullifier", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveReceipt(receipt: Receipt) {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    tx.objectStore(storeName).put(receipt);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
}

export async function getReceipt(id: string) {
  const db = await openDb();
  const receipt = await new Promise<Receipt | undefined>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const request = tx.objectStore(storeName).get(id);
    request.onsuccess = () => resolve(request.result as Receipt | undefined);
    request.onerror = () => reject(request.error);
  });
  db.close();
  return receipt;
}

export async function findAcceptedReceiptByNullifier(nullifier: string) {
  const db = await openDb();
  const receipt = await new Promise<Receipt | undefined>((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const request = tx.objectStore(storeName).index("byNullifier").openCursor(IDBKeyRange.only(nullifier));
    request.onsuccess = () => {
      const cursor = request.result;
      if (!cursor) {
        resolve(undefined);
        return;
      }
      const value = cursor.value as Receipt;
      if (value.status === "accepted") {
        resolve(value);
        return;
      }
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
  });
  db.close();
  return receipt;
}

export function makeReceiptId() {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  const suffix = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `gd_${suffix}`;
}

export function encodeReceiptShare(receipt: Receipt) {
  const json = JSON.stringify(receipt);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeReceiptShare(payload: string | null, expectedId?: string) {
  if (!payload) return null;
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const receipt = JSON.parse(new TextDecoder().decode(bytes)) as Receipt;
    if (!receipt?.id || (expectedId && receipt.id !== expectedId)) return null;
    return receipt;
  } catch {
    return null;
  }
}

export function sharedReceiptPath(receipt: Receipt) {
  return `/receipts/${receipt.id}?r=${encodeURIComponent(encodeReceiptShare(receipt))}`;
}
