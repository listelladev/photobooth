import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Calgary Photo Booth Rental",
  description:
    "Ready to book a Calgary photo booth rental? Get an instant quote in minutes. Reach out today for AI booths, 360 video booths, mirror booths, and premium add-ons.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
