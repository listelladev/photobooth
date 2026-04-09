import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Turner Valley Photo Booth Rental | Foothills Weddings & Events",
  description: "Turner Valley photo booth rentals for weddings, grads, and events. Wind-ready setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
