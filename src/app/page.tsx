import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Pricing from "@/components/Pricing";
import Benefits from "@/components/Benefits";
import WhatToExpect from "@/components/WhatToExpect";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CursorTag />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Benefits />
        <Pricing />
        <WhatToExpect />
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(24px, 5vw, 80px) clamp(24px, 5vw, 80px) 0", lineHeight: 0 }}>
          <div style={{ borderRadius: "clamp(12px, 1.5vw, 24px)", overflow: "hidden" }}>
            <img
              src="/full-image-home.jpg"
              alt=""
              style={{ width: "100%", height: "clamp(280px, 45vw, 680px)", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
        <Testimonials />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
    </>
  );
}
