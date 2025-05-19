"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

// Dados simulados de produtos
const products = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    price: 89.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "1",
    storeName: "Artesanato Paraense",
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
    storeName: "Artesanato Paraense",
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

export function FeaturedProducts() {
  const { addItem } = useCart()
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 3
  const totalPages = Math.ceil(products.length / productsPerPage)

  const currentProducts = products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      productId: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">Produtos em Destaque</h2>
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
        {currentProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <Link href={`/lojas/${product.storeId}`}>
                  <Badge variant="outline" className="hover:bg-secondary">
                    {product.storeName}
                  </Badge>
                </Link>
                <span className="font-bold text-terracota">R$ {product.price.toFixed(2)}</span>
              </div>
              <Link href={`/produtos/${product.id}`}>
                <h3 className="mb-2 text-xl font-semibold hover:text-terracota">{product.name}</h3>
              </Link>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex w-full gap-2">
                <Button variant="outline" className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
                <Link href={`/produtos/${product.id}`} className="w-full">
                  <Button variant="default" className="w-full bg-terracota hover:bg-terracota-dark">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/produtos">
          <Button variant="outline" className="border-terracota text-terracota hover:bg-terracota/10">
            Ver Todos os Produtos
          </Button>
        </Link>
      </div>
    </section>
  )
}
