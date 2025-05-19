"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function CustomModel(props: any) {
  const group = useRef<THREE.Group>(null!)
  const [modelError, setModelError] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 2) * 0.1, 0.025)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Simplified placeholder model that won't cause 404 errors */}
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <meshStandardMaterial color="#7f4430" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}
