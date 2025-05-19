import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-terracota text-white py-16">
      <div className="container text-center">
        <h2 className="font-marseille text-3xl md:text-4xl font-bold mb-4">Faça Parte da Comunidade Teko</h2>
        <p className="mx-auto max-w-2xl mb-8 text-white/90">
          Junte-se a nós para valorizar o artesanato amazônico, apoiar artesãos locais e promover práticas sustentáveis
          que preservam a biodiversidade da região.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login?role=customer">
            <Button size="lg" className="bg-white text-terracota hover:bg-white/90">
              Cadastre-se como Cliente
            </Button>
          </Link>
          <Link href="/login?role=seller">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Cadastre-se como Vendedor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
