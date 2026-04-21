import { BASE_URL, buildUrlset, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

const activities = [
  "wedding",
  "corporate",
  "birthday",
  "festival",
  "baby-shower",
  "gender-reveal",
];

export function GET() {
  return xmlResponse(
    buildUrlset([
      { loc: `${BASE_URL}/activities`, lastmod: LAST_MOD, changefreq: "monthly", priority: 0.8 },
      ...activities.map((slug) => ({
        loc: `${BASE_URL}/activities/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.7,
      })),
    ])
  );
}
