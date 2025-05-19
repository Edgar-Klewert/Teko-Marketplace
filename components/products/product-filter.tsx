"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductFilterProps {
  onFilter: (filters: {
    search: string
    category: string
    sort: string
    priceRange: number[]
  }) => void
}

export function ProductFilter({ onFilter }: ProductFilterProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "popular",
    priceRange: [0, 500],
  })

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="bg-muted/50 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-semibold mb-4">Filtrar Produtos</h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        <Select value={filters.category} onValueChange={(value) => handleChange("category", value)}>
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

        <Select value={filters.sort} onValueChange={(value) => handleChange("sort", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Mais populares</SelectItem>
            <SelectItem value="price_asc">Menor preço</SelectItem>
            <SelectItem value="price_desc">Maior preço</SelectItem>
            <SelectItem value="newest">Mais recentes</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Faixa de preço:</span>
            <span className="text-sm font-medium">
              R$ {filters.priceRange[0]} - R$ {filters.priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={[0, 500]}
            max={500}
            step={10}
            value={filters.priceRange}
            onValueChange={(value) => handleChange("priceRange", value)}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const resetFilters = {
              search: "",
              category: "all",
              sort: "popular",
              priceRange: [0, 500],
            }
            setFilters(resetFilters)
            onFilter(resetFilters)
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  )
}
