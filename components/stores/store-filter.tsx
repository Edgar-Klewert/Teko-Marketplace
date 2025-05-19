"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StoreFilterProps {
  onFilter: (filters: {
    search: string
    category: string
    sort: string
  }) => void
}

export function StoreFilter({ onFilter }: StoreFilterProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "popular",
  })

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <div className="bg-muted/50 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-semibold mb-4">Filtrar Lojas</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar lojas..."
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
            <SelectItem value="rating">Melhor avaliação</SelectItem>
            <SelectItem value="newest">Mais recentes</SelectItem>
            <SelectItem value="oldest">Mais antigas</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
