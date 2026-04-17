import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Backdrops Rental Calgary",
  description:
    "Choose from a stunning library of premium backdrop rentals in Calgary. Professional backdrops for weddings, corporate events, and every celebration — included with every booth.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
