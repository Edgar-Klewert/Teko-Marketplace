"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

// Dados simulados de produtos favoritos
const favoriteProducts = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    price: 89.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "1",
    storeName: "Artesanato Paraense",
    dateAdded: "10/04/2025",
  },
  {
    id: "2",
    name: "Cerâmica Marajoara",
    description: "Peça decorativa inspirada na arte marajoara",
    price: 129.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "2",
    storeName: "Arte do Pará",
    dateAdded: "05/04/2025",
  },
  {
    id: "4",
    name: "Bolsa de Palha",
    description: "Bolsa artesanal feita com palha de tucumã",
    price: 149.9,
    image: "/placeholder.svg?height=300&width=300",
    storeId: "1",
    storeName: "Artesanato Paraense",
    dateAdded: "01/04/2025",
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { addItem } = useCart()
  const [favorites, setFavorites] = useState(favoriteProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recent")

  useEffect(() => {
    if (!user || user.role !== "customer") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "customer") {
    return null
  }

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter((product) => product.id !== id))
  }

  const handleAddToCart = (product: (typeof favoriteProducts)[0]) => {
    addItem({
      productId: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  // Filtrar e ordenar produtos
  const filteredProducts = favorites.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.storeName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "recent":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "oldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      case "price_high":
        return b.price - a.price
      case "price_low":
        return a.price - b.price
      case "name_asc":
        return a.name.localeCompare(b.name)
      case "name_desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Meus Favoritos</h1>
            <p className="text-muted-foreground">Produtos que você salvou para ver mais tarde</p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar favoritos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="price_high">Maior preço</SelectItem>
                <SelectItem value="price_low">Menor preço</SelectItem>
                <SelectItem value="name_asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name_desc">Nome (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-muted p-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Nenhum favorito encontrado</h2>
              <p className="mt-2 text-center text-muted-foreground">
                {searchQuery
                  ? "Nenhum produto corresponde à sua busca."
                  : "Você ainda não adicionou nenhum produto aos favoritos."}
              </p>
              <Link href="/produtos" className="mt-6">
                <Button className="bg-terracota hover:bg-terracota-dark">Ver Produtos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <div key={product.id} className="group relative rounded-lg border overflow-hidden">
                  <div className="absolute right-2 top-2 z-10">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleRemoveFavorite(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link href={`/produtos/${product.id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/lojas/${product.storeId}`}>
                      <p className="text-xs text-muted-foreground hover:text-terracota">{product.storeName}</p>
                    </Link>
                    <Link href={`/produtos/${product.id}`}>
                      <h3 className="mt-1 font-medium group-hover:text-terracota">{product.name}</h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-semibold text-terracota">R$ {product.price.toFixed(2)}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full p-0"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Adicionar ao carrinho</span>
                      </Button>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Adicionado em {product.dateAdded}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
