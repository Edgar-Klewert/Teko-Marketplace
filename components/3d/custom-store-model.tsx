"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CustomStoreModel(props: any) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 5) * 0.1 + Math.PI * 0.25,
      0.025,
    )
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base da estrutura */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Estrutura básica */}
      <mesh castShadow position={[-1.4, 1.5, -1.4]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh castShadow position={[1.4, 1.5, -1.4]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh castShadow position={[-1.4, 1.5, 1.4]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      <mesh castShadow position={[1.4, 1.5, 1.4]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Teto */}
      <mesh castShadow position={[0, 3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.5, 0.1, 3.5]} />
        <meshStandardMaterial color="#7f4430" />
      </mesh>

      {/* Painéis solares */}
      <mesh castShadow position={[0, 3.1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 0.05, 2]} />
        <meshStandardMaterial color="#1E88E5" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Elementos decorativos */}
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 16]} />
        <meshStandardMaterial color="#A1887F" />
      </mesh>

      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.8, 16]} />
        <meshStandardMaterial color="#BCAAA4" />
      </mesh>
    </group>
  )
}
