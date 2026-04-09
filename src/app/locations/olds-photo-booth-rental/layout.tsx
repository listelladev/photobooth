import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Olds Photo Booth Rental | Weddings, Grads & Events",
  description: "Olds photo booth rentals for weddings, grad ceremonies, and events. Reliable setups, multiple booth options, and seamless service.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
