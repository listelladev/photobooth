import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Photo Booth Rental Calgary",
  description:
    "Book an AI photo booth rental in Calgary for your next event. Real-time AI portraits, instant digital sharing, and a unique guest experience unlike anything else.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
