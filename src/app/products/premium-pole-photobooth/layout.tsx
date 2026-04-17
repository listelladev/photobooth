import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Pole Photo Booth Rental Calgary",
  description:
    "Calgary's premium pole photo booth rental — polished finish, high-quality prints, and a sophisticated experience. Perfect for weddings, corporate events, and upscale celebrations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
