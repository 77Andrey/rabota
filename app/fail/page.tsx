import type { Metadata } from "next"
import { PaymentResult } from "@/components/payment-result"

export const metadata: Metadata = {
  title: "Платёж не завершён — burra.io",
  description: "Платёж не был завершён. Попробуйте снова или свяжитесь с нами — поможем решить вопрос.",
}

interface FailPageProps {
  searchParams: {
    provider?: string
    orderId?: string
  }
}

export default function FailPage({ searchParams }: FailPageProps) {
  return (
    <main className="relative min-h-[80vh] bg-[radial-gradient(circle_at_bottom,_rgba(216,67,67,0.18),_transparent_70%)] py-24">
      <div className="container mx-auto px-4">
        <PaymentResult status="fail" provider={searchParams.provider} orderId={searchParams.orderId} />
      </div>
    </main>
  )
}

