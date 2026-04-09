import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canmore Photo Booth Rental | Mountain Events & Weddings",
  description: "Canmore photo booth rentals for weddings, festivals, and retreats. Mountain-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
