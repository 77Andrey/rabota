import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, rgba(17, 8, 34, 0.92), rgba(8, 6, 18, 0.98)), radial-gradient(circle at 70% 30%, rgba(132, 77, 255, 0.45), transparent 60%)",
          color: "#F4F3FF",
        }}
      >
        <span
          style={{
            fontSize: "28px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "32px",
          }}
        >
          burra.io — Россия
        </span>
        <p
          style={{
            fontSize: "84px",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.05,
            maxWidth: "880px",
          }}
        >
          AI‑лендинги и сайты, которые собирают заявки за 24 часа
        </p>
        <p
          style={{
            fontSize: "30px",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "760px",
            marginTop: "32px",
          }}
        >
          Фиксированная цена 30 000 руб. · Telegram, email и ЮKassa подключены из коробки
        </p>
      </div>
    ),
    size
  )
}

