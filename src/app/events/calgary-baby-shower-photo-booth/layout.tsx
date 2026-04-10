import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Baby Shower Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary baby shower photo booth rentals with themed props, custom frames, and unlimited prints. A fun, memorable addition to any baby shower in Calgary.",
};

export default function BabyShowerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
