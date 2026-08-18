const OMISE_API = "https://api.omise.co";

export function isOmiseConfigured() {
  return Boolean(String(process.env.OMISE_SECRET_KEY || "").trim());
}

function authHeader() {
  const key = String(process.env.OMISE_SECRET_KEY || "").trim();
  if (!key) throw new Error("OMISE_SECRET_KEY missing");
  return `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
}

async function omiseFetch<T>(
  path: string,
  init?: RequestInit & { form?: Record<string, string> },
): Promise<T> {
  const headers: Record<string, string> = {
    Authorization: authHeader(),
    ...(init?.headers as Record<string, string> | undefined),
  };

  let body = init?.body;
  if (init?.form) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    body = new URLSearchParams(init.form).toString();
  }

  const res = await fetch(`${OMISE_API}${path}`, {
    ...init,
    headers,
    body,
  });
  const json = (await res.json()) as T & { object?: string; message?: string };
  if (!res.ok) {
    throw new Error(
      (json as { message?: string }).message ?? `Omise error ${res.status}`,
    );
  }
  return json;
}

export type OmiseCharge = {
  id: string;
  object: string;
  amount: number;
  currency: string;
  status: string;
  paid: boolean;
  failure_code?: string | null;
  failure_message?: string | null;
  source?: {
    id?: string;
    type?: string;
    scannable_code?: {
      image?: { download_uri?: string };
    };
  } | null;
  authorize_uri?: string | null;
  metadata?: Record<string, string>;
};

function metadataForm(metadata: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => [`metadata[${key}]`, value]),
  );
}

export async function createPromptPayCharge(opts: {
  amountSatang: number;
  description: string;
  metadata: Record<string, string>;
  returnUri: string;
}) {
  return omiseFetch<OmiseCharge>("/charges", {
    method: "POST",
    form: {
      amount: String(opts.amountSatang),
      currency: "THB",
      description: opts.description,
      "source[type]": "promptpay",
      return_uri: opts.returnUri,
      ...metadataForm(opts.metadata),
    },
  });
}

export async function createCardCharge(opts: {
  amountSatang: number;
  description: string;
  cardToken: string;
  metadata: Record<string, string>;
  returnUri: string;
}) {
  return omiseFetch<OmiseCharge>("/charges", {
    method: "POST",
    form: {
      amount: String(opts.amountSatang),
      currency: "THB",
      description: opts.description,
      card: opts.cardToken,
      return_uri: opts.returnUri,
      ...metadataForm(opts.metadata),
    },
  });
}

export async function retrieveCharge(chargeId: string) {
  return omiseFetch<OmiseCharge>(`/charges/${chargeId}`, { method: "GET" });
}

export function getOmisePublicKey() {
  return String(process.env.OMISE_PUBLIC_KEY || "").trim() || null;
}
