"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLeadModal } from "@/components/lead-modal-provider"
import { CheckCircle2, ExternalLink, RotateCcw, XCircle } from "lucide-react"

type PaymentStatus = "success" | "fail"

const providerNames: Record<string, string> = {
  yookassa: "YooKassa",
  robokassa: "ROBOKASSA",
  demo: "Демо-режим",
}

interface PaymentResultProps {
  status: PaymentStatus
  provider?: string | null
  orderId?: string | null
}

export function PaymentResult({ status, provider, orderId }: PaymentResultProps) {
  const { openLeadModal } = useLeadModal()
  const providerLabel = provider ? providerNames[provider] ?? provider : "платёжная система"

  const isSuccess = status === "success"
  const Icon = isSuccess ? CheckCircle2 : XCircle
  const title = isSuccess ? "Оплата прошла успешно" : "Оплата не завершена"
  const description = isSuccess
    ? `Мы получили подтверждение от ${providerLabel}. В ближайшее время отправим чек и дальнейшие инструкции на почту.`
    : `Сделка не завершена или была отменена в ${providerLabel}. Попробуйте ещё раз или свяжитесь с нами — поможем завершить оплату.`

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl border border-border/50 bg-card/70 p-8 text-center backdrop-blur">
      <div className="flex flex-col items-center gap-4">
        <Icon className={`h-14 w-14 ${isSuccess ? "text-emerald-400" : "text-destructive"}`} aria-hidden />
        <div className="space-y-3 text-balance">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
            {providerLabel}
          </Badge>
          {orderId ? (
            <Badge variant="secondary" className="border-border bg-transparent text-muted-foreground">
              ID сделки: {orderId}
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          size="lg"
          className="h-12 text-sm font-semibold"
          onClick={() => openLeadModal(isSuccess ? "payment_success" : "payment_fail")}
        >
          Связаться с менеджером
        </Button>
        {isSuccess ? (
          <Button asChild size="lg" variant="outline" className="h-12 text-sm">
            <Link href="#portfolio">
              Посмотреть кейсы
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </Button>
        ) : (
          <Button
            size="lg"
            variant="ghost"
            className="h-12 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => openLeadModal("payment_retry")}
          >
            Попробовать снова
            <RotateCcw className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Нужна бухгалтерская документация или счёт? Напишите нам на{" "}
        <a href="mailto:hello@burra.io" className="underline underline-offset-4 hover:text-foreground">
          hello@burra.io
        </a>{" "}
        или в{" "}
        <a
          href="https://t.me/burra_agency"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Telegram @burra_agency
        </a>
        .
      </p>
    </div>
  )
}

