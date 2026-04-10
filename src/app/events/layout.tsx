import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Event Photo Booth Rentals | Weddings, Birthdays & More",
  description:
    "Calgary photo booth rentals for every occasion — weddings, birthdays, baby showers, corporate events, gender reveals, and festivals. Setup and attendant always included.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
