import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Milo Photo Booth Rental | Farm Weddings & Country Events",
  description: "Milo photo booth rentals for weddings, farm events, and reunions. Portable setups, prairie-ready booths, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
