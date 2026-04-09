import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airdrie Photo Booth Rental | Fun & Interactive Event Booths",
  description: "Airdrie photo booth rentals for weddings, birthdays, and corporate events. Multiple booth options, easy setup, and unforgettable guest experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
