import { NextResponse } from "next/server"

export const runtime = "edge"

export function GET() {
  return new NextResponse(
    [
      "User-agent: *",
      "Allow: /",
      "Sitemap: https://burra.io/sitemap.xml",
      "",
    ].join("\n"),
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    }
  )
}

