"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Truck, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

// Dados simulados de pedidos
const orders = [
  {
    id: "1001",
    date: "10/04/2025",
    status: "entregue",
    total: 159.8,
    subtotal: 149.8,
    shipping: 15,
    discount: 5,
    paymentMethod: "Cartão de Crédito",
    lastDigits: "1234",
    address: {
      street: "Av. Pará, 1234",
      city: "Belém",
      state: "PA",
      zipCode: "66000-000",
      recipient: "João Silva",
    },
    items: [
      {
        id: "1",
        name: "Cesto Trançado",
        price: 89.9,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "3",
        name: "Colares Indígenas",
        price: 59.9,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tracking: "BR123456789",
    timeline: [
      {
        status: "Pedido realizado",
        date: "10/04/2025 08:30",
        description: "Seu pedido foi recebido e está sendo processado.",
      },
      {
        status: "Pagamento confirmado",
        date: "10/04/2025 09:15",
        description: "O pagamento foi aprovado e seu pedido está sendo preparado.",
      },
      {
        status: "Em separação",
        date: "10/04/2025 14:20",
        description: "Seus produtos estão sendo separados para envio.",
      },
      {
        status: "Enviado",
        date: "11/04/2025 10:45",
        description: "Seu pedido foi enviado e está a caminho.",
      },
      {
        status: "Entregue",
        date: "15/04/2025 14:30",
        description: "Seu pedido foi entregue com sucesso.",
      },
    ],
  },
  {
    id: "1002",
    date: "05/04/2025",
    status: "enviado",
    total: 129.9,
    subtotal: 129.9,
    shipping: 0,
    discount: 0,
    paymentMethod: "PIX",
    address: {
      street: "Rua das Flores, 567",
      city: "Belém",
      state: "PA",
      zipCode: "66000-000",
      recipient: "João Silva",
    },
    items: [
      {
        id: "2",
        name: "Cerâmica Marajoara",
        price: 129.9,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tracking: "BR987654321",
    timeline: [
      {
        status: "Pedido realizado",
        date: "05/04/2025 10:15",
        description: "Seu pedido foi recebido e está sendo processado.",
      },
      {
        status: "Pagamento confirmado",
        date: "05/04/2025 10:20",
        description: "O pagamento foi aprovado e seu pedido está sendo preparado.",
      },
      {
        status: "Em separação",
        date: "06/04/2025 09:30",
        description: "Seus produtos estão sendo separados para envio.",
      },
      {
        status: "Enviado",
        date: "07/04/2025 11:15",
        description: "Seu pedido foi enviado e está a caminho.",
      },
    ],
  },
  {
    id: "1003",
    date: "01/04/2025",
    status: "processando",
    total: 245.8,
    subtotal: 241.7,
    shipping: 15,
    discount: 10.9,
    paymentMethod: "Boleto Bancário",
    address: {
      street: "Rua dos Artesãos, 789",
      city: "Belém",
      state: "PA",
      zipCode: "66000-000",
      recipient: "João Silva",
    },
    items: [
      {
        id: "4",
        name: "Bolsa de Palha",
        price: 149.9,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "6",
        name: "Óleo Essencial",
        price: 45.9,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    timeline: [
      {
        status: "Pedido realizado",
        date: "01/04/2025 16:45",
        description: "Seu pedido foi recebido e está sendo processado.",
      },
      {
        status: "Pagamento confirmado",
        date: "02/04/2025 10:30",
        description: "O pagamento foi aprovado e seu pedido está sendo preparado.",
      },
      {
        status: "Em separação",
        date: "03/04/2025 14:20",
        description: "Seus produtos estão sendo separados para envio.",
      },
    ],
  },
]

export default function OrderDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState<(typeof orders)[0] | null>(null)

  useEffect(() => {
    if (!user || user.role !== "customer") {
      router.push("/login")
      return
    }

    const orderId = params.id as string
    const foundOrder = orders.find((o) => o.id === orderId)

    if (foundOrder) {
      setOrder(foundOrder)
    } else {
      router.push("/cliente/pedidos")
    }
  }, [user, router, params.id])

  if (!user || user.role !== "customer" || !order) {
    return null
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "entregue":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "enviado":
        return <Truck className="h-6 w-6 text-blue-600" />
      case "processando":
        return <Package className="h-6 w-6 text-yellow-600" />
      case "cancelado":
        return <AlertCircle className="h-6 w-6 text-red-600" />
      default:
        return <HelpCircle className="h-6 w-6 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "entregue":
        return "Entregue"
      case "enviado":
        return "Enviado"
      case "processando":
        return "Processando"
      case "cancelado":
        return "Cancelado"
      default:
        return status
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "entregue":
        return "bg-green-100 text-green-800"
      case "enviado":
        return "bg-blue-100 text-blue-800"
      case "processando":
        return "bg-yellow-100 text-yellow-800"
      case "cancelado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6">
            <Link href="/cliente/pedidos" className="inline-flex items-center text-sm hover:text-terracota">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para pedidos
            </Link>
            <h1 className="mt-2 text-3xl font-bold">Detalhes do Pedido</h1>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Pedido #{order.id}</CardTitle>
                    <CardDescription>Realizado em {order.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/produtos/${item.id}`} className="hover:text-terracota">
                            <h3 className="font-medium">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            Quantidade: {item.quantity} • R$ {item.price.toFixed(2)} cada
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acompanhamento do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="mb-8 flex last:mb-0">
                        <div className="mr-4 flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                            {index === 0 ? (
                              <Package className="h-5 w-5" />
                            ) : index === order.timeline.length - 1 && order.status === "entregue" ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <Truck className="h-5 w-5" />
                            )}
                          </div>
                          {index < order.timeline.length - 1 && <div className="h-full w-px bg-border" />}
                        </div>
                        <div>
                          <p className="font-medium">{event.status}</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                          <p className="mt-1 text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.tracking && (
                    <div className="mt-6 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Código de Rastreio</p>
                          <p className="text-sm text-muted-foreground">
                            Use este código para rastrear seu pedido no site da transportadora
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-medium">{order.tracking}</p>
                          <Button variant="link" className="h-auto p-0 text-sm text-terracota">
                            Rastrear Pedido
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span>R$ {order.shipping.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto</span>
                        <span>- R$ {order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>R$ {order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Método</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                    {order.lastDigits && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cartão</span>
                        <span>**** **** **** {order.lastDigits}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="text-green-600">Aprovado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">{order.address.recipient}</p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state} - {order.address.zipCode}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col space-y-2">
                <Button variant="outline">Solicitar Devolução</Button>
                <Button variant="outline">Entrar em Contato</Button>
                <Button variant="outline">Baixar Nota Fiscal</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
