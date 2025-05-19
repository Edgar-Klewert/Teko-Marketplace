import { z } from "zod"

// Função para validar número de cartão usando algoritmo de Luhn
function isValidCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "")

  if (digits.length < 13 || digits.length > 19) {
    return false
  }

  let sum = 0
  let double = false

  // Percorre os dígitos da direita para a esquerda
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits[i], 10)

    if (double) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    double = !double
  }

  return sum % 10 === 0
}

// Esquema de validação para o formulário de endereço
export const addressFormSchema = z.object({
  cep: z
    .string()
    .min(8, { message: "CEP é obrigatório" })
    .refine((val) => /^\d{5}-?\d{3}$/.test(val.replace(/\D/g, "").replace(/^(\d{5})(\d{3})$/, "$1-$2")), {
      message: "CEP inválido",
    }),
  street: z.string().min(3, { message: "Rua é obrigatória" }),
  number: z.string().min(1, { message: "Número é obrigatório" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { message: "Bairro é obrigatório" }),
  city: z.string().min(2, { message: "Cidade é obrigatória" }),
  state: z.string().min(2, { message: "Estado é obrigatório" }),
})

// Esquema de validação para o formulário de cartão de crédito
export const creditCardFormSchema = z.object({
  cardNumber: z
    .string()
    .min(13, { message: "Número do cartão é obrigatório" })
    .refine((val) => isValidCreditCard(val), {
      message: "Número de cartão inválido",
    }),
  cardholderName: z
    .string()
    .min(3, { message: "Nome no cartão é obrigatório" })
    .refine((val) => /^[a-zA-Z\s]+$/.test(val), {
      message: "Nome no cartão deve conter apenas letras",
    }),
  expiryDate: z
    .string()
    .min(5, { message: "Data de validade é obrigatória" })
    .refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
      message: "Data de validade inválida (MM/AA)",
    })
    .refine(
      (val) => {
        const [month, year] = val.split("/")
        const expiryDate = new Date(2000 + Number.parseInt(year, 10), Number.parseInt(month, 10) - 1)
        const currentDate = new Date()
        return expiryDate > currentDate
      },
      {
        message: "Cartão expirado",
      },
    ),
  cvv: z
    .string()
    .min(3, { message: "CVV é obrigatório" })
    .max(4)
    .refine((val) => /^\d{3,4}$/.test(val), {
      message: "CVV inválido",
    }),
  installments: z.string().min(1, { message: "Selecione o número de parcelas" }),
})

// Tipos derivados dos esquemas
export type AddressFormValues = z.infer<typeof addressFormSchema>
export type CreditCardFormValues = z.infer<typeof creditCardFormSchema>

// Esquema de validação para pagamento PIX
export const pixPaymentSchema = z.object({
  paymentMethod: z.literal("pix"),
  pixKey: z.string().min(1, { message: "Chave PIX é obrigatória" }),
  pixQrCode: z.string().min(1, { message: "QR Code PIX é obrigatório" }),
})

// Esquema de validação para pagamento com boleto
export const boletoPaymentSchema = z.object({
  paymentMethod: z.literal("boleto"),
  boletoNumber: z.string().min(1, { message: "Número do boleto é obrigatório" }),
  boletoUrl: z.string().url({ message: "URL do boleto inválida" }),
  dueDate: z.string().min(1, { message: "Data de vencimento é obrigatória" }),
})

// Tipos para uso nos formulários
export type PixPaymentValues = z.infer<typeof pixPaymentSchema>
export type BoletoPaymentValues = z.infer<typeof boletoPaymentSchema>

// Função para gerar chave PIX aleatória segura
export function generateSecurePixKey(length = 32) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)

  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % characters.length)
  }

  return result
}

// Função para validar e formatar número de cartão
export function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(" ")
  } else {
    return value
  }
}

// Função para formatar data de expiração
export function formatExpiryDate(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`
  }

  return v
}

// Função para mascarar número de cartão
export function maskCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.replace(/\s/g, "").slice(-4)
  return `**** **** **** ${lastFourDigits}`
}

// Função para validar segurança do pagamento
export function validatePaymentSecurity(paymentData: any): { isValid: boolean; message?: string } {
  // Verificações de segurança adicionais podem ser implementadas aqui
  // Por exemplo, verificar se o IP é suspeito, se há muitas tentativas de pagamento, etc.

  return { isValid: true }
}
