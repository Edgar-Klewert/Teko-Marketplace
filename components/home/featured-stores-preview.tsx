"use client"

import Link from "next/link"
import Image from "next/image"
import { LockIcon, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Dados simulados de lojas para prévia
const previewStores = [
  {
    id: "1",
    name: "Artesanato Manauara",
    description: "Artesanato tradicional da região de Manaus",
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
]

export function FeaturedStoresPreview() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {previewStores.map((store) => (
        <Link href="/login" key={store.id}>
          <Card className="overflow-hidden group cursor-pointer h-full transition-all hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src={store.image || "/placeholder.svg"}
                alt={store.name}
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
              <h3 className="text-xl font-semibold mb-1">{store.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{store.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{store.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{store.products} produtos</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
