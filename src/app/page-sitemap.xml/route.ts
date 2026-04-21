import { BASE_URL, buildUrlset, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

export function GET() {
  return xmlResponse(
    buildUrlset([
      { loc: `${BASE_URL}/`, lastmod: LAST_MOD, changefreq: "monthly", priority: 1.0 },
      { loc: `${BASE_URL}/about`, lastmod: LAST_MOD, changefreq: "yearly", priority: 0.7 },
      { loc: `${BASE_URL}/contact`, lastmod: LAST_MOD, changefreq: "yearly", priority: 0.6 },
      { loc: `${BASE_URL}/terms`, lastmod: LAST_MOD, changefreq: "yearly", priority: 0.3 },
    ])
  );
}
