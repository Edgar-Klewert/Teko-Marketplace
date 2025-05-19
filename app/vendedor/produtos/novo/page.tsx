"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NewProduct() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [] as File[],
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProduct({
        ...product,
        images: [...product.images, ...Array.from(e.target.files)],
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/vendedor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-8">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <div className="mb-8">
          <h1 className="teko-heading text-3xl font-bold text-terracota mb-2">Cadastrar Novo Produto</h1>
          <p className="text-muted-foreground">Preencha os detalhes do seu produto para publicá-lo na plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                placeholder="Ex: Cesto Trançado Amazônico"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva seu produto em detalhes..."
                rows={5}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  min="1"
                  placeholder="Quantidade disponível"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select onValueChange={(value) => setProduct({ ...product, category: value })} required>
                <SelectTrigger>
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
              <Label htmlFor="images">Imagens do Produto</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arraste e solte imagens aqui ou clique para selecionar
                </p>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("images")?.click()}>
                  Selecionar Imagens
                </Button>

                {product.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">
                      {product.images.length}{" "}
                      {product.images.length === 1 ? "imagem selecionada" : "imagens selecionadas"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-terracota hover:bg-terracota-dark" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar Produto"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
              Cancelar
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
