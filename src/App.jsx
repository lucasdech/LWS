import './App.scss'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress.toFixed(0)} %</Html>
}

function WelcomeModel({ mousePosition, ...props }) {
  const gltf = useGLTF('/models/Welcome.glb', true)
  const modelRef = useRef()
  
  useFrame(() => {
    if (modelRef.current) {
      // Rotation de base pour redresser le texte (face à nous)
      modelRef.current.rotation.x = Math.PI / 2
      modelRef.current.scale.set(1.2, 1.2, 1.2)
      // Rotation légère basée sur la position de la souris
      modelRef.current.rotation.y = -mousePosition.x * 0.05
      modelRef.current.rotation.z = -mousePosition.y * 0.05
    }
  })
  
  return <primitive ref={modelRef} object={gltf.scene} {...props} />
}

function MouseLight({ mousePosition }) {
  const lightRef = useRef()
  
  useFrame(() => {
    if (lightRef.current) {
      // Position de la lumière basée sur la souris
      lightRef.current.position.x = mousePosition.x * 5
      lightRef.current.position.y = mousePosition.y * 3
      lightRef.current.position.z = 2
    }
  })
  
  return (
    <pointLight 
      ref={lightRef}
      intensity={3} 
      color="#ffffff" 
      distance={20}
      decay={2}
    />
  )
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalise la position de la souris entre -1 et 1
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      style={{ background: '#0d0d0d' }}
    >
      <color attach="background" args={["#0d0d0d"]} />
      <ambientLight intensity={0} scale={1.2}/>
      <MouseLight mousePosition={mousePosition} />
      <React.Suspense fallback={<Loader />}>
        <WelcomeModel mousePosition={mousePosition} scale={1} position={[0, 0, 0]} />
      </React.Suspense>
    </Canvas>
  )
}

export default App
