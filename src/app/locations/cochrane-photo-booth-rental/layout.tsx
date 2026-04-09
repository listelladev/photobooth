import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cochrane Photo Booth Rental | Fun & Interactive Event Booths",
  description: "Cochrane photo booth rentals for weddings, parties, and festivals. Multiple booth options, easy setup, and memorable guest experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
