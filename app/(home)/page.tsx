import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { SustainabilitySection } from "@/components/home/sustainability-section"
import { StoreModelSection } from "@/components/home/store-model-section"
import { FeaturedProductsPreview } from "@/components/home/featured-products-preview"
import { FeaturedStoresPreview } from "@/components/home/featured-stores-preview"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />

        {/* Prévia de produtos com CTA para login */}
        <section className="container py-16">
          <div className="mb-8 text-center">
            <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">
              Produtos Artesanais em Destaque
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Conheça alguns dos produtos artesanais disponíveis em nossa plataforma. Faça login para ver todos os
              produtos e realizar compras.
            </p>
          </div>

          <FeaturedProductsPreview />

          <div className="mt-10 text-center">
            <Link href="/login">
              <Button className="bg-terracota hover:bg-terracota-dark">
                Entrar para Ver Mais Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <SustainabilitySection />

        {/* Modelo de loja biosustentável */}
        <StoreModelSection />

        {/* Prévia de lojas com CTA para login */}
        <section className="container py-16">
          <div className="mb-8 text-center">
            <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">Lojas de Artesãos</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Conheça algumas das lojas de artesãos do norte do Brasil. Faça login para explorar todas as lojas e seus
              produtos.
            </p>
          </div>

          <FeaturedStoresPreview />

          <div className="mt-10 text-center">
            <Link href="/login">
              <Button className="bg-terracota hover:bg-terracota-dark">
                Entrar para Explorar Todas as Lojas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
