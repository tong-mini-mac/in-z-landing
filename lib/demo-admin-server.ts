/**
 * Server-only demo admin password check.
 * Never import this module from client components — password must not ship in the browser bundle.
 */

import { isDemoAdminEmail } from "@/lib/demo-access";

export function demoAdminPassword(): string {
  return (
    process.env.INZ_DEMO_ADMIN_PASSWORD ||
    process.env.DEMO_ADMIN_PASSWORD ||
    ""
  ).trim();
}

export function isValidDemoAdmin(email: string, password: string): boolean {
  const expected = demoAdminPassword();
  if (!expected || !password) return false;
  return isDemoAdminEmail(email) && password === expected;
}
