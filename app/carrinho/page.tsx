"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowLeft, ArrowRight, Check, CreditCard, Loader2, QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { AddressForm } from "@/components/payment/address-form"
import { CreditCardForm } from "@/components/payment/credit-card-form"
import { PaymentSuccessModal } from "@/components/payment/payment-success-modal"
import { PixPayment } from "@/components/payment/pix-payment"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import {
  addressFormSchema,
  creditCardFormSchema,
  type AddressFormValues,
  type CreditCardFormValues,
} from "@/lib/validations/payment"

type CheckoutStep = "address" | "payment" | "review"

interface FormData {
  address: AddressFormValues
  payment: {
    method: "credit" | "pix"
    creditCard?: CreditCardFormValues
  }
}

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<CheckoutStep>("address")
  const [formData, setFormData] = useState<FormData>({
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    payment: {
      method: "credit",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: formData.address,
    mode: "onChange",
  })

  const creditCardForm = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardFormSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      installments: "1",
    },
    mode: "onChange",
  })

  const handleAddressSubmit = (data: AddressFormValues) => {
    setFormData((prev) => ({
      ...prev,
      address: data,
    }))
    nextStep()
  }

  const handlePaymentMethodChange = (method: "credit" | "pix") => {
    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method,
      },
    }))
  }

  const handleCreditCardSubmit = (data: CreditCardFormValues) => {
    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        creditCard: data,
      },
    }))
    nextStep()
  }

  const nextStep = () => {
    if (step === "address") {
      setStep("payment")
    } else if (step === "payment") {
      setStep("review")
    }
  }

  const prevStep = () => {
    if (step === "payment") {
      setStep("address")
    } else if (step === "review") {
      setStep("payment")
    }
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setShowSuccessModal(true)
      clearCart()
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container flex-1 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-terracota">Seu carrinho está vazio</h1>
            <p className="mb-8 text-muted-foreground">
              Parece que você ainda não adicionou nenhum produto ao seu carrinho.
            </p>
            <Button onClick={() => router.push("/produtos")} className="bg-terracota hover:bg-terracota-dark">
              Explorar Produtos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-terracota">Finalizar Compra</h1>
          <p className="text-muted-foreground">Complete as informações abaixo para finalizar sua compra</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                    step === "address" || step === "payment" || step === "review"
                      ? "border-terracota bg-terracota text-white"
                      : "border-muted bg-muted text-muted-foreground",
                  )}
                >
                  {step === "address" || step === "payment" || step === "review" ? (
                    step === "address" ? (
                      "1"
                    ) : (
                      <Check className="h-4 w-4" />
                    )
                  ) : (
                    "1"
                  )}
                </div>
                <span className={step === "address" ? "font-medium text-terracota" : ""}>Endereço</span>
              </div>

              <div className="h-px flex-1 self-center bg-border" />

              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                    step === "payment" || step === "review"
                      ? "border-terracota bg-terracota text-white"
                      : "border-muted bg-muted text-muted-foreground",
                  )}
                >
                  {step === "payment" || step === "review" ? (
                    step === "payment" ? (
                      "2"
                    ) : (
                      <Check className="h-4 w-4" />
                    )
                  ) : (
                    "2"
                  )}
                </div>
                <span className={step === "payment" ? "font-medium text-terracota" : ""}>Pagamento</span>
              </div>

              <div className="h-px flex-1 self-center bg-border" />

              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border text-sm",
                    step === "review"
                      ? "border-terracota bg-terracota text-white"
                      : "border-muted bg-muted text-muted-foreground",
                  )}
                >
                  3
                </div>
                <span className={step === "review" ? "font-medium text-terracota" : ""}>Revisão</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                {step === "address" && <AddressForm form={addressForm} onSubmit={handleAddressSubmit} />}

                {step === "payment" && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Método de Pagamento</h2>
                    <Tabs
                      defaultValue="credit"
                      value={formData.payment.method}
                      onValueChange={(value) => handlePaymentMethodChange(value as "credit" | "pix")}
                      className="w-full"
                    >
                      <TabsList className="mb-4 grid w-full grid-cols-2">
                        <TabsTrigger value="credit" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Cartão de Crédito</span>
                        </TabsTrigger>
                        <TabsTrigger value="pix" className="flex items-center gap-2">
                          <QrCode className="h-4 w-4" />
                          <span>PIX</span>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit">
                        <CreditCardForm
                          form={creditCardForm}
                          onSubmit={handleCreditCardSubmit}
                          totalPrice={totalPrice}
                        />
                      </TabsContent>
                      <TabsContent value="pix">
                        <PixPayment totalPrice={totalPrice} onContinue={nextStep} />
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {step === "review" && (
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">Revisão do Pedido</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 font-medium">Endereço de Entrega</h3>
                        <div className="rounded-md bg-muted p-3 text-sm">
                          <p>
                            {formData.address.street}, {formData.address.number}
                            {formData.address.complement ? `, ${formData.address.complement}` : ""}
                          </p>
                          <p>
                            {formData.address.neighborhood} - {formData.address.city}/{formData.address.state}
                          </p>
                          <p>CEP: {formData.address.cep}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Método de Pagamento</h3>
                        <div className="rounded-md bg-muted p-3 text-sm">
                          {formData.payment.method === "credit" && formData.payment.creditCard ? (
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              <span>
                                Cartão de crédito terminando em {formData.payment.creditCard.cardNumber.slice(-4)}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <QrCode className="h-4 w-4" />
                              <span>Pagamento via PIX</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Itens do Pedido</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                              </div>
                              <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step !== "address" && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Voltar
                    </Button>
                  )}
                  {step === "address" && (
                    <Button
                      type="button"
                      className="ml-auto bg-terracota hover:bg-terracota-dark"
                      onClick={() => addressForm.handleSubmit(handleAddressSubmit)()}
                    >
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {step === "payment" && formData.payment.method === "credit" && (
                    <Button
                      type="button"
                      className="ml-auto bg-terracota hover:bg-terracota-dark"
                      onClick={() => creditCardForm.handleSubmit(handleCreditCardSubmit)()}
                    >
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {step === "review" && (
                    <Button
                      type="button"
                      className="ml-auto bg-terracota hover:bg-terracota-dark"
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Finalizar Compra"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Resumo do Pedido</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} itens)</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600">Grátis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        paymentMethod={formData.payment.method}
        totalPrice={totalPrice}
      />
    </div>
  )
}
