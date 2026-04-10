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
import BookingCTA from "@/components/BookingCTA";
import ServiceAreas from "@/components/ServiceAreas";
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
        <ClientLogos />
        <WhatToExpect />
        <HomeImageSlider />
        <Testimonials blobFilter="hue-rotate(90deg) saturate(0.85)" />
        <FAQ />
        <BookingCTA />
        <ServiceAreas />
      </main>
      <Footer />
    </>
  );
}
