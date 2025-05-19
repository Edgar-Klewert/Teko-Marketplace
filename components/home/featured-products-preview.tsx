"use client"

import Link from "next/link"
import Image from "next/image"
import { LockIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Dados simulados de produtos para prévia
const previewProducts = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    price: 89.9,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Cerâmica Marajoara",
    description: "Peça decorativa inspirada na arte marajoara",
    price: 129.9,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Colares Indígenas",
    description: "Colar feito com sementes naturais e tingimento vegetal",
    price: 59.9,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function FeaturedProductsPreview() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {previewProducts.map((product) => (
        <Link href="/login" key={product.id}>
          <Card className="overflow-hidden group cursor-pointer h-full transition-all hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <LockIcon className="h-6 w-6 text-terracota" />
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="font-bold text-terracota">R$ {product.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
