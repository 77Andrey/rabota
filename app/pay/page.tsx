import type { Metadata } from "next"
import { Suspense } from "react"
import { PaySection } from "@/components/pay-section"

export const metadata: Metadata = {
  title: "Оплата — burra.io — разработка сайтов за 24 часа",
  description: "Оплатите пакет разработки burra.io. Принимаем карты, СБП, ЮKassa и ROBOKASSA в тестовом режиме.",
}

export default function PayPage() {
  const provider = (() => {
    if (process.env.YKS_SHOP_ID && process.env.YKS_SECRET_KEY) return "yookassa"
    if (
      process.env.ROBOKASSA_LOGIN &&
      process.env.ROBOKASSA_PASSWORD1 &&
      process.env.ROBOKASSA_PASSWORD2
    )
      return "robokassa"
    return "demo"
  })()

  return (
    <main className="relative min-h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(86,59,255,0.2),_transparent_70%)] py-24">
      <div className="container mx-auto px-4">
        <Suspense fallback={null}>
          <PaySection provider={provider} />
        </Suspense>
      </div>
    </main>
  )
}

