"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StoreFilter } from "@/components/stores/store-filter"
import { StoreGrid } from "@/components/stores/store-grid"

export default function StoresPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "popular",
  })

  const handleFilter = (newFilters: typeof filters) => {
    setFilters(newFilters)
    // Aqui você implementaria a lógica real de filtragem
    // Por enquanto, apenas atualizamos o estado
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-terracota/10 py-12">
          <div className="container">
            <h1 className="teko-heading text-4xl font-bold text-terracota mb-4">Lojas de Artesanato</h1>
            <p className="text-lg max-w-2xl">
              Explore as lojas de artesãos do norte do Brasil e descubra produtos únicos feitos com técnicas
              tradicionais e materiais sustentáveis.
            </p>
          </div>
        </div>

        <div className="container py-12">
          <StoreFilter onFilter={handleFilter} />
          <StoreGrid title="Todas as Lojas" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
