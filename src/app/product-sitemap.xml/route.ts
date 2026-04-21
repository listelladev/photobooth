import { BASE_URL, buildUrlset, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

const products = [
  "mirror-photobooth",
  "premium-pole-photobooth",
  "compact-pole-photobooth",
  "ai-photobooth",
  "360-videobooth",
  "audio-guestbook",
  "instant-high-quality-printing",
  "premium-backdrops",
];

export function GET() {
  return xmlResponse(
    buildUrlset([
      { loc: `${BASE_URL}/products`, lastmod: LAST_MOD, changefreq: "monthly", priority: 0.9 },
      ...products.map((slug) => ({
        loc: `${BASE_URL}/products/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.8,
      })),
    ])
  );
}
