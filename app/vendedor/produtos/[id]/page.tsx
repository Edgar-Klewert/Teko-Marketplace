"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Save, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

// Dados simulados de produtos
const products = [
  {
    id: "1",
    name: "Cesto Trançado",
    description: "Cesto artesanal feito com fibras naturais da Amazônia",
    longDescription:
      "Este cesto artesanal é confeccionado por artesãos locais da região amazônica, utilizando fibras naturais extraídas de forma sustentável. Cada peça é única e carrega consigo a história e tradição das comunidades ribeirinhas.",
    price: 89.9,
    images: [
      "/placeholder.svg?height=300&width=300&text=Cesto+1",
      "/placeholder.svg?height=300&width=300&text=Cesto+2",
    ],
    category: "cestaria",
    stock: 15,
    status: "active",
    material: "Fibras naturais de tucumã e arumã",
    dimensions: "25cm x 25cm x 15cm",
    weight: "300g",
    tags: ["Cestaria", "Decoração", "Sustentável"],
    featured: true,
  },
]

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const productId = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<(typeof products)[0] | null>(null)

  useEffect(() => {
    if (!user || user.role !== "seller") {
      router.push("/login")
      return
    }

    // Buscar produto pelo ID
    const foundProduct = products.find((p) => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      router.push("/vendedor/produtos")
    }
  }, [user, router, productId])

  if (!user || user.role !== "seller" || !product) {
    return null
  }

  const handleChange = (field: string, value: any) => {
    setProduct((prev) => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/vendedor/produtos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Simulação de upload de imagem
      const newImages = [...product.images]
      Array.from(e.target.files).forEach((_, index) => {
        newImages.push(`/placeholder.svg?height=300&width=300&text=Nova+Imagem+${index + 1}`)
      })
      handleChange("images", newImages)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...product.images]
    newImages.splice(index, 1)
    handleChange("images", newImages)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6">
            <Link href="/vendedor/produtos" className="inline-flex items-center text-sm hover:text-terracota">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para produtos
            </Link>
            <h1 className="mt-2 text-3xl font-bold">Editar Produto</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Informações Básicas</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        value={product.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição Curta</Label>
                      <Textarea
                        id="description"
                        value={product.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        rows={2}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longDescription">Descrição Completa</Label>
                      <Textarea
                        id="longDescription"
                        value={product.longDescription}
                        onChange={(e) => handleChange("longDescription", e.target.value)}
                        rows={5}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="price">Preço (R$)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={product.price}
                          onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock">Estoque</Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) => handleChange("stock", Number.parseInt(e.target.value))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select value={product.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cestaria">Cestaria</SelectItem>
                          <SelectItem value="ceramica">Cerâmica</SelectItem>
                          <SelectItem value="joias">Biojoias</SelectItem>
                          <SelectItem value="tecidos">Tecidos e Trançados</SelectItem>
                          <SelectItem value="madeira">Esculturas em Madeira</SelectItem>
                          <SelectItem value="naturais">Produtos Naturais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={product.status} onValueChange={(value) => handleChange("status", value)}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="outofstock">Sem Estoque</SelectItem>
                          <SelectItem value="draft">Rascunho</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={product.featured}
                        onCheckedChange={(checked) => handleChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Destacar na página inicial</Label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Especificações</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="material">Material</Label>
                      <Input
                        id="material"
                        value={product.material}
                        onChange={(e) => handleChange("material", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="dimensions">Dimensões</Label>
                        <Input
                          id="dimensions"
                          value={product.dimensions}
                          onChange={(e) => handleChange("dimensions", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Peso</Label>
                        <Input
                          id="weight"
                          value={product.weight}
                          onChange={(e) => handleChange("weight", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                      <Input
                        id="tags"
                        value={product.tags.join(", ")}
                        onChange={(e) => handleChange("tags", e.target.value.split(", "))}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-6">
                  <h2 className="mb-4 text-xl font-semibold">Imagens</h2>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {product.images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md border overflow-hidden group">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${product.name} ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="relative aspect-square rounded-md border border-dashed flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">Adicionar imagem</p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleImageUpload}
                          multiple
                        />
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Adicione até 8 imagens. A primeira imagem será usada como capa do produto.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-6 space-y-6">
                  <div className="rounded-lg border p-6">
                    <h2 className="mb-4 text-xl font-semibold">Resumo</h2>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono text-sm">{product.id}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="capitalize">{product.status}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Preço:</span>
                        <span>R$ {product.price.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estoque:</span>
                        <span>{product.stock} unidades</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button type="submit" className="bg-terracota hover:bg-terracota-dark" disabled={isLoading}>
                      {isLoading ? (
                        "Salvando..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/vendedor/produtos")}
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>

                    <Link href={`/produtos/${product.id}`} target="_blank">
                      <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                        Visualizar Produto
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
