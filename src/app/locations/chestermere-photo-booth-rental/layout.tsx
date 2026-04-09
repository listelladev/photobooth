import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chestermere Photo Booth Rental | Lake Events & Parties",
  description: "Chestermere photo booth rentals for weddings, lake parties, and events. Multiple booth options, easy setup, and unforgettable guest experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
