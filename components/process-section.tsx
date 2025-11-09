"use client"

import { useLeadModal } from "@/components/lead-modal-provider"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, CalendarCheck, FileText, Palette, Rocket, Sparkles } from "lucide-react"

const steps = [
  {
    title: "Созвон и бриф",
    subtitle: "0–1 час",
    description: "Погружаемся в задачу, аудиторию и оффер. Собираем референсы, фиксируем KPI и сроки.",
    icon: CalendarCheck,
  },
  {
    title: "AI‑прототип и контент",
    subtitle: "1–12 час",
    description: "Готовим карту блоков, текстовые гипотезы и визуалы. Согласовываем всё в Figma / Miro.",
    icon: Sparkles,
  },
  {
    title: "Дизайн и сборка",
    subtitle: "12–22 час",
    description: "Верстаем на Next.js, подключаем интеграции, метрики, CRM, оплату. Проводим QA и Lighthouse 90+.",
    icon: Palette,
  },
  {
    title: "Запуск и поддержка",
    subtitle: "22–24 час",
    description: "Публикуем на домен, настраиваем CDN, ДЗАД, уведомления. Передаем инструкции и сопровождаем 14 дней.",
    icon: Rocket,
  },
]

export function ProcessSection() {
  const { openLeadModal } = useLeadModal()

  return (
    <section id="process" className="relative overflow-hidden border-t border-border/40 bg-black/20 py-24">
      <div className="absolute inset-0 -z-10 bg-[conic-gradient(at_top_left,_rgba(79,47,255,0.25),_transparent_65%)]" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-8 pb-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Процесс</p>
            <h2 className="mt-3 max-w-2xl text-pretty text-3xl font-semibold sm:text-4xl">
              Работаем по спринту 24 часа с полным прозрачным бэклогом
            </h2>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-primary/30 text-primary transition-transform hover:-translate-y-0.5"
            onClick={() => openLeadModal("process")}
          >
            Забронировать слот
            <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <article
                key={step.title}
                className="group relative flex h-full flex-col justify-between rounded-3xl border border-border/40 bg-card/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-primary/70">0{index + 1}</span>
                  <span className="rounded-full bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="mt-6 space-y-3">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">{step.subtitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 rounded-3xl border border-primary/30 bg-primary/10 p-6 text-sm text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-primary">
            <FileText className="h-5 w-5" aria-hidden />
            <span>После запуска — чек‑лист тестов, пошаговая инструкция и доступ к базе шаблонов</span>
          </div>
          <Button
            size="sm"
            variant="default"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => openLeadModal("process_footer")}
          >
            Получить чек‑лист
          </Button>
        </div>
      </div>
    </section>
  )
}

