import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "32%",
          background:
            "radial-gradient(circle at 20% 20%, rgba(138, 99, 255, 1), rgba(46, 31, 128, 1))",
        }}
      >
        <span
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#f5f5ff",
          }}
        >
          b
        </span>
      </div>
    ),
    size
  )
}

