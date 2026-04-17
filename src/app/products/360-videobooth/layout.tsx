import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "360 Video Booth Rental Calgary",
  description:
    "Rent a 360 video booth in Calgary for stunning slow-motion guest videos. A showstopping experience for weddings, corporate events, and every celebration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
