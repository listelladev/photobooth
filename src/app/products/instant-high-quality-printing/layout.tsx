import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant High Quality Printing Rental Calgary",
  description:
    "Add instant high quality printing to your Calgary photo booth rental. On-site prints guests can take home as a keepsake — fully managed setup and takedown included.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
