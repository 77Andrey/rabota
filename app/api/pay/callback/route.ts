import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? ""
    const body = contentType.includes("application/json") ? await request.json() : Object.fromEntries(await request.formData())

    console.info("[pay] callback received", body)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[pay] callback error", error)
    return NextResponse.json({ received: false }, { status: 500 })
  }
}

