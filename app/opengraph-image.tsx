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
          padding: "72px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(66, 25, 255, 0.65), transparent 55%), radial-gradient(circle at 80% 10%, rgba(190, 80, 255, 0.65), transparent 60%), #05050b",
          color: "#F7F7FF",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "32px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#8c4dff,#4d19ff)",
              display: "inline-block",
            }}
          />
          burra.io — AI studio
        </div>
        <div>
          <p
            style={{
              fontSize: "88px",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.05,
              maxWidth: "880px",
            }}
          >
            AI‑лендинги для российского бизнеса за 24 часа
          </p>
          <p
            style={{
              marginTop: "32px",
              fontSize: "28px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "700px",
            }}
          >
            Фиксированная стоимость 30 000 ₽ · дизайн, тексты, интеграции, метрики и онлайн-оплата
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "28px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <span>burra.io — Россия</span>
          <span>v.2025</span>
        </div>
      </div>
    ),
    size
  )
}

