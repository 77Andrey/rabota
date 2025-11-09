"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Info } from "lucide-react"
import { useLeadModal } from "@/components/lead-modal-provider"

interface Project {
  id: string
  title: string
  description: string
  result: string
  tags: string[]
  image: string
  link: string
}

const projects: Project[] = [
  {
    id: "launchpad",
    title: "AI Launchpad для маркетплейса",
    description: "Лендинг с автоматическим расчётом выгоды и интеграцией в CRM.",
    result: "+27% к конверсии с рекламы за 14 дней",
    tags: ["Next.js", "Supabase", "ЮKassa", "CRM"],
    image: "/modern-electronics-ecommerce-store-dark-theme.jpg",
    link: "https://example.com/launchpad",
  },
  {
    id: "fitlab",
    title: "FitLab — студия EMS-тренировок",
    description: "Вебсайт с расписанием, оплатой и ботом для удержания клиентов.",
    result: "-48% стоимости лида через 3 недели",
    tags: ["Telegram API", "ROBOKASSA", "Next.js"],
    image: "/fitness-studio-landing-page-vibrant-colors.jpg",
    link: "https://example.com/fitlab",
  },
  {
    id: "neurodash",
    title: "NeuroDash аналитика",
    description: "SaaS-дашборд и лендинг с калькулятором тарифов и live-данными.",
    result: "Lighthouse 99/100/100/100",
    tags: ["WebSocket", "Recharts", "Vercel"],
    image: "/analytics-dashboard-dark-theme-charts-graphs.jpg",
    link: "https://example.com/neurodash",
  },
  {
    id: "foodq",
    title: "FoodQ меню",
    description: "QR-меню с фоторедактором и мгновенными заказами в Telegram.",
    result: "→ 18% repeat rate в первые месяцы",
    tags: ["Next.js", "Socket.io", "Telegram"],
    image: "/restaurant-menu-app-modern-interface-food-photos.jpg",
    link: "https://example.com/foodq",
  },
  {
    id: "portfolio3d",
    title: "3D-портфолио дизайнера",
    description: "Иммерсивный сайт с WebGL и 3D-галереей работ.",
    result: "+4 крупных контракта за квартал",
    tags: ["Spline", "Framer Motion", "Next.js"],
    image: "/3d-portfolio-gallery-interactive-design-modern.jpg",
    link: "https://example.com/portfolio3d",
  },
  {
    id: "corporate",
    title: "Корпоративный knowledge hub",
    description: "Медия-портал с CMS, SEO и автоматизацией рассылок.",
    result: "x2 рост органики за 2 месяца",
    tags: ["MDX", "SEO", "Automations"],
    image: "/corporate-blog-platform-clean-minimal-design.jpg",
    link: "https://example.com/corporate",
  },
]

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { openLeadModal } = useLeadModal()

  const projectCards = useMemo(
    () =>
      projects.map((project) => (
        <article
          key={project.id}
          className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/50 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_25px_50px_-20px_rgba(61,37,255,0.45)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 400px, 100vw"
              priority={project.id === "launchpad"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              {project.result}
            </div>
          </div>
          <div className="flex h-full flex-col gap-4 p-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="rounded-full border border-border/70 text-sm hover:border-primary/50"
                onClick={() => setSelectedProject(project)}
              >
                <Info className="mr-2 h-4 w-4" aria-hidden />
                Кейс
              </Button>
              <Button
                className="rounded-full text-sm"
                onClick={() => openLeadModal(`portfolio_${project.id}`)}
              >
                Хочу так же
              </Button>
            </div>
          </div>
        </article>
      )),
    [openLeadModal]
  )

  return (
    <section id="portfolio" className="relative py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(98,56,255,0.15),_transparent_65%)]" />
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Портфолио</span>
          <h2 className="mt-3 text-pretty text-3xl font-semibold sm:text-4xl">Выжимаем максимум из вашей ниши</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Мы собираем лендинги и продукты, которые сразу работают на бизнес. Ниже — кейсы, которые помогают клиентам
            продавать и привлекать инвестиции.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{projectCards}</div>

        <div className="mt-12 flex flex-col items-center gap-6 rounded-3xl border border-primary/30 bg-primary/10 p-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">По запросу</p>
            <p className="mt-2 text-base text-primary-foreground">
              Показать приватные проекты + демо‑доступ к административной части
            </p>
          </div>
          <Button
            variant="default"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => openLeadModal("portfolio_demo")}
          >
            Получить демо
            <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(selectedProject)} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl overflow-hidden">
          <DialogHeader>
            <DialogTitle>{selectedProject?.title}</DialogTitle>
            <DialogDescription className="sr-only">Детали кейса {selectedProject?.title}</DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,280px)]">
              <div className="relative h-64 overflow-hidden rounded-2xl border border-border/50">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:768px) 60vw, 100vw"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Результат</h3>
                  <p className="mt-1 text-base text-foreground">{selectedProject.result}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Описание</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selectedProject.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Стек и сервисы
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild className="w-full">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                    Смотреть прототип
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
