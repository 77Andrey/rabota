import type { Metadata, Viewport } from "next"
import { Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { LeadModalProvider } from "@/components/lead-modal-provider"
import { AnalyticsBridge } from "@/components/analytics-bridge"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

const siteName = "burra.io — Россия"
const title = "burra.io — AI‑лендинги под ключ за 24 часа в России"
const description =
  "AI-команда burra.io собирает продающие сайты за 24 часа. Фиксированная цена 30 000 ₽: дизайн, тексты, интеграции, аналитика и онлайн-оплата без сюрпризов."

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://burra.io"),
  openGraph: {
    title,
    description,
    siteName,
    url: "https://burra.io",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "https://burra.io",
  },
}

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <LeadModalProvider>
          {children}
        </LeadModalProvider>
        <AnalyticsBridge />
      </body>
    </html>
  )
}
