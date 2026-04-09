import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Photo Booth Rental | Fun & Premium Event Booths",
  description:
    "Calgary photo booth rentals for weddings, parties, and corporate events. Multiple booth styles, full setup, and memorable guest experiences.",
};

export default function CalgaryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
