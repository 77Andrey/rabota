import { ImageResponse } from "next/og"

export const size = {
  width: 64,
  height: 64,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 30% 30%, #8a63ff, #2f1e80)",
          borderRadius: "16px",
        }}
      >
        <span
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#f5f5ff",
          }}
        >
          b.
        </span>
      </div>
    ),
    size
  )
}

