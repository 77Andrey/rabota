import { ImageResponse } from "next/og"
import type { CSSProperties } from "react"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

const fontFamily = '"Inter", "Arial", "Helvetica Neue", sans-serif'

const containerStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  padding: "72px",
  backgroundColor: "#05050b",
  color: "#F7F7FF",
  overflow: "hidden",
}

const glowPrimaryStyle: CSSProperties = {
  position: "absolute",
  width: "420px",
  height: "420px",
  borderRadius: "210px",
  backgroundColor: "rgba(104, 71, 255, 0.4)",
  top: "120px",
  left: "140px",
  opacity: 0.8,
}

const glowSecondaryStyle: CSSProperties = {
  position: "absolute",
  width: "360px",
  height: "360px",
  borderRadius: "180px",
  backgroundColor: "rgba(190, 80, 255, 0.32)",
  top: "180px",
  right: "160px",
  opacity: 0.7,
}

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

const topBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  fontFamily,
  fontSize: "32px",
  letterSpacing: "4px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.72)",
  position: "relative",
}

const accentDotStyle: CSSProperties = {
  width: "16px",
  height: "16px",
  borderRadius: "8px",
  background: "linear-gradient(135deg,#8c4dff,#4d19ff)",
}

const copyWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  maxWidth: "880px",
  position: "relative",
}

const footerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily,
  fontSize: "28px",
  color: "rgba(255,255,255,0.8)",
  position: "relative",
}

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={containerStyle}>
        <div style={glowPrimaryStyle} />
        <div style={glowSecondaryStyle} />
        <div style={topBarStyle}>
          <div style={accentDotStyle} />
          <span style={{ display: "flex", fontFamily }}>burra.io — AI studio</span>
        </div>
        <div style={copyWrapperStyle}>
          <p style={{ ...headingStyle, fontSize: "88px" }}>
            AI‑лендинги для российского бизнеса за 24 часа
          </p>
          <p style={{ ...paragraphStyle, fontSize: "28px", color: "rgba(255,255,255,0.7)", maxWidth: "700px" }}>
            Фиксированная стоимость 30 000 RUB · дизайн, тексты, интеграции, метрики и онлайн-оплата
          </p>
        </div>
        <div style={footerStyle}>
          <span style={{ display: "flex", fontFamily }}>burra.io — Россия</span>
          <span style={{ display: "flex", fontFamily }}>v.2025</span>
        </div>
      </div>
    ),
    size
  )
}

