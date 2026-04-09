import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Didsbury Photo Booth Rental | Weddings & Community Events",
  description: "Didsbury photo booth rentals for weddings, grad ceremonies, and events. Reliable setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
