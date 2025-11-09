import { NextResponse } from "next/server"

const pages = ["", "pay", "success", "fail"].map((path) => `https://burra.io/${path}`.replace(/\/+$/, "/"))

export const runtime = "edge"

export function GET() {
  const lastmod = new Date().toISOString()

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (url) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${url.endsWith("/") ? "1.0" : "0.6"}</priority>
</url>`
  )
  .join("\n")}
</urlset>`

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

