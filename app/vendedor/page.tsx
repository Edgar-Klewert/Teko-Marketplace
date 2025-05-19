"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Package,
  ShoppingBag,
  BarChart,
  MessageSquare,
  Settings,
  HelpCircle,
  PlusCircle,
  Home,
  Store,
  Layers,
  Star,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

export default function SellerDashboard() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.role !== "seller") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "seller") {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-terracota text-white py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Olá, {user.name}!</h1>
            <p>Bem-vindo ao seu painel de vendedor.</p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-terracota/20">
                    <Image src="/placeholder.svg?height=100&width=100" alt={user.name} fill className="object-cover" />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2 px-3 py-1 bg-terracota/10 text-terracota rounded-full text-xs">Vendedor</div>
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/vendedor"
                    className="flex items-center gap-3 p-2 rounded-md bg-terracota/10 text-terracota font-medium"
                  >
                    <Home className="h-5 w-5" />
                    <span>Painel</span>
                  </Link>
                  <Link
                    href="/vendedor/loja"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Store className="h-5 w-5" />
                    <span>Minha Loja</span>
                  </Link>
                  <Link
                    href="/vendedor/produtos"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Produtos</span>
                  </Link>
                  <Link
                    href="/vendedor/estoque"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Layers className="h-5 w-5" />
                    <span>Estoque</span>
                  </Link>
                  <Link
                    href="/vendedor/pedidos"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    <span>Pedidos</span>
                  </Link>
                  <Link
                    href="/vendedor/mensagens"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Mensagens</span>
                  </Link>
                  <Link
                    href="/vendedor/avaliacoes"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Star className="h-5 w-5" />
                    <span>Avaliações</span>
                  </Link>
                  <Link
                    href="/vendedor/estatisticas"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Estatísticas</span>
                  </Link>
                  <Link
                    href="/vendedor/configuracoes"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                  </Link>
                  <Link
                    href="/vendedor/suporte"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Suporte</span>
                  </Link>
                </nav>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/vendedor/produtos/novo">
                    <Button className="w-full bg-terracota hover:bg-terracota-dark">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Novo Produto
                    </Button>
                  </Link>
                  <Link href="/vendedor/loja">
                    <Button variant="outline" className="w-full">
                      <Store className="mr-2 h-4 w-4" />
                      Gerenciar Loja
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Vendas do Mês</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 4.250,00</div>
                    <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">3 aguardando envio</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avaliações</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-xs text-muted-foreground">12 novas avaliações este mês</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Gerencie os pedidos recebidos na sua loja</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Pedidos simulados */}
                    {[1, 2, 3].map((id) => (
                      <div key={id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <div className="font-medium">
                            Pedido #{id}00{id}
                          </div>
                          <div className="text-sm text-muted-foreground">Cliente: João Silva • {id}/04/2025</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              id === 1
                                ? "bg-yellow-100 text-yellow-800"
                                : id === 2
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {id === 1 ? "Novo" : id === 2 ? "Enviado" : "Processando"}
                          </span>
                          <Link href={`/vendedor/pedidos/${id}`}>
                            <Button variant="outline" size="sm">
                              Gerenciar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos Populares</CardTitle>
                    <CardDescription>Seus produtos mais vendidos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((id) => (
                        <div key={id} className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src="/placeholder.svg?height=50&width=50"
                              alt={`Produto ${id}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">Produto Popular {id}</h3>
                            <p className="text-xs text-muted-foreground">{id * 10} vendas este mês</p>
                          </div>
                          <div className="text-sm font-bold text-terracota">R$ {(id * 75).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Avaliações Recentes</CardTitle>
                    <CardDescription>Últimas avaliações dos seus produtos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((id) => (
                        <div key={id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-sm">Cliente {id}</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className={`h-4 w-4 ${starIndex < 5 - id * 0.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">
                            "Produto de excelente qualidade, superou minhas expectativas. Recomendo!"
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              Produto:{" "}
                              {id === 1 ? "Cesto Trançado" : id === 2 ? "Cerâmica Marajoara" : "Colares Indígenas"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {id} dia{id > 1 ? "s" : ""} atrás
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
