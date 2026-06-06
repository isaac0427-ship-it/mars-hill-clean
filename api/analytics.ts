export const config = { runtime: "edge" };

const GA_API = "https://analyticsdata.googleapis.com/v1beta";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function b64url(input: ArrayBuffer | string): string {
  const bytes = typeof input === "string"
    ? new TextEncoder().encode(input)
    : new Uint8Array(input);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function importKey(pem: string): Promise<CryptoKey> {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8", der.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false, ["sign"]
  );
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  }));
  const msg = `${header}.${payload}`;
  const key = await importKey(privateKey);
  const sigBuf = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(msg));
  const jwt = `${msg}.${b64url(sigBuf)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth2:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

async function gaReport(
  propertyId: string,
  token: string,
  body: object
): Promise<Response> {
  return fetch(`${GA_API}/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export default async function handler(req: Request): Promise<Response> {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

  const propertyId = (typeof process !== "undefined" ? process.env.GA_PROPERTY_ID : undefined) ?? "";
  const serviceAccountRaw = (typeof process !== "undefined" ? process.env.GOOGLE_SERVICE_ACCOUNT_KEY : undefined) ?? "";

  if (!propertyId || !serviceAccountRaw) {
    return new Response(JSON.stringify({ configured: false }), { status: 200, headers: cors });
  }

  try {
    const sa = JSON.parse(serviceAccountRaw) as { client_email: string; private_key: string };
    const token = await getAccessToken(sa.client_email, sa.private_key);

    const today = new Date();
    const startOfMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
    const dateRange = { startDate: startOfMonth, endDate: "today" };

    const [visitorsRes, pagesRes, downloadsRes, contactRes] = await Promise.all([
      gaReport(propertyId, token, {
        dateRanges: [dateRange],
        metrics: [{ name: "activeUsers" }],
      }),
      gaReport(propertyId, token, {
        dateRanges: [dateRange],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
      gaReport(propertyId, token, {
        dateRanges: [dateRange],
        dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { value: "file_download" } } },
        metrics: [{ name: "eventCount" }],
      }),
      gaReport(propertyId, token, {
        dateRanges: [dateRange],
        dimensionFilter: { filter: { fieldName: "eventName", stringFilter: { value: "contact_form_submit" } } },
        metrics: [{ name: "eventCount" }],
      }),
    ]);

    type GARow = { dimensionValues: { value: string }[]; metricValues: { value: string }[] };
    type GAResponse = { rows?: GARow[] };

    const [v, p, d, c] = await Promise.all([
      visitorsRes.json() as Promise<GAResponse>,
      pagesRes.json() as Promise<GAResponse>,
      downloadsRes.json() as Promise<GAResponse>,
      contactRes.json() as Promise<GAResponse>,
    ]);

    return new Response(JSON.stringify({
      configured: true,
      visitors: v.rows?.[0]?.metricValues?.[0]?.value ?? "0",
      topPages: (p.rows ?? []).map((r) => ({
        path: r.dimensionValues[0].value,
        views: r.metricValues[0].value,
      })),
      pdfDownloads: d.rows?.[0]?.metricValues?.[0]?.value ?? "0",
      contactSubmissions: c.rows?.[0]?.metricValues?.[0]?.value ?? "0",
    }), { status: 200, headers: cors });
  } catch (e: unknown) {
    return new Response(
      JSON.stringify({ configured: true, error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: cors }
    );
  }
}
