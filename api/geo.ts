/**
 * Returns the visitor's country code based on Vercel's edge geolocation.
 *
 * Replaces a previous client-side call to https://ipapi.co/json/ which suffered
 * from CORS restrictions and free-tier rate limiting (HTTP 429), polluting the
 * browser console and forcing E2E suites to ignore the origin.
 *
 * Vercel automatically attaches `x-vercel-ip-country` to every incoming request
 * in production, so no third-party API call is needed. In local dev the header
 * is absent and we return `null` — the client then falls through to the
 * configured fallback language.
 *
 * Types are inlined to avoid taking on a runtime dep on @vercel/node; Vercel
 * provides full types in its build environment.
 */

interface VercelGeoRequest {
  headers: Record<string, string | string[] | undefined>;
}

interface VercelGeoResponse {
  setHeader(name: string, value: string): void;
  status(code: number): VercelGeoResponse;
  json(body: unknown): void;
}

export default function handler(req: VercelGeoRequest, res: VercelGeoResponse) {
  const headerValue = req.headers['x-vercel-ip-country'];
  const countryCode = Array.isArray(headerValue)
    ? headerValue[0] ?? null
    : headerValue ?? null;

  // Cache for an hour at the edge — country rarely changes per IP.
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ country_code: countryCode });
}
