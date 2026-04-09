import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vulcan Photo Booth Rental | Weddings, Fairs & Events",
  description: "Vulcan photo booth rentals for weddings, festivals, and backyard events. Prairie-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
