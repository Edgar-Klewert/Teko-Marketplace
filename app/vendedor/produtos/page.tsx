"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Search, Edit, Trash2, Eye, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

// Dados simulados de produtos
const products = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    price: 89.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "cestaria",
    stock: 15,
    status: "active",
    sales: 24,
    dateAdded: "10/03/2025",
  },
  {
    id: "2",
    name: "Cerâmica Marajoara",
    description: "Peça decorativa inspirada na arte marajoara",
    price: 129.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "ceramica",
    stock: 8,
    status: "active",
    sales: 12,
    dateAdded: "15/03/2025",
  },
  {
    id: "3",
    name: "Colares Indígenas",
    description: "Colar feito com sementes naturais e tingimento vegetal",
    price: 59.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "joias",
    stock: 20,
    status: "active",
    sales: 18,
    dateAdded: "20/03/2025",
  },
  {
    id: "4",
    name: "Bolsa de Palha",
    description: "Bolsa artesanal feita com palha de tucumã",
    price: 149.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "tecidos",
    stock: 5,
    status: "active",
    sales: 7,
    dateAdded: "25/03/2025",
  },
  {
    id: "5",
    name: "Escultura em Madeira",
    description: "Escultura feita com madeira de reaproveitamento",
    price: 199.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "madeira",
    stock: 3,
    status: "active",
    sales: 4,
    dateAdded: "01/04/2025",
  },
  {
    id: "6",
    name: "Óleo Essencial",
    description: "Óleo essencial de copaíba 100% natural",
    price: 45.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "naturais",
    stock: 30,
    status: "active",
    sales: 42,
    dateAdded: "05/04/2025",
  },
  {
    id: "7",
    name: "Tapete Artesanal",
    description: "Tapete feito com fibras naturais e tingimento vegetal",
    price: 179.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "tecidos",
    stock: 0,
    status: "outofstock",
    sales: 8,
    dateAdded: "10/04/2025",
  },
  {
    id: "8",
    name: "Vaso Decorativo",
    description: "Vaso decorativo em cerâmica com motivos amazônicos",
    price: 89.9,
    image: "/placeholder.svg?height=80&width=80",
    category: "ceramica",
    stock: 0,
    status: "draft",
    sales: 0,
    dateAdded: "15/04/2025",
  },
]

export default function ProductsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [productList, setProductList] = useState(products)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("recent")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  useEffect(() => {
    if (!user || user.role !== "seller") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "seller") {
    return null
  }

  const handleDeleteProduct = () => {
    if (productToDelete) {
      setProductList(productList.filter((product) => product.id !== productToDelete))
      setProductToDelete(null)
    }
  }

  // Filtrar produtos
  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    const matchesStatus = statusFilter === "all" || product.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Ordenar produtos
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
      case "stock_high":
        return b.stock - a.stock
      case "stock_low":
        return a.stock - b.stock
      case "sales_high":
        return b.sales - a.sales
      default:
        return 0
    }
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
      case "outofstock":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Sem Estoque</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Rascunho</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Meus Produtos</h1>
              <p className="text-muted-foreground">Gerencie seus produtos no marketplace</p>
            </div>
            <Link href="/vendedor/produtos/novo">
              <Button className="bg-terracota hover:bg-terracota-dark">
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </Link>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="cestaria">Cestaria</SelectItem>
                <SelectItem value="ceramica">Cerâmica</SelectItem>
                <SelectItem value="joias">Biojoias</SelectItem>
                <SelectItem value="tecidos">Tecidos e Trançados</SelectItem>
                <SelectItem value="madeira">Esculturas em Madeira</SelectItem>
                <SelectItem value="naturais">Produtos Naturais</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigos</SelectItem>
                <SelectItem value="price_high">Maior preço</SelectItem>
                <SelectItem value="price_low">Menor preço</SelectItem>
                <SelectItem value="name_asc">Nome (A-Z)</SelectItem>
                <SelectItem value="name_desc">Nome (Z-A)</SelectItem>
                <SelectItem value="stock_high">Maior estoque</SelectItem>
                <SelectItem value="stock_low">Menor estoque</SelectItem>
                <SelectItem value="sales_high">Mais vendidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
                Todos
              </TabsTrigger>
              <TabsTrigger value="active" onClick={() => setStatusFilter("active")}>
                Ativos
              </TabsTrigger>
              <TabsTrigger value="outofstock" onClick={() => setStatusFilter("outofstock")}>
                Sem Estoque
              </TabsTrigger>
              <TabsTrigger value="draft" onClick={() => setStatusFilter("draft")}>
                Rascunhos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              {sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-6">
                    <AlertCircle className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold">Nenhum produto encontrado</h2>
                  <p className="mt-2 max-w-md text-muted-foreground">
                    {searchQuery || categoryFilter !== "all"
                      ? "Nenhum produto corresponde aos filtros selecionados."
                      : "Você ainda não cadastrou nenhum produto."}
                  </p>
                  <Link href="/vendedor/produtos/novo" className="mt-6">
                    <Button className="bg-terracota hover:bg-terracota-dark">Adicionar Produto</Button>
                  </Link>
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Produto</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Categoria</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Preço</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Estoque</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Vendas</th>
                          <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedProducts.map((product) => (
                          <tr key={product.id} className="border-b">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm capitalize">{product.category}</td>
                            <td className="px-4 py-3 text-right">R$ {product.price.toFixed(2)}</td>
                            <td className="px-4 py-3 text-right">{product.stock}</td>
                            <td className="px-4 py-3 text-right">{product.sales}</td>
                            <td className="px-4 py-3 text-center">{getStatusBadge(product.status)}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                  <Link href={`/produtos/${product.id}`}>
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">Ver</span>
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="icon" asChild>
                                  <Link href={`/vendedor/produtos/${product.id}`}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                  </Link>
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => setProductToDelete(product.id)}>
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Excluir</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Confirmar exclusão</DialogTitle>
                                      <DialogDescription>
                                        Tem certeza que deseja excluir o produto "{product.name}"? Esta ação não pode
                                        ser desfeita.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setProductToDelete(null)}>
                                        Cancelar
                                      </Button>
                                      <Button variant="destructive" onClick={handleDeleteProduct}>
                                        Excluir
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>
            <TabsContent value="active" className="mt-6">
              {/* Conteúdo similar ao da aba "all", mas filtrado por status */}
            </TabsContent>
            <TabsContent value="outofstock" className="mt-6">
              {/* Conteúdo similar ao da aba "all", mas filtrado por status */}
            </TabsContent>
            <TabsContent value="draft" className="mt-6">
              {/* Conteúdo similar ao da aba "all", mas filtrado por status */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
