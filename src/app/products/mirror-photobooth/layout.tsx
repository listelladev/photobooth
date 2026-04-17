import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mirror Photo Booth Rental Calgary",
  description:
    "Book a mirror photo booth rental in Calgary for a sleek, interactive event experience. Full-length mirror booth with custom branding, printing, and instant sharing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
