import { NextResponse } from "next/server"
import { z } from "zod"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

const leadSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  comment: z.string().optional(),
  consent: z.boolean().optional(),
  source: z.string().optional(),
})

type LeadPayload = z.infer<typeof leadSchema>

const sendTelegramMessage = async (payload: LeadPayload) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return { ok: false, skipped: true }

  const message = [
    `<b>Новая заявка burra.io</b>`,
    ``,
    `<b>Имя:</b> ${payload.name}`,
    `<b>Телефон:</b> ${payload.phone}`,
    payload.email ? `<b>Email:</b> ${payload.email}` : null,
    payload.telegram ? `<b>Telegram:</b> ${payload.telegram}` : null,
    payload.whatsapp ? `<b>WhatsApp:</b> ${payload.whatsapp}` : null,
    payload.comment ? `<b>Комментарий:</b> ${payload.comment}` : null,
    payload.source ? `<b>Источник:</b> ${payload.source}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Telegram error: ${errorText}`)
  }

  return { ok: true }
}

const sendEmail = async (payload: LeadPayload) => {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SMTP_TO) {
    return { ok: false, skipped: true }
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: Number(process.env.SMTP_PORT ?? 465) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  const html = `
    <h2>Новая заявка с burra.io</h2>
    <ul>
      <li><strong>Имя:</strong> ${payload.name}</li>
      <li><strong>Телефон:</strong> ${payload.phone}</li>
      ${payload.email ? `<li><strong>Email:</strong> ${payload.email}</li>` : ""}
      ${payload.telegram ? `<li><strong>Telegram:</strong> ${payload.telegram}</li>` : ""}
      ${payload.whatsapp ? `<li><strong>WhatsApp:</strong> ${payload.whatsapp}</li>` : ""}
      ${payload.comment ? `<li><strong>Комментарий:</strong> ${payload.comment}</li>` : ""}
      ${payload.source ? `<li><strong>Источник:</strong> ${payload.source}</li>` : ""}
    </ul>
  `

  await transporter.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    subject: "Новая заявка burra.io",
    text: `Имя: ${payload.name}\nТелефон: ${payload.phone}\nEmail: ${payload.email ?? "-"}\nTelegram: ${payload.telegram ?? "-"}\nWhatsApp: ${payload.whatsapp ?? "-"}\nКомментарий: ${payload.comment ?? "-"}\nИсточник: ${payload.source ?? "-"}`,
    html,
  })

  return { ok: true }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const payload = result.data

    const operations = await Promise.allSettled([sendTelegramMessage(payload), sendEmail(payload)])

    const hasSuccess = operations.some(
      (op) => op.status === "fulfilled" && (op.value.ok || op.value.skipped)
    )
    const errors = operations
      .filter((op): op is PromiseRejectedResult => op.status === "rejected")
      .map((op) => op.reason instanceof Error ? op.reason.message : String(op.reason))

    if (!hasSuccess) {
      return NextResponse.json({ success: false, error: errors.join("; ") || "Integration failed" }, { status: 502 })
    }

    return NextResponse.json({ success: true, errors })
  } catch (error) {
    console.error("[lead] submission error", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

