import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Guestbook Rental Calgary",
  description:
    "Capture heartfelt voice messages with an audio guestbook rental in Calgary. A timeless keepsake for weddings, milestone birthdays, and every special celebration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
