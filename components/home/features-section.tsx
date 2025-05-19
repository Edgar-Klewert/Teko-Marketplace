import { ShoppingBag, Truck, Users } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <h2 className="teko-heading mb-4 text-3xl font-bold text-terracota md:text-4xl">
          Descubra o Artesanato do Norte do Brasil
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Produtos autênticos feitos por artesãos locais, valorizando a cultura e a bioeconomia da região amazônica.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-terracota/10 p-3">
            <ShoppingBag className="h-6 w-6 text-terracota" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Produtos Autênticos</h3>
          <p className="text-muted-foreground">
            Artesanato genuíno produzido por artesãos locais com técnicas tradicionais.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-terracota/10 p-3">
            <Users className="h-6 w-6 text-terracota" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Apoio aos Artesãos</h3>
          <p className="text-muted-foreground">
            Cada compra contribui diretamente para a economia local e para as famílias de artesãos.
          </p>
        </div>

        <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
          <div className="mb-4 rounded-full bg-terracota/10 p-3">
            <Truck className="h-6 w-6 text-terracota" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Entrega Segura</h3>
          <p className="text-muted-foreground">
            Embalagem especial para garantir que seu produto chegue em perfeitas condições.
          </p>
        </div>
      </div>
    </section>
  )
}
