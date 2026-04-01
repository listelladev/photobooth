import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photobooth Experience | Calgary's Premium Photo Booth Rentals",
  description:
    "Offering premium photo booth rentals across Calgary and nearby areas. Classic booths, mirror booths, and 360 video booths for weddings, corporate events, and celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dmd8jzo.css" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
