/** Public helpers for the internal demo admin email (safe in client bundles). */

export const DEMO_ADMIN_EMAIL = "admin@inz.lol";

export function isDemoAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === DEMO_ADMIN_EMAIL;
}
