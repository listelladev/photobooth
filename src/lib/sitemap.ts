export const BASE_URL = "https://photoboothexperience.ca";

export function xmlResponse(xml: string) {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}

export function buildUrlset(
  urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[]
) {
  const entries = urls
    .map(({ loc, lastmod, changefreq, priority }) => {
      return [
        `  <url>`,
        `    <loc>${loc}</loc>`,
        lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
        changefreq ? `    <changefreq>${changefreq}</changefreq>` : "",
        priority !== undefined ? `    <priority>${priority}</priority>` : "",
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}
