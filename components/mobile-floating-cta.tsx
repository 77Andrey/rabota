"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLeadModal } from "@/components/lead-modal-provider"

export function MobileFloatingCta() {
  const { openLeadModal, isLeadModalOpen } = useLeadModal()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home")
      const footer = document.getElementById("contacts")

      if (!hero || !footer) {
        setIsVisible(true)
        return
      }

      const heroRect = hero.getBoundingClientRect()
      const footerRect = footer.getBoundingClientRect()

      const heroOutOfView = heroRect.bottom < 80
      const footerInView = footerRect.top < window.innerHeight - 80

      setIsVisible(heroOutOfView && !footerInView)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  if (isLeadModalOpen || !isVisible) {
    return null
  }

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 md:hidden">
      <div className="flex items-center justify-between rounded-3xl bg-card/90 px-4 py-3 shadow-[0_15px_35px_-18px_rgba(61,37,255,0.8)] backdrop-blur">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Start in 24h</span>
          <span className="text-sm font-semibold text-foreground">Сайт за 30 000 руб.</span>
        </div>
        <Button size="sm" className="rounded-full px-5 text-xs font-semibold" onClick={() => openLeadModal("mobile_cta")}>
          Записаться
        </Button>
      </div>
    </div>
  )
}

