import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ProcessSection } from "@/components/process-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import { MobileFloatingCta } from "@/components/mobile-floating-cta"

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        <BenefitsSection />
        <ProcessSection />
        <PortfolioSection />
        <FaqSection />
      </main>
      <Footer />
      <MobileFloatingCta />
      <CookieBanner />
    </>
  )
}
