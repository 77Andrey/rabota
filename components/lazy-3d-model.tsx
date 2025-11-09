"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, PerspectiveCamera, Environment } from "@react-three/drei"
import { Skeleton } from "@/components/ui/skeleton"

interface Model3DProps {
  url: string
}

function Model3D({ url }: Model3DProps) {
  const { scene } = useGLTF(url)

  return <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
}

interface Lazy3DModelProps {
  modelUrl: string
  className?: string
}

export function Lazy3DModel({ modelUrl, className = "" }: Lazy3DModelProps) {
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
      {!shouldLoad && (
        <Skeleton className="absolute inset-0 bg-secondary/50 animate-pulse">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
              <p className="text-xs text-muted-foreground font-mono">Загрузка 3D...</p>
            </div>
          </div>
        </Skeleton>
      )}
      {shouldLoad && (
        <Canvas className="w-full h-full" gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <Suspense fallback={null}>
            <Model3D url={modelUrl} />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={2}
          />
        </Canvas>
      )}
    </div>
  )
}

useGLTF.preload("/models/mushroom.glb")
