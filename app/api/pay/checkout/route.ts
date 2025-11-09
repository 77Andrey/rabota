import { NextResponse } from "next/server"
import { z } from "zod"
import crypto from "crypto"

export const runtime = "nodejs"

const requestSchema = z.object({
  amount: z.string().optional(),
  description: z.string().optional(),
})

const DEFAULT_AMOUNT = "30000.00"
const DEFAULT_DESCRIPTION = "Оплата пакета разработки burra.io"

const createYookassaPayment = async (amount: string, description: string, origin: string) => {
  const shopId = process.env.YKS_SHOP_ID
  const secretKey = process.env.YKS_SECRET_KEY
  if (!shopId || !secretKey) return null

  const response = await fetch("https://api.yookassa.ru/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${shopId}:${secretKey}`).toString("base64")}`,
      "Content-Type": "application/json",
      "Idempotence-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({
      amount: { value: amount, currency: "RUB" },
      capture: true,
      description,
      confirmation: {
        type: "redirect",
        return_url: `${origin}/success?provider=yookassa`,
      },
      metadata: {
        fail_url: `${origin}/fail?provider=yookassa`,
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`YooKassa API error: ${errorText}`)
  }

  const data = await response.json()
  return data?.confirmation?.confirmation_url as string | undefined
}

const createRobokassaPayment = (amount: string, description: string, origin: string) => {
  const login = process.env.ROBOKASSA_LOGIN
  const password1 = process.env.ROBOKASSA_PASSWORD1
  const password2 = process.env.ROBOKASSA_PASSWORD2

  if (!login || !password1 || !password2) return null

  const invId = Date.now()
  const signature = crypto.createHash("md5").update(`${login}:${amount}:${invId}:${password1}`).digest("hex")

  const params = new URLSearchParams({
    MrchLogin: login,
    OutSum: amount,
    InvId: invId.toString(),
    Desc: description,
    SignatureValue: signature,
    Culture: "ru",
    Encoding: "utf-8",
    IsTest: "1",
    SuccessURL: `${origin}/success?provider=robokassa`,
    FailURL: `${origin}/fail?provider=robokassa`,
  })

  return `https://auth.robokassa.ru/Merchant/Index.aspx?${params.toString()}`
}

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}))
    const { amount = DEFAULT_AMOUNT, description = DEFAULT_DESCRIPTION } = requestSchema.parse(json)

    const origin =
      request.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

    try {
      const yookassaUrl = await createYookassaPayment(amount, description, origin)
      if (yookassaUrl) {
        return NextResponse.json({ success: true, url: yookassaUrl, provider: "yookassa" })
      }
    } catch (error) {
      console.error("[pay] YooKassa error", error)
    }

    try {
      const robokassaUrl = createRobokassaPayment(amount, description, origin)
      if (robokassaUrl) {
        return NextResponse.json({ success: true, url: robokassaUrl, provider: "robokassa" })
      }
    } catch (error) {
      console.error("[pay] Robokassa error", error)
    }

    const fallbackUrl = `${origin}/success?provider=demo`
    return NextResponse.json({
      success: true,
      url: fallbackUrl,
      provider: "demo",
      warning: "Payment provider credentials are not configured; redirecting to demo success screen.",
    })
  } catch (error) {
    console.error("[pay] checkout error", error)
    return NextResponse.json({ success: false, error: "Unable to initiate payment" }, { status: 500 })
  }
}

