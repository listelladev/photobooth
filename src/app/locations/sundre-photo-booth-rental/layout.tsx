import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundre Photo Booth Rental | Weddings, Rodeos & Events",
  description: "Sundre photo booth rentals for weddings, rodeos, and mountain events. Weather-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
