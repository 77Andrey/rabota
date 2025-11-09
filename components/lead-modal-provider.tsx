"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { LeadModal } from "@/components/lead-modal"
import { trackEvent } from "@/lib/analytics"

type LeadModalSource =
  | "header"
  | "hero"
  | "benefits"
  | "process"
  | "portfolio"
  | "faq"
  | "footer"
  | "mobile_cta"
  | "floating_cta"
  | "unknown"
  | string

interface LeadModalContextValue {
  openLeadModal: (source?: LeadModalSource) => void
  closeLeadModal: () => void
  isLeadModalOpen: boolean
}

const LeadModalContext = createContext<LeadModalContextValue | undefined>(undefined)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState<LeadModalSource>("unknown")

  const openLeadModal = useCallback((modalSource: LeadModalSource = "unknown") => {
    setSource(modalSource)
    setIsOpen(true)
    trackEvent("open_modal", { source: modalSource })
  }, [])

  const closeLeadModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      openLeadModal,
      closeLeadModal,
      isLeadModalOpen: isOpen,
    }),
    [openLeadModal, closeLeadModal, isOpen]
  )

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <LeadModal open={isOpen} onOpenChange={setIsOpen} source={source} />
    </LeadModalContext.Provider>
  )
}

export const useLeadModal = () => {
  const context = useContext(LeadModalContext)

  if (!context) {
    throw new Error("useLeadModal must be used within LeadModalProvider")
  }

  return context
}

