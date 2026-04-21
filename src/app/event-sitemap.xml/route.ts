import { BASE_URL, buildUrlset, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

const events = [
  "calgary-wedding-photo-booth",
  "calgary-corporate-photo-booth",
  "calgary-birthday-photo-booth",
  "calgary-festival-photo-booth",
  "calgary-baby-shower-photo-booth",
  "calgary-gender-reveal-photo-booth",
];

export function GET() {
  return xmlResponse(
    buildUrlset([
      { loc: `${BASE_URL}/events`, lastmod: LAST_MOD, changefreq: "monthly", priority: 0.9 },
      ...events.map((slug) => ({
        loc: `${BASE_URL}/events/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.8,
      })),
    ])
  );
}
