export type BankAccount = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
};

export function getBankAccount(): BankAccount | null {
  const bankName = String(process.env.INZ_BANK_NAME || "").trim();
  const accountName = String(process.env.INZ_BANK_ACCOUNT_NAME || "").trim();
  const accountNumber = String(process.env.INZ_BANK_ACCOUNT_NO || "").trim();
  const branch = String(process.env.INZ_BANK_BRANCH || "").trim();
  if (!bankName || !accountName || !accountNumber) return null;
  return { bankName, accountName, accountNumber, branch };
}

export const SLIP_MAX_BYTES = 4 * 1024 * 1024;
export const SLIP_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
]);
