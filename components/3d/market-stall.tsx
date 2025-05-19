"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function MarketStall(props: any) {
  const group = useRef<THREE.Group>(null!)

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
