import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Hills Photo Booth Rental | Weddings & Local Events",
  description: "Three Hills photo booth rentals for weddings, festivals, and events. Prairie-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
