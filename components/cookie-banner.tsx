"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Cookie, Settings } from "lucide-react"
import Link from "next/link"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent) {
      try {
        const parsed = JSON.parse(consent) as CookiePreferences
        setPreferences({
          necessary: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        })
        setShowBanner(false)
        window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: parsed }))
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
  }, [])

  const savePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs)
    localStorage.setItem("cookie-consent", JSON.stringify(prefs))
    window.dispatchEvent(new CustomEvent("cookie-consent-update", { detail: prefs }))
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    savePreferences(allAccepted)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    savePreferences(onlyNecessary)
  }

  const handleSaveSettings = () => {
    savePreferences(preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left: Icon + Text */}
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground leading-relaxed">
                  Мы используем куки для аналитики и улучшения сервиса. Вы можете настроить использование cookies или
                  принять все.{" "}
                  <Link href="#cookie-policy" className="underline hover:text-primary transition-colors">
                    Политика cookie
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-wrap gap-2 md:flex-nowrap md:ml-4">
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="gap-2">
                <Settings className="h-4 w-4" />
                Настройки
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRejectAll}
                className="text-muted-foreground hover:text-foreground"
              >
                Отклонить
              </Button>
              <Button size="sm" onClick={handleAcceptAll}>
                Принять все
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Настройки cookie
            </DialogTitle>
            <DialogDescription className="text-left">
              Управляйте своими предпочтениями относительно использования cookies. Необходимые cookies всегда активны
              для корректной работы сайта.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex-1 space-y-1">
                <Label htmlFor="necessary" className="text-sm font-semibold text-foreground cursor-not-allowed">
                  Необходимые
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Обязательные cookies для работы сайта, аутентификации и безопасности. Не могут быть отключены.
                </p>
              </div>
              <Switch id="necessary" checked={true} disabled className="mt-1" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="flex-1 space-y-1">
                <Label htmlFor="analytics" className="text-sm font-semibold text-foreground cursor-pointer">
                  Аналитика
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Помогают понять, как посетители используют сайт. Данные используются для улучшения UX и
                  производительности.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="marketing" className="text-sm font-semibold text-foreground cursor-pointer">
                  Маркетинг
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Используются для показа персонализированной рекламы и отслеживания эффективности рекламных кампаний.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Подробнее о том, как мы используем cookies:{" "}
              <Link href="#cookie-policy" className="underline hover:text-primary transition-colors">
                Политика cookie
              </Link>
              ,{" "}
              <Link href="#privacy-policy" className="underline hover:text-primary transition-colors">
                Политика конфиденциальности
              </Link>
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleRejectAll} className="w-full sm:w-auto bg-transparent">
              Только необходимые
            </Button>
            <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
              Сохранить настройки
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
