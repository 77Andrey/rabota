"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Что реально входит в фиксированные 30 000 ₽?",
    answer:
      "Полный цикл: диагностика, концепт, UX/UI в Figma, тексты, вёрстка на Next.js, адаптив, настройка домена, SSL, подключение Telegram/email/SMS, аналитика (Yandex Metrica + GA4), CRM-хуки и онлайн-оплата. В комплекте — база UI-компонентов и инструкция по управлению.",
  },
  {
    question: "Как мы успеваем за 24 часа?",
    answer:
      "Мы работаем по заранее подготовленным AI-промтам, библиотекам блоков и чек-листам. На созвоне фиксируем KPI, после — спринт в 4 этапа, каждый закрывается QA и демо. Если нужна сложная интеграция (например, 1C или кастомная CRM), выделяем дополнительный мини-спринт.",
  },
  {
    question: "Сколько правок можно внести?",
    answer:
      "Два раунда правок входят в стоимость: после прототипа и после готовой сборки. Всё, что было в согласованном брифе — дорабатываем бесплатно. Новые фичи оцениваем отдельно по фиксированной ставке 1 500 ₽/час. Баги чиним без ограничений.",
  },
  {
    question: "Что по юридическим вопросам и платежам?",
    answer:
      "Работаем как ИП на НПД/УСН. Вы подписываете оферту или договор. Оплата через ЮKassa или ROBOKASSA (карты, СБП, счета, B2B). Чеки 54‑ФЗ приходят автоматически на email. Для юрлиц подготовим закрывающие документы.",
  },
  {
    question: "Какая поддержка после запуска?",
    answer:
      "14 дней — бесплатный гипер-кейр: мониторим uptime, фиксируем ошибки, отвечаем на вопросы по админке. Потом можно взять пакет сопровождения (от 4 часов) или подключить нас на проектной основе.",
  },
  {
    question: "Если нет своих материалов?",
    answer:
      "Это ок. Поможем с позиционированием, подготовим тексты, найдем стоковые визуалы и соберём UI. Если нужен фирменный стиль, можем подключить дизайн-партнёров (от 8 000 ₽).",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-muted-foreground">Ответы на основные вопросы о разработке, оплате и поддержке</p>
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50 transition-colors hover:border-border"
              >
                <AccordionTrigger className="text-left text-base font-medium lg:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Footer note */}
          <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
            <p className="text-sm text-primary-foreground">
              Остался нестандартный вопрос? Напишите в{" "}
              <a
                href="https://t.me/burra_agency"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
              >
                Telegram @burra_agency
              </a>{" "}
              или почту{" "}
              <a
                href="mailto:hello@burra.io"
                className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
              >
                hello@burra.io
              </a>{" "}
              — ответим в течение 15 минут.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
