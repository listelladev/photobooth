import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Wedding Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary wedding photo booth rentals with unlimited prints, custom frames, and a professional on-site attendant. Serving Calgary weddings from intimate ceremonies to grand receptions.",
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
