"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dados simplificados dos membros da equipe
const teamMembers = [
  {
    id: 1,
    name: "Membro 1",
    role: "Cargo do Membro 1",
    image: "/placeholder.svg?height=150&width=150&text=Membro+1",
  },
  {
    id: 2,
    name: "Membro 2",
    role: "Cargo do Membro 2",
    image: "/placeholder.svg?height=150&width=150&text=Membro+2",
  },
  {
    id: 3,
    name: "Membro 3",
    role: "Cargo do Membro 3",
    image: "/placeholder.svg?height=150&width=150&text=Membro+3",
  },
  {
    id: 4,
    name: "Membro 4",
    role: "Cargo do Membro 4",
    image: "/placeholder.svg?height=150&width=150&text=Membro+4",
  },
  {
    id: 5,
    name: "Membro 5",
    role: "Cargo do Membro 5",
    image: "/placeholder.svg?height=150&width=150&text=Membro+5",
  },
  {
    id: 6,
    name: "Membro 6",
    role: "Cargo do Membro 6",
    image: "/placeholder.svg?height=150&width=150&text=Membro+6",
  },
  {
    id: 7,
    name: "Membro 7",
    role: "Cargo do Membro 7",
    image: "/placeholder.svg?height=150&width=150&text=Membro+7",
  },
  {
    id: 8,
    name: "Membro 8",
    role: "Cargo do Membro 8",
    image: "/placeholder.svg?height=150&width=150&text=Membro+8",
  },
]

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState(4)

  // Ajusta o número de itens visíveis com base no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 768) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalMembers = teamMembers.length

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (totalMembers - visibleItems + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (totalMembers - visibleItems + 1)) % (totalMembers - visibleItems + 1))
  }

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`
    }
  }, [currentIndex, visibleItems])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ width: `${(teamMembers.length / visibleItems) * 100}%` }}
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="px-3" style={{ width: `${(100 / teamMembers.length) * visibleItems}%` }}>
              <div className="text-center bg-white p-6 rounded-lg shadow-sm h-full flex flex-col items-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-terracota/20">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold text-lg text-terracota">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Anterior</span>
        </Button>
        <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
    </div>
  )
}
