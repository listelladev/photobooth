import { BASE_URL, xmlResponse } from "@/lib/sitemap";

const LAST_MOD = new Date().toISOString();

const sitemaps = [
  "page-sitemap.xml",
  "product-sitemap.xml",
  "event-sitemap.xml",
  "activity-sitemap.xml",
  "location-sitemap.xml",
];

export function GET() {
  const entries = sitemaps
    .map(
      (name) =>
        `  <sitemap>\n    <loc>${BASE_URL}/${name}</loc>\n    <lastmod>${LAST_MOD}</lastmod>\n  </sitemap>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return xmlResponse(xml);
}
