"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { MarketStall } from "./market-stall"
import { CustomModel } from "./custom-model"

interface HeroSceneProps {
  useCustomModel?: boolean
}

export function HeroScene({ useCustomModel = false }: HeroSceneProps) {
  return (
    <div className="relative h-[400px] md:h-auto">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {useCustomModel ? <CustomModel position={[0, -1.5, 0]} /> : <MarketStall position={[0, -1.5, 0]} />}

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
