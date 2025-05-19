"use client"

import { CheckCircle2, CreditCard, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  paymentMethod: "credit" | "pix"
  totalPrice: number
}

export function PaymentSuccessModal({ isOpen, onClose, paymentMethod, totalPrice }: PaymentSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <DialogTitle className="text-center text-xl">Pedido Realizado com Sucesso!</DialogTitle>
          <DialogDescription className="text-center">
            Obrigado por comprar na Teko. Seu pedido foi recebido e está sendo processado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-3">
              {paymentMethod === "credit" ? (
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              ) : (
                <QrCode className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Pagamento via {paymentMethod === "credit" ? "Cartão de Crédito" : "PIX"}</p>
                <p className="text-sm text-muted-foreground">Total: R$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium">Informações importantes:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              {paymentMethod === "credit" ? (
                <>
                  <li>Seu pagamento foi aprovado</li>
                  <li>Você receberá um e-mail com os detalhes do pedido</li>
                  <li>O prazo de entrega é de 5 a 10 dias úteis</li>
                </>
              ) : (
                <>
                  <li>Seu pagamento via PIX foi confirmado</li>
                  <li>Você receberá um e-mail com os detalhes do pedido</li>
                  <li>O prazo de entrega é de 5 a 10 dias úteis</li>
                </>
              )}
            </ul>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="w-full bg-terracota hover:bg-terracota-dark sm:w-auto">
            Continuar Comprando
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
