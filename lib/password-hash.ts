import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const SCHEME = "pbkdf2_sha256";
const ITERATIONS = 260_000;
const KEYLEN = 32;

/** Match Atlas `hash_password` format: pbkdf2_sha256$iterations$salt$hex */
export function hashPassword(password: string, salt?: string): string {
  const saltValue = salt || randomBytes(16).toString("hex");
  const digest = pbkdf2Sync(password, saltValue, ITERATIONS, KEYLEN, "sha256");
  return `${SCHEME}$${ITERATIONS}$${saltValue}$${digest.toString("hex")}`;
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  const parts = passwordHash.split("$");
  if (parts.length !== 4 || parts[0] !== SCHEME) return false;
  const iterations = Number(parts[1]);
  const salt = parts[2];
  const expectedHex = parts[3];
  if (!Number.isFinite(iterations) || !salt || !expectedHex) return false;
  const digest = pbkdf2Sync(password, salt, iterations, KEYLEN, "sha256");
  const expected = Buffer.from(expectedHex, "hex");
  const actual = Buffer.from(digest.toString("hex"), "hex");
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}
