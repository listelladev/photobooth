"use client";

import AnimatedText, { AnimLine } from "./AnimatedText";
import RevealOnScroll from "./RevealOnScroll";

const areas = [
  { name: "Calgary", slug: "calgary-photo-booth-rental" },
  { name: "Airdrie", slug: "airdrie-photo-booth-rental" },
  { name: "Cochrane", slug: "cochrane-photo-booth-rental" },
  { name: "Okotoks", slug: "okotoks-photo-booth-rental" },
  { name: "Strathmore", slug: "strathmore-photo-booth-rental" },
  { name: "Chestermere", slug: "chestermere-photo-booth-rental" },
  { name: "Canmore", slug: "canmore-photo-booth-rental" },
  { name: "Banff", slug: "banff-photo-booth-rental" },
  { name: "Drumheller", slug: "drumheller-photo-booth-rental" },
  { name: "Olds", slug: "olds-photo-booth-rental" },
  { name: "Didsbury", slug: "didsbury-photo-booth-rental" },
  { name: "Carstairs", slug: "carstairs-photo-booth-rental" },
  { name: "Turner Valley", slug: "turner-valley-photo-booth-rental" },
  { name: "Nanton", slug: "nanton-photo-booth-rental" },
  { name: "Crossfield", slug: "crossfield-photo-booth-rental" },
  { name: "Three Hills", slug: "three-hills-photo-booth-rental" },
  { name: "Vulcan", slug: "vulcan-photo-booth-rental" },
  { name: "Claresholm", slug: "claresholm-photo-booth-rental" },
  { name: "Sundre", slug: "sundre-photo-booth-rental" },
  { name: "Bragg Creek", slug: "bragg-creek-photo-booth-rental" },
  { name: "Milo", slug: "milo-photo-booth-rental" },
  { name: "Longview", slug: "longview-photo-booth-rental" },
];

export default function ServiceAreas() {
  return (
    <section style={{ padding: "clamp(80px, 10vw, 140px) 0", background: "#fff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)", textAlign: "center" }}>

        <AnimatedText
          as="h2"
          className="font-heading"
          style={{
            fontSize: "clamp(40px, 7vw, 100px)",
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            color: "#141414",
            marginBottom: "clamp(24px, 3vw, 36px)",
          }}
          stagger={90}
        >
          <AnimLine>We serve Calgary</AnimLine>
          <AnimLine>&amp; surrounding areas.</AnimLine>
        </AnimatedText>

        <RevealOnScroll>
          <p
            style={{
              fontSize: "clamp(16px, 1.2vw, 20px)",
              fontWeight: 400,
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto clamp(48px, 6vw, 72px)",
            }}
          >
            Photobooth Experience proudly provides premium photo booth experiences for every special occasion in Calgary and surrounding areas.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "clamp(10px, 1.2vw, 14px)",
              justifyContent: "center",
            }}
          >
            {areas.map((area) => (
              <a
                key={area.slug}
                href={`/locations/${area.slug}`}
                style={{
                  fontSize: "clamp(14px, 1vw, 16px)",
                  fontWeight: 500,
                  color: "#141414",
                  textDecoration: "none",
                  padding: "9px 22px",
                  borderRadius: 60,
                  border: "1px solid #e5e7eb",
                  transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#141414";
                  e.currentTarget.style.borderColor = "#141414";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.color = "#141414";
                }}
              >
                {area.name}
              </a>
            ))}
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
