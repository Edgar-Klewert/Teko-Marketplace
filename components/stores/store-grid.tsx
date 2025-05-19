"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StoreCard } from "./store-card"

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

interface StoreGridProps {
  limit?: number
  showPagination?: boolean
  title?: string
}

export function StoreGrid({ limit, showPagination = true, title }: StoreGridProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const storesPerPage = limit || 6
  const totalPages = Math.ceil(stores.length / storesPerPage)

  const currentStores = stores.slice(currentPage * storesPerPage, (currentPage + 1) * storesPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">{title}</h2>
          {showPagination && (
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
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  )
}
