import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Suspense } from "react"

import { AuthProvider } from "@/components/auth-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "FlyToLanka - Premium Travel & Transportation Services in Sri Lanka",
  description:
    "Experience Sri Lanka with our professional drivers and quality vehicles. Airport transfers, city tours, and travel packages across the beautiful island.",
  keywords: "Sri Lanka travel, transportation, drivers, vehicles, tours, airport transfer",
  generator: "v0.app",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${poppins.variable}`}>
        <AuthProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </Suspense>
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  )
}
