import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Delhi Metro Commute AI Agent",
  description: "GTFS-Optimized Multi-Modal Guidance System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[#070A13] text-[#F9FAFB]">{children}</body>
    </html>
  );
}