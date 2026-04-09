import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Okotoks Photo Booth Rental | Fun & Interactive Event Booths",
  description: "Okotoks photo booth rentals for weddings, parties, and community events. Multiple booth options, easy setup, and memorable guest experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
