import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Longview Photo Booth Rental | Ranch Weddings & Rodeo Events",
  description: "Longview photo booth rentals for ranch weddings, rodeos, and events. Wind-ready setups, premium booths, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
