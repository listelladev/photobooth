import { BASE_URL, buildUrlset, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

const primaryLocations = ["calgary-photo-booth-rental"];

const secondaryLocations = [
  "airdrie-photo-booth-rental",
  "okotoks-photo-booth-rental",
  "chestermere-photo-booth-rental",
  "cochrane-photo-booth-rental",
  "canmore-photo-booth-rental",
  "banff-photo-booth-rental",
  "strathmore-photo-booth-rental",
];

const tertiaryLocations = [
  "bragg-creek-photo-booth-rental",
  "crossfield-photo-booth-rental",
  "carstairs-photo-booth-rental",
  "didsbury-photo-booth-rental",
  "olds-photo-booth-rental",
  "sundre-photo-booth-rental",
  "three-hills-photo-booth-rental",
  "drumheller-photo-booth-rental",
  "turner-valley-photo-booth-rental",
  "longview-photo-booth-rental",
  "nanton-photo-booth-rental",
  "claresholm-photo-booth-rental",
  "vulcan-photo-booth-rental",
  "milo-photo-booth-rental",
];

export function GET() {
  return xmlResponse(
    buildUrlset([
      { loc: `${BASE_URL}/locations`, lastmod: LAST_MOD, changefreq: "monthly", priority: 0.9 },
      ...primaryLocations.map((slug) => ({
        loc: `${BASE_URL}/locations/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.9,
      })),
      ...secondaryLocations.map((slug) => ({
        loc: `${BASE_URL}/locations/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.7,
      })),
      ...tertiaryLocations.map((slug) => ({
        loc: `${BASE_URL}/locations/${slug}`,
        lastmod: LAST_MOD,
        changefreq: "monthly" as const,
        priority: 0.6,
      })),
    ])
  );
}
