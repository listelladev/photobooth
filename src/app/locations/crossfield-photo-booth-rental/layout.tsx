import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crossfield Photo Booth Rental | Weddings & Community Events",
  description: "Crossfield photo booth rentals for weddings, grads, and events. Reliable setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
