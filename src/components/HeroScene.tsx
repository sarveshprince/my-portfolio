import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Stars } from '@react-three/drei'
import { Suspense, useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

// ─── Theme-aware colors ──────────────────────────────────────────────────────
type SceneColors = {
  sphere: string
  sphereSecondary: string
  ring: string
  particles: string
  ambientIntensity: number
  pointIntensity: number
  fog: string
}

const DARK_COLORS: SceneColors = {
  sphere: '#3b82f6',        // blue-500
  sphereSecondary: '#8b5cf6', // violet-500
  ring: '#06b6d4',           // cyan-400
  particles: '#93c5fd',      // blue-300
  ambientIntensity: 0.15,
  pointIntensity: 2.5,
  fog: '#000000',
}

const LIGHT_COLORS: SceneColors = {
  sphere: '#2563eb',         // blue-600
  sphereSecondary: '#7c3aed', // violet-600
  ring: '#0891b2',            // cyan-600
  particles: '#1d4ed8',       // blue-700
  ambientIntensity: 0.6,
  pointIntensity: 1.2,
  fog: '#e2e8f0',
}

// ─── Floating Core Sphere ────────────────────────────────────────────────────
function CoreSphere({ colors }: { colors: SceneColors }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.15
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.position.y = Math.sin(time.current * 0.6) * 0.12
  })

  return (
    <Sphere ref={meshRef} args={[1.35, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color={colors.sphere}
        distort={0.38}
        speed={2.2}
        roughness={0.12}
        metalness={0.55}
        transparent
        opacity={0.92}
      />
    </Sphere>
  )
}

// ─── Wireframe outer shell ───────────────────────────────────────────────────
function WireShell({ colors }: { colors: SceneColors }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y -= delta * 0.12
    ref.current.rotation.x += delta * 0.07
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.85, 1]} />
      <meshBasicMaterial color={colors.ring} wireframe transparent opacity={0.18} />
    </mesh>
  )
}

// ─── Orbiting ring ───────────────────────────────────────────────────────────
function OrbitRing({ colors }: { colors: SceneColors }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.18
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0.3, 0]}>
      <torusGeometry args={[2.2, 0.018, 16, 120]} />
      <meshBasicMaterial color={colors.ring} transparent opacity={0.55} />
    </mesh>
  )
}

// ─── Floating particles ──────────────────────────────────────────────────────
function FloatingParticles({ colors }: { colors: SceneColors }) {
  const ref = useRef<THREE.Points>(null)

  const { positions } = useMemo(() => {
    const count = 280
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.6 + Math.random() * 2.2
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return { positions }
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={colors.particles}
        size={0.045}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Mouse parallax camera rig ───────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.8 - target.current.x) * 0.05
    target.current.y += (mouse.current.y * 0.4 - target.current.y) * 0.05
    camera.position.x += (target.current.x - camera.position.x) * 0.08
    camera.position.y += (target.current.y - camera.position.y) * 0.08
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Full scene ──────────────────────────────────────────────────────────────
function Scene({ colors, isDark }: { colors: SceneColors; isDark: boolean }) {
  return (
    <>
      <fog attach="fog" args={[colors.fog, 8, 22]} />
      <ambientLight intensity={colors.ambientIntensity} />
      <pointLight position={[4, 4, 4]} intensity={colors.pointIntensity} color={colors.sphere} />
      <pointLight position={[-4, -3, -2]} intensity={colors.pointIntensity * 0.5} color={colors.sphereSecondary} />

      <CoreSphere colors={colors} />
      <WireShell colors={colors} />
      <OrbitRing colors={colors} />
      <FloatingParticles colors={colors} />

      {/* Stars only in dark mode */}
      {isDark && (
        <Stars radius={18} depth={50} count={1200} factor={3} fade speed={0.6} />
      )}

      <CameraRig />
    </>
  )
}

// ─── WebGL detection fallback ────────────────────────────────────────────────
function webGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}


// ─── Public export ───────────────────────────────────────────────────────────
export function HeroScene({ isDark }: { isDark: boolean }) {
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS
  const [supported] = useState(() => webGLSupported())
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

  if (!supported) {
    // Static fallback: a gradient orb via CSS
    return (
      <div className="flex h-full items-center justify-center">
        <div
          className="h-48 w-48 rounded-full opacity-80"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${colors.sphere}, ${colors.sphereSecondary})`,
            boxShadow: `0 0 80px 20px ${colors.sphere}40`,
          }}
        />
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      dpr={isMobile ? 1 : [1, 2]}
      performance={{ min: 0.5 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene colors={colors} isDark={isDark} />
      </Suspense>
    </Canvas>
  )
}
