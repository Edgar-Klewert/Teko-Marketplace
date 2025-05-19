"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    storeId: string
    storeName: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <Card className="overflow-hidden h-full">
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
          <Button variant="outline" className="w-full" onClick={handleAddToCart}>
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
  )
}
