import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Festival Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary festival photo booth rentals with custom branding, high-volume throughput, and unlimited prints. The perfect activation for any Calgary festival or community event.",
};

export default function FestivalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
