import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drumheller Photo Booth Rental | Badlands Events & Weddings",
  description: "Drumheller photo booth rentals for weddings, reunions, and badlands events. Dust-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
