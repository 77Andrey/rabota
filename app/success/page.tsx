import type { Metadata } from "next"
import { PaymentResult } from "@/components/payment-result"

export const metadata: Metadata = {
  title: "Оплата прошла — burra.io",
  description: "Спасибо за оплату! Мы уже готовим старт проекта и отправили чек на ваш email.",
}

interface SuccessPageProps {
  searchParams: {
    provider?: string
    orderId?: string
  }
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <main className="relative min-h-[80vh] bg-[radial-gradient(circle_at_top,_rgba(86,59,255,0.2),_transparent_70%)] py-24">
      <div className="container mx-auto px-4">
        <PaymentResult status="success" provider={searchParams.provider} orderId={searchParams.orderId} />
      </div>
    </main>
  )
}

