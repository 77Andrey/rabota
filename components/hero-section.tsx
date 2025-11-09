"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { useLeadModal } from "@/components/lead-modal-provider"
import { LazySplineViewer } from "@/components/lazy-spline-viewer"
import { Lazy3DModel } from "@/components/lazy-3d-model"

const heroStats = [
  {
    label: "Средний запуск",
    value: "24 часа",
  },
  {
    label: "Фиксированная цена",
    value: "30 000 руб.",
  },
  {
    label: "Лиды конвертируют",
    value: "до 11%",
  },
]

export function HeroSection() {
  const { openLeadModal } = useLeadModal()

  const statItems = useMemo(
    () =>
      heroStats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-border/50 bg-card/60 p-4 backdrop-blur-xl">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</span>
          <p className="mt-1 text-2xl font-semibold text-primary">{stat.value}</p>
        </div>
      )),
    []
  )

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[90vh] items-center overflow-hidden pb-20 pt-28 md:pt-32"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#321d66_0%,rgba(7,4,14,0)_60%)] opacity-70" />
      <div className="absolute left-1/2 top-32 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/30 blur-[160px]" />
      <div className="container mx-auto grid w-full gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center">
        <div className="space-y-8">
          <Badge variant="outline" className="border-primary/60 bg-primary/10 text-primary">
            AI‑студия для быстрого запуска
          </Badge>
          <h1 id="hero-heading" className="text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            AI‑лендинги, которые собирают заявки в России за сутки
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
            Под ключ: стратегия, UX/UI, тексты, сборка на Next.js, подключение Telegram и email, настройка аналитики,
            метрик и онлайн-оплаты. Всё за фиксированные 30 000 руб.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/30"
              onClick={() => openLeadModal("hero_primary")}
            >
              Стартовать проект
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 rounded-full border border-border/70 px-8 text-base text-foreground hover:bg-secondary/60"
              onClick={() => {
                const portfolioSection = document.getElementById("portfolio")
                portfolioSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Смотреть портфолио
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">{statItems}</div>

          <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/5 p-4 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
            <span>
              Работаем по договору и 54‑ФЗ. Если опоздаем со сроком — вернём 10% или засчитаем в будущие спринты.
            </span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-8 rounded-[42px] bg-gradient-to-br from-primary/25 via-accent/15 to-transparent opacity-80 blur-3xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[36px] border border-border/50 bg-black/40 shadow-[0_40px_80px_-30px_rgba(77,45,255,0.65)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-transparent to-transparent opacity-70" />
            <Lazy3DModel modelUrl="/models/mushroom.glb" className="h-full w-full" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5 text-xs text-white/80 backdrop-blur">
              <span className="font-medium">AI core — Live render</span>
              <span>Realtime 3D</span>
            </div>
          </div>
        </div>
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-border/40 bg-black/40 p-6 lg:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent opacity-70" />
          <LazySplineViewer
            url="https://prod.spline.design/IxJDS7A3Tb73Pvvr/scene.splinecode"
            posterSrc="/hero-poster.webp"
            posterAlt="AI generated abstract brain visual"
            className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10"
          />
          <div className="relative mt-3 flex items-center justify-between text-xs text-white/70">
            <span>AI-кейсы в движении</span>
            <span>Клик — открыть</span>
          </div>
        </div>
      </div>
    </section>
  )
}
