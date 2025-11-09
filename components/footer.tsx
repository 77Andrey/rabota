"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, Phone, Send, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeadModal } from "@/components/lead-modal-provider"

export function Footer() {
  const { openLeadModal } = useLeadModal()

  return (
    <footer id="contacts" className="relative border-t border-border/40 bg-black/40 text-sm">
      <div className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(86,59,255,0.25),_transparent_65%)]" />
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col gap-6 rounded-3xl border border-primary/30 bg-black/60 p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-10">
            <div className="space-y-3 text-balance">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                SLA 24 часа
              </span>
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
                Забронируйте слот разработки и получите чек-лист запуска в подарок
              </h2>
              <p className="text-sm text-muted-foreground">
                Слоты закрываются за 2–3 дня. После заявки свяжемся в течение 15 минут и подтвердим дедлайн.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:min-w-[260px]">
              <Button
                size="lg"
                className="h-12 rounded-full text-sm font-semibold"
                onClick={() => openLeadModal("footer")}
              >
                Забронировать слот
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-border/60 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => openLeadModal("footer_brief")}
              >
                Получить бриф PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image src="/burra-logo.png" alt="burra.io" width={180} height={54} className="h-auto w-44" />
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                На связи
              </div>
            </div>
            <p className="max-w-sm text-muted-foreground">
              burra.io — AI-студия из Москвы. Собираем сайты и лендинги за 24 часа на стеке Next.js, подключаем заявки,
              аналитику и оплату.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground/80">
              <span>ИНН 123456789012</span>
              <span>ОГРНИП 123456789012345</span>
              <span>Договор + чек 54-ФЗ</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">Навигация</h3>
            <nav className="mt-4 grid gap-2 text-sm text-muted-foreground">
              <Link href="#home" className="transition-colors hover:text-foreground">
                Главная
              </Link>
              <Link href="#benefits" className="transition-colors hover:text-foreground">
                УТП
              </Link>
              <Link href="#process" className="transition-colors hover:text-foreground">
                Процесс
              </Link>
              <Link href="#portfolio" className="transition-colors hover:text-foreground">
                Кейсы
              </Link>
              <Link href="#faq" className="transition-colors hover:text-foreground">
                FAQ
              </Link>
              <Link href="/pay" className="transition-colors hover:text-foreground">
                Оплата
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">Контакты</h3>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <a
                href="tel:+79991234567"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
                aria-label="Позвонить burra.io"
              >
                <Phone className="h-4 w-4 text-muted-foreground/80" />
                +7 (999) 123-45-67
              </a>
              <a
                href="mailto:hello@burra.io"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
                aria-label="Написать на email burra.io"
              >
                <Mail className="h-4 w-4 text-muted-foreground/80" />
                hello@burra.io
              </a>
              <a
                href="https://t.me/burra_agency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-foreground"
                aria-label="Открыть Telegram burra.io"
              >
                <Send className="h-4 w-4 text-muted-foreground/80" />
                @burra_agency
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground/70">Работаем ежедневно с 09:00 до 21:00 МСК.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border/30 pt-8 text-xs text-muted-foreground lg:grid-cols-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal/oferta" className="transition-colors hover:text-foreground">
              Публичная оферта
            </Link>
            <Link href="/legal/privacy" className="transition-colors hover:text-foreground">
              Политика конфиденциальности
            </Link>
            <Link href="/legal/personal-data" className="transition-colors hover:text-foreground">
              Согласие на обработку ПДн
            </Link>
            <Link href="/legal/cookies" className="transition-colors hover:text-foreground">
              Cookie Policy
            </Link>
            <Link href="/legal/refund" className="transition-colors hover:text-foreground">
              Возврат средств
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground/70">
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground/60">Оплата</span>
            <div className="flex items-center gap-2 rounded-full bg-muted/20 px-3 py-1">
              <span className="text-[11px]">ЮKassa</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted/20 px-3 py-1">
              <span className="text-[11px]">ROBOKASSA</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted/20 px-3 py-1">
              <span className="text-[11px]">МИР / Visa / Mastercard</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted/20 px-3 py-1">
              <span className="text-[11px]">СБП</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 bg-black/60">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} burra.io — Россия. Все права защищены.</p>
          <p>
            Разрабатываем и поддерживаем проекты в России и СНГ. Хостинг — Vercel / Selectel, доступ к коду — GitHub.
          </p>
        </div>
      </div>
    </footer>
  )
}

