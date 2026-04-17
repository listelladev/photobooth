import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compact Pole Photo Booth Rental Calgary",
  description:
    "Rent a compact pole photo booth in Calgary for any event. Space-saving design, high-quality prints, and a seamless guest experience — setup and takedown included.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
