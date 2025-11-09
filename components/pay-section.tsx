"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trackEvent } from "@/lib/analytics"

type Provider = "yookassa" | "robokassa" | "demo"

const providerCopy: Record<Provider, { title: string; description: string }> = {
  yookassa: {
    title: "Оплата через YooKassa (тестовый режим)",
    description: "После нажатия вы перейдёте в защищённую платёжную форму YooKassa. Вернёт на страницу успеха автоматически.",
  },
  robokassa: {
    title: "Оплата через ROBOKASSA (тестовый режим)",
    description: "Мы сформируем ссылку ROBOKASSA. После оплаты вернёт на сайт и отправит чек на email.",
  },
  demo: {
    title: "Демо-режим оплаты",
    description:
      "Платёжный провайдер не настроен. Для теста вы будете перенаправлены на демо-страницу успеха.",
  },
}

interface PaySectionProps {
  provider: Provider
}

export function PaySection({ provider }: PaySectionProps) {
  const [{ error }, setState] = useState<{ error: string | null }>({ error: null })
  const [isPending, startTransition] = useTransition()

  const copy = providerCopy[provider]

  const handlePay = () => {
    setState({ error: null })
    startTransition(async () => {
      try {
        const response = await fetch("/api/pay/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: "30000.00",
            description: "Оплата пакета разработки burra.io — Россия",
          }),
        })

        const data = await response.json()

        if (!response.ok || !data?.url) {
          throw new Error(data?.error ?? "Не удалось инициировать оплату.")
        }

        trackEvent("pay_click", { provider: data.provider })
        window.location.href = data.url
      } catch (error) {
        console.error(error)
        setState({
          error: error instanceof Error ? error.message : "Что-то пошло не так. Попробуйте ещё раз.",
        })
      }
    })
  }

  return (
    <Card className="mx-auto max-w-3xl border border-border/50 bg-card/70 backdrop-blur">
      <CardHeader className="space-y-4">
        <Badge variant="outline" className="w-fit border-primary/40 bg-primary/10 text-primary">
          burra.io — Россия
        </Badge>
        <CardTitle className="text-3xl font-semibold">Оплата пакета разработки за 24 часа</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          {copy.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-border/60 bg-muted/10 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70">Сумма к оплате</p>
              <p className="text-3xl font-semibold text-primary">30 000 ₽</p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>В стоимость входит:</p>
              <ul className="mt-1 list-disc space-y-1 pl-4">
                <li>UX/UI + Frontend на Next.js</li>
                <li>Интеграции Telegram, email, аналитика</li>
                <li>Платёжная форма и техподдержка 14 дней</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-primary-foreground">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 h-5 w-5 text-primary" aria-hidden />
            <div>
              <p className="font-medium text-primary">{copy.title}</p>
              <p className="mt-1 text-xs text-primary/90">
                После оплаты вы автоматически получите чек и письмо с дальнейшими шагами. Если хотите оплатить по счёту —
                напишите нам на hello@burra.io.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive-foreground">
            {error}
          </div>
        )}

        <Button
          size="lg"
          className="w-full h-12 text-base font-semibold"
          onClick={handlePay}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
              Перенаправляем...
            </>
          ) : (
            "Оплатить 30 000 ₽"
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Нажимая на кнопку, вы соглашаетесь с{" "}
          <Link href="/legal/oferta" className="underline underline-offset-4 hover:text-foreground">
            публичной офертой
          </Link>{" "}
          и{" "}
          <Link href="/legal/privacy" className="underline underline-offset-4 hover:text-foreground">
            политикой конфиденциальности
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  )
}

