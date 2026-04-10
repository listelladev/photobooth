import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Gender Reveal Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary gender reveal photo booth rentals with Team Boy & Team Girl props, custom themed frames, and instant sharing. Capture every reaction at your Calgary gender reveal.",
};

export default function GenderRevealLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
