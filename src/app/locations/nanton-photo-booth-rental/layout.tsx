import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nanton Photo Booth Rental | Garden Weddings & Events",
  description: "Nanton photo booth rentals for weddings, fundraisers, and events. Wind-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
