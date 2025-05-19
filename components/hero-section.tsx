"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function MarketStall(props: any) {
  const group = useRef<THREE.Group>(null!)
  // Normalmente usaríamos um modelo real, mas para este exemplo vamos criar um modelo simples

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) * 0.1, 0.025)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base da barraca */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Estrutura da barraca */}
      <mesh position={[-1.8, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh position={[1.8, 1.5, 0]} castShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh position={[-1.8, 1.5, -1.4]} castShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh position={[1.8, 1.5, -1.4]} castShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Teto da barraca */}
      <mesh position={[0, 3.1, -0.7]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[4.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#7f4430" />
      </mesh>

      {/* Prateleiras */}
      <mesh position={[0, 1, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.1, 2]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>

      <mesh position={[0, 2, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>

      {/* Produtos na prateleira (simplificados) */}
      <mesh position={[-1, 1.2, -0.5]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#D7CCC8" />
      </mesh>

      <mesh position={[0, 1.2, -0.5]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="#FFCCBC" />
      </mesh>

      <mesh position={[1, 1.2, -0.5]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFAB91" />
      </mesh>

      <mesh position={[-1, 2.2, -0.5]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#BCAAA4" />
      </mesh>

      <mesh position={[0.5, 2.2, -0.5]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
        <meshStandardMaterial color="#FFCCBC" />
      </mesh>
    </group>
  )
}

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
            <Link href="/produtos">
              <Button className="bg-terracota hover:bg-terracota-dark text-white">Explorar Produtos</Button>
            </Link>
            <Link href="/lojas">
              <Button variant="outline" className="border-terracota text-terracota hover:bg-terracota/10">
                Conhecer Lojas
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] md:h-auto">
          <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <MarketStall position={[0, -1.5, 0]} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
            <Environment preset="sunset" />
          </Canvas>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
