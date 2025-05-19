"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface PixPaymentProps {
  totalPrice: number
  onContinue: () => void
}

export function PixPayment({ totalPrice, onContinue }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Gerar uma chave PIX aleatória para simulação
  const pixKey = "teko" + Math.random().toString(36).substring(2, 10)

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)

    toast({
      title: "Chave PIX copiada!",
      description: "A chave PIX foi copiada para a área de transferência.",
    })

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-muted p-4 text-center">
        <p className="mb-2 text-sm text-muted-foreground">Valor a pagar</p>
        <p className="text-2xl font-bold">R$ {totalPrice.toFixed(2)}</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative h-64 w-64">
          <Image
            src="/placeholder.svg?height=250&width=250&text=QR+Code+PIX"
            alt="QR Code PIX"
            fill
            className="rounded-lg border p-2"
          />
        </div>

        <div className="w-full space-y-2">
          <p className="text-center text-sm font-medium">Ou copie a chave PIX abaixo:</p>
          <div className="flex items-center gap-2 rounded-md border bg-background p-3">
            <div className="flex-1 truncate text-sm">{pixKey}</div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopyPixKey}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-lg bg-muted p-4">
        <h3 className="font-medium">Instruções:</h3>
        <ol className="list-inside list-decimal space-y-2 text-sm">
          <li>Abra o aplicativo do seu banco</li>
          <li>Escolha a opção de pagamento via PIX</li>
          <li>Escaneie o QR Code ou copie e cole a chave PIX</li>
          <li>Confirme as informações e o valor</li>
          <li>Finalize o pagamento no aplicativo do seu banco</li>
        </ol>
      </div>

      <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
        <p>
          <strong>Importante:</strong> Após realizar o pagamento via PIX, ele será processado em instantes. Clique em
          "Continuar" para finalizar seu pedido.
        </p>
      </div>

      <Button type="button" className="w-full bg-terracota hover:bg-terracota-dark" onClick={onContinue}>
        Continuar
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
