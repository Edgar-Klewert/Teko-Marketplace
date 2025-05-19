"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"

// Dados simulados de produtos
const products = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    price: 89.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "1",
    storeName: "Artesanato Manauara",
  },
  {
    id: "2",
    name: "Cerâmica Marajoara",
    description: "Peça decorativa inspirada na arte marajoara",
    price: 129.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "2",
    storeName: "Arte do Pará",
  },
  {
    id: "3",
    name: "Colares Indígenas",
    description: "Colar feito com sementes naturais e tingimento vegetal",
    price: 59.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "3",
    storeName: "Biojoias da Amazônia",
  },
  {
    id: "4",
    name: "Bolsa de Palha",
    description: "Bolsa artesanal feita com palha de tucumã",
    price: 149.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "1",
    storeName: "Artesanato Manauara",
  },
  {
    id: "5",
    name: "Escultura em Madeira",
    description: "Escultura feita com madeira de reaproveitamento",
    price: 199.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "4",
    storeName: "Madeira & Arte",
  },
  {
    id: "6",
    name: "Óleo Essencial",
    description: "Óleo essencial de copaíba 100% natural",
    price: 45.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "5",
    storeName: "Essências da Floresta",
  },
]

interface ProductGridProps {
  limit?: number
  showPagination?: boolean
  title?: string
}

export function ProductGrid({ limit, showPagination = true, title }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = limit || 6
  const totalPages = Math.ceil(products.length / productsPerPage)

  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

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
          {showPagination && totalPages > 1 && (
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevPage} disabled={currentPage === 0}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextPage} disabled={currentPage === totalPages - 1}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
