import { ImageResponse } from "next/og"
import type { CSSProperties } from "react"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const fontFamily = '"Inter", "Arial", "Helvetica Neue", sans-serif'

const headingStyle: CSSProperties = {
  fontFamily,
  fontWeight: 700,
  margin: 0,
  lineHeight: 1.05,
}

const paragraphStyle: CSSProperties = {
  fontFamily,
  fontWeight: 400,
  margin: 0,
  lineHeight: 1.4,
}

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          padding: 72,
          backgroundColor: "#05050b",
          color: "#F7F7FF",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 210,
            backgroundColor: "rgba(104, 71, 255, 0.4)",
            top: 120,
            left: 140,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: 180,
            backgroundColor: "rgba(190, 80, 255, 0.32)",
            top: 180,
            right: 160,
            opacity: 0.7,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily,
            fontSize: 32,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "linear-gradient(135deg,#8c4dff,#4d19ff)",
            }}
          />
          <span style={{ display: "flex", fontFamily }}>burra.io — AI studio</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            maxWidth: 880,
            position: "relative",
          }}
        >
          <p
            style={{
              ...headingStyle,
              fontSize: 88,
            }}
          >
            AI‑лендинги для российского бизнеса за 24 часа
          </p>
          <p
            style={{
              ...paragraphStyle,
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 700,
            }}
          >
            Фиксированная стоимость 30 000 RUB · дизайн, тексты, интеграции, метрики и онлайн-оплата
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily,
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            position: "relative",
          }}
        >
          <span style={{ display: "flex", fontFamily }}>burra.io — Россия</span>
          <span style={{ display: "flex", fontFamily }}>v.2025</span>
        </div>
      </div>
    ),
    size
  )
}

