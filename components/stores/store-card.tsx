import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StoreCardProps {
  store: {
    id: string
    name: string
    description: string
    image: string
    rating: number
    products: number
  }
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="overflow-hidden">
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
  )
}
