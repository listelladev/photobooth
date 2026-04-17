import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Photo Booth Rental Packages",
  description:
    "Browse Calgary photo booth rental packages — AI booths, 360 video booths, mirror booths, and premium add-ons. Find the perfect fit for your event and get an instant quote.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
