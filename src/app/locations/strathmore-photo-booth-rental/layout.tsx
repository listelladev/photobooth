import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strathmore Photo Booth Rental | Fun & Interactive Event Booths",
  description: "Strathmore photo booth rentals for weddings, rodeos, and events. Multiple booth options, easy setup, and engaging guest experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
