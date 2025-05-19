"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Package, Search, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  },
  {
    id: "1002",
    date: "05/04/2025",
    status: "enviado",
    total: 129.9,
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
  },
  {
    id: "1003",
    date: "01/04/2025",
    status: "processando",
    total: 245.8,
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
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.role !== "customer") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "customer") {
    return null
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Meus Pedidos</h1>
            <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar pedidos..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recentes">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentes">Mais recentes</SelectItem>
                  <SelectItem value="antigos">Mais antigos</SelectItem>
                  <SelectItem value="valor_alto">Maior valor</SelectItem>
                  <SelectItem value="valor_baixo">Menor valor</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="todos">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="processando">Processando</TabsTrigger>
              <TabsTrigger value="enviado">Enviados</TabsTrigger>
              <TabsTrigger value="entregue">Entregues</TabsTrigger>
              <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
            </TabsList>
            <TabsContent value="todos" className="mt-6">
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">Nenhum pedido encontrado</h2>
                  <p className="mt-2 text-center text-muted-foreground">Você ainda não realizou nenhum pedido.</p>
                  <Link href="/produtos" className="mt-6">
                    <Button className="bg-terracota hover:bg-terracota-dark">Ver Produtos</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border overflow-hidden">
                      <div className="bg-muted/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Pedido #{order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Realizado em {order.date} • {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "itens"}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Total</div>
                            <div className="font-medium">R$ {order.total.toFixed(2)}</div>
                          </div>
                          <Link href={`/cliente/pedidos/${order.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
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
                        {order.tracking && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Código de rastreio:</span>
                              <span className="text-sm">{order.tracking}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="processando" className="mt-6">
              <div className="space-y-6">
                {orders
                  .filter((order) => order.status === "processando")
                  .map((order) => (
                    <div key={order.id} className="rounded-lg border overflow-hidden">
                      {/* Conteúdo similar ao da aba "todos" */}
                      <div className="bg-muted/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Pedido #{order.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Realizado em {order.date} • {order.items.length}{" "}
                            {order.items.length === 1 ? "item" : "itens"}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Total</div>
                            <div className="font-medium">R$ {order.total.toFixed(2)}</div>
                          </div>
                          <Link href={`/cliente/pedidos/${order.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
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
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            {/* Conteúdo similar para as outras abas */}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
