"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface LazySplineViewerProps {
  url: string
  className?: string
  posterSrc?: string
  posterAlt?: string
}

export function LazySplineViewer({ url, className = "", posterSrc, posterAlt = "3D preview" }: LazySplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          priority={false}
          className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
        />
      )}
      {!posterSrc && !isLoaded && (
        <Skeleton className="absolute inset-0 bg-secondary/50 animate-pulse" aria-hidden>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
              <p className="text-xs text-muted-foreground font-mono">Загрузка 3D...</p>
            </div>
          </div>
        </Skeleton>
      )}
      {shouldLoad && (
        <iframe
          src={url}
          className={`w-full h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          title="3D Scene"
        />
      )}
    </div>
  )
}
