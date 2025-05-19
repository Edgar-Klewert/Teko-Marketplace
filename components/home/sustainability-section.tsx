import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SustainabilitySection() {
  return (
    <section className="bg-terracota/10 py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="teko-heading mb-4 text-3xl font-bold text-terracota md:text-4xl">
              Bioeconomia e Sustentabilidade
            </h2>
            <p className="mb-6 text-muted-foreground">
              O Teko valoriza práticas sustentáveis e a bioeconomia da região amazônica. Nossos produtos são feitos com
              materiais naturais e técnicas que respeitam o meio ambiente e as tradições locais.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-terracota" />
                <span>Materiais extraídos de forma sustentável</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-terracota" />
                <span>Técnicas tradicionais que preservam a floresta</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-terracota" />
                <span>Embalagens biodegradáveis e de baixo impacto</span>
              </li>
            </ul>
            <Link href="/sobre">
              <Button className="bg-terracota hover:bg-terracota-dark">Saiba mais</Button>
            </Link>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Artesão trabalhando com materiais sustentáveis"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
