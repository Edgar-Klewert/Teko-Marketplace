"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Phone, Mail, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Dados simulados de lojas
const stores = [
  {
    id: "1",
    name: "Artesanato Paraense",
    description:
      "Artesanato tradicional da região de Belém, com foco em cestaria e objetos decorativos feitos com fibras naturais da Amazônia. Nossa loja valoriza técnicas tradicionais passadas por gerações de artesãos locais.",
    image: "/placeholder.svg?height=300&width=300",
    coverImage: "/placeholder.svg?height=400&width=1200",
    rating: 4.8,
    products: 24,
    location: "Belém, PA",
    phone: "(92) 3333-4444",
    email: "contato@artesanatoparaense.com.br",
    since: "2015",
    categories: ["Cestaria", "Decoração", "Utensílios"],
  },
  {
    id: "2",
    name: "Arte do Pará",
    description:
      "Cerâmicas e artes visuais paraenses inspiradas na rica cultura marajoara. Trabalhamos com artistas locais para criar peças únicas que contam histórias da região amazônica.",
    image: "/placeholder.svg?height=300&width=300",
    coverImage: "/placeholder.svg?height=400&width=1200",
    rating: 4.7,
    products: 18,
    location: "Belém, PA",
    phone: "(91) 3333-4444",
    email: "contato@artedopara.com.br",
    since: "2018",
    categories: ["Cerâmica", "Arte Visual", "Decoração"],
  },
]

export default function StorePage() {
  const params = useParams()
  const storeId = params.id as string
  const [activeTab, setActiveTab] = useState("produtos")

  // Encontrar a loja pelo ID
  const store = stores.find((s) => s.id === storeId)

  if (!store) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container py-16">
            <div className="mb-6">
              <Link href="/lojas" className="inline-flex items-center text-sm hover:text-terracota">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para lojas
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="mb-4 text-3xl font-bold">Loja não encontrada</h1>
              <p className="mb-8 text-muted-foreground">A loja que você está procurando não existe ou foi removida.</p>
              <Button asChild className="bg-terracota hover:bg-terracota-dark">
                <Link href="/lojas">Ver outras lojas</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[300px] md:h-[400px]">
          <Image src={store.coverImage || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container pb-8">
              <Link href="/lojas" className="inline-flex items-center text-white mb-4 hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para lojas
              </Link>
              <h1 className="text-4xl font-bold text-white mb-2">{store.name}</h1>
              <div className="flex items-center text-white">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="mr-4">
                  {store.rating} ({store.products * 2} avaliações)
                </span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{store.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="produtos">Produtos</TabsTrigger>
                  <TabsTrigger value="sobre">Sobre</TabsTrigger>
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                </TabsList>

                <TabsContent value="produtos">
                  <h2 className="text-2xl font-semibold mb-6">Produtos de {store.name}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Produtos simulados */}
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative aspect-square">
                          <Image
                            src="/placeholder.svg?height=300&width=300"
                            alt={`Produto ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-1">Produto {index + 1}</h3>
                          <p className="text-sm text-muted-foreground mb-2">Descrição breve do produto {index + 1}</p>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-terracota">R$ {((index + 1) * 50).toFixed(2)}</span>
                            <Button size="sm" className="bg-terracota hover:bg-terracota-dark">
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Comprar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sobre">
                  <h2 className="text-2xl font-semibold mb-4">Sobre {store.name}</h2>

                  <p className="text-muted-foreground mb-6">{store.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Informações</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-terracota" />
                          <span>{store.location}</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-terracota" />
                          <span>{store.phone}</span>
                        </li>
                        <li className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-terracota" />
                          <span>{store.email}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Categorias</h3>
                      <div className="flex flex-wrap gap-2">
                        {store.categories.map((category, index) => (
                          <span key={index} className="px-3 py-1 bg-terracota/10 text-terracota rounded-full text-sm">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Desde {store.since}</h3>
                    <p className="text-muted-foreground">
                      {store.name} está na plataforma Teko desde {store.since}, trazendo o melhor do artesanato
                      amazônico para todo o Brasil.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="avaliacoes">
                  <h2 className="text-2xl font-semibold mb-6">Avaliações</h2>

                  <div className="space-y-6">
                    {/* Avaliações simuladas */}
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="border-b pb-6 last:border-0">
                        <div className="flex justify-between mb-2">
                          <div className="font-semibold">Cliente {index + 1}</div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={`h-4 w-4 ${starIndex < 5 - index * 0.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Praesent euismod,
                          nisi vel consectetur euismod, nunc nunc euismod nunc.
                        </p>
                        <div className="text-xs text-muted-foreground">Publicado em {10 - index}/04/2025</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-terracota">
                      <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-semibold text-xl">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.location}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Produtos:</span>
                      <span className="font-semibold">{store.products}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avaliação:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{store.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Na Teko desde:</span>
                      <span className="font-semibold">{store.since}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-terracota hover:bg-terracota-dark">Contatar Vendedor</Button>
                    <Button variant="outline" className="w-full">
                      Seguir Loja
                    </Button>
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
