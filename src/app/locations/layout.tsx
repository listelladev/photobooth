import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Booth Rentals in Calgary & Surrounding Cities",
  description:
    "Find photo booth rentals in Calgary and surrounding cities — Airdrie, Cochrane, Okotoks, Canmore, and more across Southern Alberta. We cover a 200km radius of Calgary.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
