"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
        <div className="flex flex-col justify-center p-8 md:p-12 bg-terracota/10">
          <h1 className="font-marseille text-4xl md:text-5xl lg:text-6xl font-bold text-terracota mb-6">
            Descubra o Artesanato Amazônico
          </h1>
          <p className="text-lg mb-8 max-w-md">
            Conectamos artesãos do norte do Brasil com pessoas que valorizam produtos autênticos, sustentáveis e com
            história.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login">
              <Button className="bg-terracota hover:bg-terracota-dark text-white">Começar Agora</Button>
            </Link>
            <Link href="/sobre">
              <Button variant="outline" className="border-terracota text-terracota hover:bg-terracota/10">
                Saiba Mais
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] md:h-auto flex items-center justify-center bg-terracota/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/logo.png" alt="Teko" width={300} height={300} className="max-w-[80%] h-auto object-contain" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
