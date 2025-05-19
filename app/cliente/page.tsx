"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Package, ShoppingBag, Heart, CreditCard, MessageSquare, User, HelpCircle, Home, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

export default function CustomerDashboard() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="bg-terracota text-white py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Olá, {user.name}!</h1>
            <p>Bem-vindo ao seu painel de cliente.</p>
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
                </div>

                <nav className="space-y-1">
                  <Link
                    href="/cliente"
                    className="flex items-center gap-3 p-2 rounded-md bg-terracota/10 text-terracota font-medium"
                  >
                    <Home className="h-5 w-5" />
                    <span>Painel</span>
                  </Link>
                  <Link
                    href="/cliente/pedidos"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    <span>Meus Pedidos</span>
                  </Link>
                  <Link
                    href="/cliente/favoritos"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Favoritos</span>
                  </Link>
                  <Link
                    href="/cliente/avaliacoes"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Avaliações</span>
                  </Link>
                  <Link
                    href="/cliente/pagamentos"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Pagamentos</span>
                  </Link>
                  <Link
                    href="/cliente/perfil"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <User className="h-5 w-5" />
                    <span>Meu Perfil</span>
                  </Link>
                  <Link
                    href="/cliente/configuracoes"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Configurações</span>
                  </Link>
                  <Link
                    href="/cliente/suporte"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>Suporte</span>
                  </Link>
                </nav>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pedidos Realizados</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">2 em andamento</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Produtos Favoritos</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">3 adicionados recentemente</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avaliações Feitas</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">Você avaliou 8 produtos</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Acompanhe o status dos seus últimos pedidos</CardDescription>
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
                          <div className="text-sm text-muted-foreground">
                            {id}/04/2025 • {id + 1} produtos
                          </div>
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
                            {id === 1 ? "Em processamento" : id === 2 ? "Entregue" : "A caminho"}
                          </span>
                          <Link href={`/cliente/pedidos/${id}`}>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos Recomendados</CardTitle>
                  <CardDescription>Com base nas suas compras e interesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((id) => (
                      <div key={id} className="rounded-lg border overflow-hidden">
                        <div className="relative h-32">
                          <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt={`Produto ${id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm">Produto Recomendado {id}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-bold text-terracota">R$ {(id * 75).toFixed(2)}</span>
                            <Link href={`/produtos/${id}`}>
                              <Button size="sm" variant="outline">
                                Ver
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
