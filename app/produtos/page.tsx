"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductFilter } from "@/components/products/product-filter"
import { ProductGrid } from "@/components/products/product-grid"
import { useAuth } from "@/contexts/auth-context"

export default function ProductsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    sort: "popular",
    priceRange: [0, 500],
  })

  // Redirecionar para login se não estiver autenticado
  if (!user) {
    router.push("/login")
    return null
  }

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
            <h1 className="teko-heading text-4xl font-bold text-terracota mb-4">Produtos Artesanais</h1>
            <p className="text-lg max-w-2xl">
              Explore nossa coleção de produtos artesanais autênticos do norte do Brasil, feitos com técnicas
              tradicionais e materiais sustentáveis.
            </p>
          </div>
        </div>

        <div className="container py-12">
          <ProductFilter onFilter={handleFilter} />
          <ProductGrid title="Todos os Produtos" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
