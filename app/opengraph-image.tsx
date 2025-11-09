import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

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
            inset: 0,
            background: "radial-gradient(circle at 20% 20%, rgba(66, 25, 255, 0.45), transparent 55%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 80% 10%, rgba(190, 80, 255, 0.35), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
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
          <span style={{ display: "flex" }}>burra.io — AI studio</span>
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
              fontSize: 88,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            AI‑лендинги для российского бизнеса за 24 часа
          </p>
          <p
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              margin: 0,
              maxWidth: 700,
              lineHeight: 1.4,
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
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            position: "relative",
          }}
        >
          <span style={{ display: "flex" }}>burra.io — Россия</span>
          <span style={{ display: "flex" }}>v.2025</span>
        </div>
      </div>
    ),
    size
  )
}

