import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTag from "@/components/CursorTag";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Pricing from "@/components/Pricing";
import ClientLogos from "@/components/ClientLogos";
import HomeImageSlider from "@/components/HomeImageSlider";
import Benefits from "@/components/Benefits";
import WhatToExpect from "@/components/WhatToExpect";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import HomepageBookingCTA from "@/components/HomepageBookingCTA";
import ServiceAreas from "@/components/ServiceAreas";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Premium Photo Booth Rentals in Calgary",
  description:
    "Premium photo booth rentals in Calgary & Southern Alberta. AI booths, 360 video booths, mirror booths, and more — perfect for weddings, corporate events, and celebrations.",
};

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
        <ClientLogos />
        <WhatToExpect />
        <HomeImageSlider />
        <Testimonials blobFilter="hue-rotate(90deg) saturate(0.85)" />
        <FAQ />
        <HomepageBookingCTA />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  );
}
