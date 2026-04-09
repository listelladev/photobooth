import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claresholm Photo Booth Rental | Weddings & Local Events",
  description: "Claresholm photo booth rentals for weddings, stampedes, and events. Prairie-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
