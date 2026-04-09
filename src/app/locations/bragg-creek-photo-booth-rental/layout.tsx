import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bragg Creek Photo Booth Rental | Weddings & Mountain Events",
  description: "Bragg Creek photo booth rentals for weddings, retreats, and events. Mountain-ready setups, premium booths, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
