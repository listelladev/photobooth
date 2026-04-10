import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Corporate Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary corporate photo booth rentals with custom branding, logo frames, and instant social sharing. Elevate your Calgary corporate event, product launch, or holiday party.",
};

export default function CorporateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
