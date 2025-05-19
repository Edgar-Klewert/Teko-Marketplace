"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function StoreModelSection() {
  const [currentView, setCurrentView] = useState(0)
  const views = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VISTA%20STAND-8t3fxvaLkIUgi3L74PUCF6NFYZueLA.png",
      alt: "Vista frontal do stand Teko",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VISTA%202%20STAND-8spzdozMJOOpLYNucVtF1Jpd1ROs6y.png",
      alt: "Vista lateral do stand Teko",
    },
  ]

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % views.length)
  }

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + views.length) % views.length)
  }

  return (
    <section className="py-16 bg-terracota/10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="teko-heading text-3xl font-bold text-terracota md:text-4xl">Modelo de Loja Biosustentável</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Nossos pontos de venda são projetados com materiais sustentáveis e baixo impacto ambiental, respeitando a
            biodiversidade amazônica.
          </p>
        </div>

        <div className="h-[500px] rounded-lg overflow-hidden border border-terracota/20 bg-white/50 relative">
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Using direct image URLs */}
            <img
              src={views[currentView].src || "/placeholder.svg"}
              alt={views[currentView].alt}
              className="max-h-full max-w-full object-contain"
              style={{ display: "block" }}
            />

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
              onClick={prevView}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Visualização anterior</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
              onClick={nextView}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Próxima visualização</span>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-terracota">Materiais Sustentáveis</h3>
            <p className="text-muted-foreground">
              Construídas com madeira certificada e materiais reciclados da região amazônica.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-terracota">Energia Renovável</h3>
            <p className="text-muted-foreground">
              Painéis solares fornecem energia limpa para iluminação e operações básicas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-terracota">Baixo Impacto</h3>
            <p className="text-muted-foreground">
              Design que minimiza a pegada ecológica e se integra harmoniosamente ao ambiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
