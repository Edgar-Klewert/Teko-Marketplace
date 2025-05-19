import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TeamCarousel } from "@/components/about/team-carousel"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-terracota/10 py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="teko-heading text-4xl font-bold text-terracota mb-6">Sobre o Teko</h1>
                <p className="text-lg mb-6">
                  O Teko é um marketplace dedicado a conectar artesãos do norte do Brasil com pessoas que valorizam
                  produtos autênticos, sustentáveis e com história.
                </p>
                <p className="mb-6">
                  Nossa missão é valorizar o artesanato amazônico, promover a bioeconomia e contribuir para o
                  desenvolvimento sustentável das comunidades locais.
                </p>
                <Link href="/login">
                  <Button className="bg-terracota hover:bg-terracota-dark">Junte-se a Nós</Button>
                </Link>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Artesãos trabalhando"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="teko-heading text-3xl font-bold text-terracota text-center mb-12">Nossa História</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-terracota/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-terracota font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Origens</h3>
                <p className="text-muted-foreground">
                  O Teko nasceu da paixão por preservar e valorizar as técnicas artesanais tradicionais da região
                  amazônica, criando um canal direto entre artesãos e consumidores.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-terracota/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-terracota font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Impacto</h3>
                <p className="text-muted-foreground">
                  Hoje, o Teko não é apenas um marketplace, mas um movimento que impacta positivamente a vida de
                  centenas de famílias e contribui para a preservação cultural da Amazônia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-terracota/5 py-16">
          <div className="container">
            <h2 className="teko-heading text-3xl font-bold text-terracota text-center mb-12">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sustentabilidade</h3>
                <p className="mb-6">
                  Promovemos práticas sustentáveis em toda nossa cadeia, desde a extração de matérias-primas até a
                  embalagem e transporte dos produtos.
                </p>
                <h3 className="text-xl font-semibold mb-4">Valorização Cultural</h3>
                <p>
                  Preservamos e valorizamos as técnicas tradicionais e o conhecimento ancestral dos povos da Amazônia,
                  contribuindo para a manutenção de sua identidade cultural.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Comércio Justo</h3>
                <p className="mb-6">
                  Garantimos que os artesãos recebam uma remuneração justa por seu trabalho, eliminando intermediários e
                  criando relações comerciais transparentes.
                </p>
                <h3 className="text-xl font-semibold mb-4">Bioeconomia</h3>
                <p>
                  Incentivamos o uso sustentável da biodiversidade amazônica, promovendo a bioeconomia como alternativa
                  ao desmatamento e à exploração predatória dos recursos naturais.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="teko-heading text-3xl font-bold text-terracota text-center mb-12">Nossa Equipe</h2>
            <TeamCarousel />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
