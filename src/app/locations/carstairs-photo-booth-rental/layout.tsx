import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carstairs Photo Booth Rental | Weddings & Community Events",
  description: "Carstairs photo booth rentals for weddings, grad ceremonies, and events. Reliable setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
