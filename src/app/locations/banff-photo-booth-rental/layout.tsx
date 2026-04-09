import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banff Photo Booth Rental | Luxury Mountain Weddings & Events",
  description: "Banff photo booth rentals for luxury weddings and mountain events. Premium booth options, weather-ready setups, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
