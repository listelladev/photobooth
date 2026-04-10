import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calgary Birthday Photo Booth Rental | Photobooth Experience",
  description:
    "Calgary birthday photo booth rentals with unlimited prints, custom birthday frames, and full setup. The perfect addition to any birthday party in Calgary.",
};

export default function BirthdayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
