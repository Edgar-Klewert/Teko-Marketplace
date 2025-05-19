"use client"

import type React from "react"

import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { CreditCardFormValues } from "@/lib/validations/payment"

interface RequiredLabelProps {
  text: string
}

const RequiredLabel = ({ text }: RequiredLabelProps) => (
  <div className="flex items-center gap-1">
    {text}
    <span className="text-red-500">*</span>
  </div>
)

interface CreditCardFormProps {
  form: UseFormReturn<CreditCardFormValues>
  onSubmit: (values: CreditCardFormValues) => void
  totalPrice: number
}

export function CreditCardForm({ form, onSubmit, totalPrice }: CreditCardFormProps) {
  const [cardType, setCardType] = useState<string>("")

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const groups = []

    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4))
    }

    return groups.join(" ").substring(0, 19)
  }

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 2) {
      return digits
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`
  }

  const detectCardType = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\D/g, "")

    if (cleanNumber.startsWith("4")) {
      return "visa"
    } else if (/^5[1-5]/.test(cleanNumber)) {
      return "mastercard"
    } else if (/^3[47]/.test(cleanNumber)) {
      return "amex"
    } else if (/^6(?:011|5)/.test(cleanNumber)) {
      return "discover"
    } else if (/^(36|38|30[0-5])/.test(cleanNumber)) {
      return "diners"
    } else if (/^(50|56|57|58|6[8-9])/.test(cleanNumber)) {
      return "maestro"
    } else if (/^(60|6[4-9]|65)/.test(cleanNumber)) {
      return "hipercard"
    } else if (
      /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|627780|636297|636368|636369)/.test(cleanNumber)
    ) {
      return "elo"
    }

    return ""
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value)
    form.setValue("cardNumber", formattedValue)
    setCardType(detectCardType(formattedValue))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value)
    form.setValue("expiryDate", formattedValue)
  }

  const calculateInstallmentValue = (installments: number) => {
    return (totalPrice / installments).toFixed(2)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-sm text-muted-foreground mb-4">
        Campos marcados com <span className="text-red-500">*</span> são obrigatórios
      </p>

      <FormField
        control={form.control}
        name="cardNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <RequiredLabel text="Número do Cartão" />
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="0000 0000 0000 0000" {...field} onChange={handleCardNumberChange} maxLength={19} />
                {cardType && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium">{cardType}</div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cardholderName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <RequiredLabel text="Nome no Cartão" />
            </FormLabel>
            <FormControl>
              <Input placeholder="Nome como está no cartão" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Data de Validade" />
              </FormLabel>
              <FormControl>
                <Input placeholder="MM/AA" {...field} onChange={handleExpiryDateChange} maxLength={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <RequiredLabel text="Código de Segurança (CVV)" />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123"
                  {...field}
                  maxLength={4}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="installments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <RequiredLabel text="Parcelas" />
            </FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 gap-3">
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <RadioGroupItem value="1" />
                  </FormControl>
                  <FormLabel className="flex-1 cursor-pointer font-normal">
                    1x de R$ {calculateInstallmentValue(1)} sem juros
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <RadioGroupItem value="2" />
                  </FormControl>
                  <FormLabel className="flex-1 cursor-pointer font-normal">
                    2x de R$ {calculateInstallmentValue(2)} sem juros
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <RadioGroupItem value="3" />
                  </FormControl>
                  <FormLabel className="flex-1 cursor-pointer font-normal">
                    3x de R$ {calculateInstallmentValue(3)} sem juros
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <RadioGroupItem value="6" />
                  </FormControl>
                  <FormLabel className="flex-1 cursor-pointer font-normal">
                    6x de R$ {calculateInstallmentValue(6)} sem juros
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-3">
                  <FormControl>
                    <RadioGroupItem value="12" />
                  </FormControl>
                  <FormLabel className="flex-1 cursor-pointer font-normal">
                    12x de R$ {calculateInstallmentValue(12)} sem juros
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button type="submit" className="w-full bg-terracota hover:bg-terracota-dark">
        Continuar
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
