"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Dados simulados de lojas
const stores = [
  {
    id: "1",
    name: "Artesanato Paraense",
    description: "Artesanato tradicional da região de Belém",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    products: 24,
  },
  {
    id: "2",
    name: "Arte do Pará",
    description: "Cerâmicas e artes visuais paraenses",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    products: 18,
  },
  {
    id: "3",
    name: "Biojoias da Amazônia",
    description: "Joias sustentáveis feitas com materiais da floresta",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    products: 32,
  },
  {
    id: "4",
    name: "Madeira & Arte",
    description: "Esculturas e móveis em madeira de reaproveitamento",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    products: 15,
  },
  {
    id: "5",
    name: "Essências da Floresta",
    description: "Óleos essenciais e produtos naturais da Amazônia",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    products: 28,
  },
  {
    id: "6",
    name: "Tecelagem Indígena",
    description: "Tecidos e trançados de comunidades indígenas",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    products: 20,
  },
]

export function FeaturedStores() {
  const [currentPage, setCurrentPage] = useState(0)
  const storesPerPage = 3
  const totalPages = Math.ceil(stores.length / storesPerPage)

  const currentStores = stores.slice(currentPage * storesPerPage, (currentPage + 1) * storesPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">Lojas em Destaque</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0 && totalPages > 1}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 && totalPages > 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentStores.map((store) => (
          <Card key={store.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={store.image || "/placeholder.svg"}
                alt={store.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <Link href={`/lojas/${store.id}`}>
                <h3 className="mb-2 text-xl font-semibold hover:text-terracota">{store.name}</h3>
              </Link>
              <p className="mb-3 text-sm text-muted-foreground">{store.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{store.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{store.products} produtos</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/lojas/${store.id}`} className="w-full">
                <Button variant="default" className="w-full bg-terracota hover:bg-terracota-dark">
                  Visitar Loja
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/lojas">
          <Button variant="outline" className="border-terracota text-terracota hover:bg-terracota/10">
            Ver Todas as Lojas
          </Button>
        </Link>
      </div>
    </section>
  )
}
