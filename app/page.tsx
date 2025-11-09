import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ProcessSection } from "@/components/process-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"
import dynamic from "next/dynamic"
import { MobileFloatingCta } from "@/components/mobile-floating-cta"
import { Suspense } from "react"

const Lazy3DModel = dynamic(() => import("@/components/lazy-3d-model").then((mod) => mod.Lazy3DModel), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection Lazy3D={Lazy3DModel} />
        <Suspense fallback={null}>
          <Lazy3DModel modelUrl="/models/mushroom.glb" className="hidden" />
        </Suspense>
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
