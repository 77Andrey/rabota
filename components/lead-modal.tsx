"use client"

import { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputMask from "react-input-mask"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react"
import { trackEvent } from "@/lib/analytics"

const PHONE_MASK = "+7 (999) 999-99-99"

const leadSchema = z
  .object({
    name: z.string().min(2, "Укажите имя"),
    phone: z
      .string()
      .min(10, "Введите номер телефона")
      .refine((value) => {
        const digits = value.replace(/[^\d]/g, "")
        return digits.length === 11 && digits.startsWith("7")
      }, "Введите действительный российский номер"),
    email: z
      .string()
      .email("Введите корректный email")
      .optional()
      .or(z.literal("").transform(() => undefined)),
    telegram: z.string().optional(),
    whatsapp: z.string().optional(),
    comment: z.string().max(600, "До 600 символов").optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Необходимо согласие на обработку данных" }),
    }),
  })
  .superRefine((data, ctx) => {
    if (!(data.telegram && data.telegram.trim()) && !(data.whatsapp && data.whatsapp.trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите Telegram или WhatsApp",
        path: ["telegram"],
      })
    }
  })

type LeadFormValues = z.infer<typeof leadSchema>

type LeadStatus = "idle" | "loading" | "success" | "error"

interface LeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source?: string
}

export function LeadModal({ open, onOpenChange, source = "unknown" }: LeadModalProps) {
  const [status, setStatus] = useState<LeadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const defaultValues = useMemo<LeadFormValues>(
    () => ({
      name: "",
      phone: "+7 ",
      email: "",
      telegram: "",
      whatsapp: "",
      comment: "",
      consent: false,
    }),
    []
  )

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues,
    mode: "onBlur",
  })

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        form.reset(defaultValues)
        setStatus("idle")
        setErrorMessage(null)
      }, 150)
    }
  }, [open, form, defaultValues])

  const handleSubmit = form.handleSubmit(async (values) => {
    setStatus("loading")
    setErrorMessage(null)

    try {
      const digits = values.phone.replace(/[^\d]/g, "")
      const payload = {
        name: values.name.trim(),
        phone: `+${digits}`,
        email: values.email?.trim() || undefined,
        telegram: values.telegram?.trim() || undefined,
        whatsapp: values.whatsapp?.trim() || undefined,
        comment: values.comment?.trim() || undefined,
        consent: values.consent,
        source,
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку. Попробуйте позже.")
      }

      setStatus("success")
      trackEvent("submit_lead_success", { source })

      setTimeout(() => {
        onOpenChange(false)
      }, 1800)
    } catch (error) {
      console.error(error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Что-то пошло не так")
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/80 to-accent/70 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-semibold">Старт проекта за 60 секунд</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Оставьте контакты — ответим в течение 15 минут и пришлём короткий бриф в Telegram или WhatsApp.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Имя*</Label>
            <Input
              id="name"
              placeholder="Иван"
              {...form.register("name")}
              aria-invalid={Boolean(form.formState.errors.name)}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон*</Label>
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <InputMask
                    mask={PHONE_MASK}
                    maskChar="_"
                    value={field.value}
                    onChange={(event) => {
                      const next = event.target.value.startsWith("+7") ? event.target.value : `+7${event.target.value.replace(/[^\d]/g, "").replace(/^7/, "")}`
                      field.onChange(next)
                    }}
                    onBlur={field.onBlur}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        id="phone"
                        inputMode="tel"
                        aria-invalid={Boolean(form.formState.errors.phone)}
                      />
                    )}
                  </InputMask>
                )}
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.ru"
                {...form.register("email")}
                aria-invalid={Boolean(form.formState.errors.email)}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram</Label>
              <Input
                id="telegram"
                placeholder="@username"
                {...form.register("telegram")}
                aria-invalid={Boolean(form.formState.errors.telegram)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="+7 999 123-45-67"
                {...form.register("whatsapp")}
                aria-invalid={Boolean(form.formState.errors.whatsapp)}
              />
            </div>
          </div>
          {form.formState.errors.telegram && (
            <p className="text-xs text-destructive">{form.formState.errors.telegram.message}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="comment">Комментарий</Label>
            <Textarea
              id="comment"
              placeholder="Расскажите про нишу, задачу и дедлайн"
              rows={4}
              {...form.register("comment")}
            />
            {form.formState.errors.comment && (
              <p className="text-xs text-destructive">{form.formState.errors.comment.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/10 p-3 text-sm">
            <Checkbox
              id="consent"
              checked={form.watch("consent")}
              onCheckedChange={(checked) =>
                form.setValue("consent", Boolean(checked), { shouldDirty: true, shouldTouch: true, shouldValidate: true })
              }
              aria-invalid={Boolean(form.formState.errors.consent)}
            />
            <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
              Даю согласие на обработку персональных данных и получение коммуникаций по проекту.
            </Label>
          </div>
          {form.formState.errors.consent && (
            <p className="text-xs text-destructive">{form.formState.errors.consent.message}</p>
          )}

          {status === "success" && (
            <Alert variant="default" className="border-primary/40 bg-primary/10">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Заявка отправлена</AlertTitle>
              <AlertDescription>Мы уже на связи. Проверьте Telegram или WhatsApp в ближайшие минуты.</AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Не получилось отправить форму</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <DialogFooter className="pt-2">
            <div className="flex flex-col gap-3 w-full">
              <Button
                type="submit"
                className="h-12 w-full text-base font-semibold gap-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Звонить не будем без запроса. Среднее время обратной связи — 15 минут по будням.
              </p>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

