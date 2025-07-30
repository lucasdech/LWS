import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Composant pour charger et afficher le modèle deskFinal
const DeskModel = () => {
  const { scene } = useGLTF('/models/IntroScene.glb')
  const modelRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (modelRef.current) {
      // Assurez-vous que le modèle est bien orienté face à la caméra
      // modelRef.current.rotation.y = 0
      modelRef.current.rotation.y = Math.PI
      modelRef.current.position.y = -4

      modelRef.current.position.x = -.5
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      position={[0, 0, 0]}
      scale={1}
    />
  )
}

// Composant principal de la scène
export const IntroScene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{background: "#0d0d0d"}}
      >


        {/* Modèle deskFinal */}
        <DeskModel />
        
        {/* Contrôles de caméra */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
        
        {/* Environnement */}
        <Environment preset="apartment" />
      </Canvas>
    </div>
  )
}
