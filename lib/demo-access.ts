/** Shared trial admin for IN Z product demos. */

export const DEMO_ADMIN_EMAIL = "admin@inz.lol";
export const DEMO_ADMIN_PASSWORD = "admin2026";

export function isDemoAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === DEMO_ADMIN_EMAIL;
}

export function isValidDemoAdmin(email: string, password: string): boolean {
  return isDemoAdminEmail(email) && password === DEMO_ADMIN_PASSWORD;
}
