import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Suspense } from "react";

import { AuthProvider } from "@/components/auth-context";
import "./globals.css";
import { FixedButtons } from "../components/FixedButtons";

export const metadata: Metadata = {
  title: "Sri Lanka Tour Packages | Sri Lanka Holidays",
  description:
    "Experience Sri Lanka with our professional drivers and quality vehicles. Airport transfers, city tours, and travel packages across the beautiful island.",
  keywords:
    "Sri Lanka travel, transportation, drivers, vehicles, tours, airport transfer",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${poppins.variable}`}
      >
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
          <Analytics />
          <FixedButtons />
        </AuthProvider>
      </body>
    </html>
  );
}
