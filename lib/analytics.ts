type AnalyticsEvent = "open_modal" | "submit_lead_success" | "pay_click"

type AnalyticsPayload = Record<string, unknown> | undefined

const CONSENT_KEY = "cookie-consent"

const isAnalyticsAllowed = () => {
  if (typeof window === "undefined") return false

  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    if (!stored) return false

    const parsed = JSON.parse(stored) as { analytics?: boolean }
    return Boolean(parsed.analytics)
  } catch {
    return false
  }
}

const emitToDataLayer = (name: AnalyticsEvent, payload: AnalyticsPayload) => {
  if (typeof window === "undefined") return

  const eventPayload = { event: name, ...payload }

  try {
    if (Array.isArray((window as typeof window & { dataLayer?: unknown[] }).dataLayer)) {
      ;((window as typeof window & { dataLayer: unknown[] }).dataLayer as unknown[]).push(eventPayload)
    }
  } catch {
    // Ignore
  }

  try {
    window.dispatchEvent(new CustomEvent("analytics:event", { detail: eventPayload }))
  } catch {
    // Ignore
  }
}

export const trackEvent = (name: AnalyticsEvent, payload?: AnalyticsPayload) => {
  if (!isAnalyticsAllowed()) return

  emitToDataLayer(name, payload)
}

export const analytics = {
  trackEvent,
  isAnalyticsAllowed,
}

