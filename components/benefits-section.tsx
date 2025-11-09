"use client"

import { useLeadModal } from "@/components/lead-modal-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, MessagesSquare, Rocket, ShieldCheck, Workflow } from "lucide-react"

const benefits = [
  {
    icon: BrainCircuit,
    title: "AI‑ускорение",
    description: "Генерируем прототип, дизайн и тексты с помощью собственных промтов. Экономим до 12 часов ручной работы.",
    metric: "−45% времени на подготовку",
  },
  {
    icon: Workflow,
    title: "Готовые интеграции",
    description: "Подключаем Telegram Bot API, email, CRM и ЮKassa/ROBOKASSA без боли. Лиды приходят в те каналы, где вы живёте.",
    metric: "6 интеграций в пакете",
  },
  {
    icon: ShieldCheck,
    title: "Юр. чистота",
    description: "Договор, чеки 54‑ФЗ, бэкапы и контроль качества. Проект можно показывать инвесторам на следующий день.",
    metric: "SLA 98% uptime",
  },
  {
    icon: MessagesSquare,
    title: "Продуктовый копирайтинг",
    description: "Вписываемся в голос бренда и акцентируем ценность. Готовим FAQ и сценарии автоворонок.",
    metric: "5 сценариев в подарок",
  },
  {
    icon: Rocket,
    title: "Рост конверсии",
    description: "Проверенные фреймворки секций, A/B гипотезы и аналитика. Подсказываем, что тестировать дальше.",
    metric: "11% средняя конверсия",
  },
]

export function BenefitsSection() {
  const { openLeadModal } = useLeadModal()

  return (
    <section id="benefits" className="relative py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(130,70,255,0.12),transparent_60%)]" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="border border-primary/30 bg-primary/10 text-primary">
            5 УТП burra.io
          </Badge>
          <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Всё, что нужно, чтобы запуститься завтра и продолжить расти
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Комбинируем AI, продуктовую экспертизу и автоматизации. Вы получаете сайт, который продаёт, а не просто
            красиво выглядит.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <article
                key={benefit.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_25px_50px_-20px_rgba(71,38,255,0.4)]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-primary/80">
                    {benefit.metric}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-full border border-transparent px-4 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                    onClick={() => openLeadModal("benefits")}
                  >
                    Обсудить
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

