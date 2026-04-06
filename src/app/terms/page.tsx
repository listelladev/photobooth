import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar forceDark />
      <main style={{ minHeight: "100vh", background: "#fff" }}>
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            padding: "clamp(120px, 14vw, 180px) clamp(24px, 5vw, 48px) clamp(80px, 10vw, 140px)",
          }}
        >
          {/* Page title */}
          <h1
            className="font-heading"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#1a1a2e",
              marginBottom: 8,
            }}
          >
            General Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: 15, color: "#9ca3af", marginBottom: "clamp(48px, 6vw, 72px)", fontWeight: 400 }}>
            Photobooth Experience Canada
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px, 4vw, 56px)" }}>

            {/* Article 1 */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Article 1: Definitions</h2>
              <p style={body}>
                In these general rental terms and conditions, the following terms are used with the meanings given below, unless explicitly stated otherwise or evident from the context:
              </p>
              <dl style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  ["Photobooth Experience", "The provider of these rental terms and conditions, located in Calgary, AB Canada and registered with the Alberta Jurisdiction."],
                  ["Renter", "The individual or legal entity that enters into an agreement with Photobooth Experience or submits a reservation request."],
                  ["Business Client", "A renter who is a legal entity or an individual acting in the course of their profession or business."],
                  ["Private Client", "A renter who is an individual not acting in a professional or business capacity."],
                  ["Agreement", "The rental contract between Photobooth Experience and the renter."],
                  ["Rented Item", "The photo booth, including all accessories, rented from Photobooth Experience by the renter."],
                  ["Location", "The designated place where the photo booth is to be installed or has been set up by Photobooth Experience."],
                  ["Rental Date", "The date on which the photo booth is made available to the renter by Photobooth Experience."],
                ].map(([term, def]) => (
                  <div key={term} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <dt style={{ fontSize: 15, fontWeight: 700, color: "#1a1a2e" }}>{term}</dt>
                    <dd style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.75, margin: 0 }}>{def}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div style={divider} />

            {/* Article 2 */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Article 2: General Provisions</h2>
              <ol style={orderedList}>
                <li style={listItem}>The agreement is established once Photobooth Experience sends the renter a booking confirmation.</li>
                <li style={listItem}>These general rental terms apply to all quotations from Photobooth Experience and to all agreements between Photobooth Experience and the renter.</li>
              </ol>
            </section>

            <div style={divider} />

            {/* Article 3 */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Article 3: Offers and Prices</h2>
              <ol style={orderedList}>
                <li style={listItem}>All offers from Photobooth Experience are non-binding.</li>
                <li style={listItem}>Obvious errors or mistakes in emails, quotes, or other publications do not bind Photobooth Experience.</li>
              </ol>
            </section>

            <div style={divider} />

            {/* Article 4 */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Article 4: Conclusion of the Agreement</h2>
              <ol style={orderedList}>
                <li style={listItem}>The agreement is finalized once the renter agrees to the quote and receives a confirmation from Photobooth Experience.</li>
              </ol>
            </section>

            <div style={divider} />

            {/* Article 5 */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Article 5: Cancellation Policy</h2>
              <ol style={orderedList}>
                <li style={listItem}>
                  If the renter cancels the agreement two months or less before the rental date, cancellation fees will be charged as follows:
                  <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0, listStyle: "none" }}>
                    {[
                      ["Between 2 months and 1 month before the rental date", "25% of the agreed price."],
                      ["Between 1 month and 1 week before the rental date", "50% of the agreed price."],
                      ["1 week or less before the rental date", "100% of the agreed price."],
                    ].map(([when, fee]) => (
                      <li key={when} style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 15, color: "#4b5563", lineHeight: 1.7 }}>
                        <span style={{ color: "#FF6B35", flexShrink: 0, fontSize: 12 }}>✦</span>
                        <span><strong style={{ color: "#1a1a2e", fontWeight: 600 }}>{when}:</strong> {fee}</span>
                      </li>
                    ))}
                  </ul>
                </li>
                <li style={{ ...listItem, marginTop: 16 }}>Cancellations must be made via email.</li>
              </ol>
            </section>

            <div style={divider} />

            {/* Insurance & Liability */}
            <section>
              <h2 className="font-heading" style={articleHeading}>Insurance &amp; Liability</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
                {[
                  ["Insurance", "The renter is responsible for taking all necessary precautions to protect the photo booth from theft, damage, or vandalism. Photobooth Experience is not liable for any loss, theft, or damage to the renter's property."],
                  ["Usage", "The photo booth must remain at the agreed location and cannot be moved without prior approval from Photobooth Experience. The renter is responsible for monitoring the booth and ensuring proper usage by guests."],
                  ["Damage", "If any damage occurs to the photo booth, the renter will be responsible for the repair or replacement costs of the damaged parts."],
                  ["Safety", "The renter must ensure that the photo booth is placed on a stable and secure surface. In case of adverse weather conditions, the booth must be adequately protected against rain, wind, and other environmental factors."],
                  ["Technical Issues", "In the event of technical problems, Photobooth Experience will attempt to resolve them as soon as possible. If on-site repair is not feasible, a replacement booth will be provided."],
                  ["Liability", "Photobooth Experience is not responsible for any injuries or damages resulting from the use of the photo booth."],
                ].map(([heading, text]) => (
                  <div key={heading as string} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" as const, color: "#1a1a2e", margin: 0 }}>{heading}</p>
                    <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.75, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <div style={divider} />

            {/* Agreement footer */}
            <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, fontStyle: "italic" }}>
              By renting a photo booth from Photobooth Experience, the renter agrees to these general terms and conditions.
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────
const articleHeading: React.CSSProperties = {
  fontSize: "clamp(17px, 1.5vw, 22px)",
  letterSpacing: "-0.02em",
  color: "#1a1a2e",
  marginBottom: 16,
};

const body: React.CSSProperties = {
  fontSize: 15,
  color: "#4b5563",
  lineHeight: 1.8,
};

const orderedList: React.CSSProperties = {
  paddingLeft: 0,
  margin: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const listItem: React.CSSProperties = {
  fontSize: 15,
  color: "#4b5563",
  lineHeight: 1.75,
  paddingLeft: 24,
  position: "relative",
};

const divider: React.CSSProperties = {
  height: 1,
  background: "#f0f0f0",
};
