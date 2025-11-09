"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import { analytics } from "@/lib/analytics"

const CONSENT_EVENT = "cookie-consent-update"

export function AnalyticsBridge() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const update = () => setEnabled(analytics.isAnalyticsAllowed())

    update()
    window.addEventListener(CONSENT_EVENT, update)

    return () => window.removeEventListener(CONSENT_EVENT, update)
  }, [])

  if (!enabled) {
    return null
  }

  return <Analytics />
}

