import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, ContactShadows, Html } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import * as THREE from 'three'

type Hotspot = {
  id: string
  label: string
  subtitle: string
  to: string
  position: [number, number, number]
  color: string
}

const hotspots: Hotspot[] = [
  {
    id: 'studio',
    label: 'Design Studio',
    subtitle: 'Courses & real projects',
    to: '/courses',
    position: [-3.2, 1.1, 1.4],
    color: '#a84b38',
  },
  {
    id: 'software',
    label: 'Software Lab',
    subtitle: 'Revit · Rhino · Viz',
    to: '/software',
    position: [3.1, 1.1, 1.2],
    color: '#9a7b4f',
  },
  {
    id: 'library',
    label: 'Library Stack',
    subtitle: 'Books & articles',
    to: '/books',
    position: [-2.4, 1.1, -2.6],
    color: '#3a5c4a',
  },
  {
    id: 'viz',
    label: 'Viz Pavilion',
    subtitle: 'Interactive visualisation',
    to: '/viz',
    position: [2.6, 1.1, -2.4],
    color: '#243d32',
  },
]

function Pavilion() {
  const wood = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c4b39a', roughness: 0.85 }),
    [],
  )
  const concrete = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d8d9d3', roughness: 0.92 }),
    [],
  )
  const leaf = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#243d32', roughness: 0.7 }),
    [],
  )
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#dfe8e2',
        transmission: 0.55,
        opacity: 0.85,
        transparent: true,
        roughness: 0.15,
        thickness: 0.4,
      }),
    [],
  )

  return (
    <group>
      {/* Floor slab */}
      <mesh position={[0, 0.05, 0]} receiveShadow material={concrete}>
        <boxGeometry args={[14, 0.12, 10]} />
      </mesh>

      {/* Central hall */}
      <mesh position={[0, 1.3, 0]} castShadow material={concrete}>
        <boxGeometry args={[4.2, 2.4, 3.6]} />
      </mesh>
      <mesh position={[0, 1.35, 1.82]} material={glass}>
        <boxGeometry args={[3.4, 1.8, 0.08]} />
      </mesh>

      {/* Flat roof plane */}
      <mesh position={[0, 2.65, 0]} castShadow material={leaf}>
        <boxGeometry args={[5.2, 0.16, 4.4]} />
      </mesh>

      {/* Side studio wings */}
      <mesh position={[-3.4, 0.95, 1.5]} castShadow material={wood}>
        <boxGeometry args={[2.6, 1.7, 2.4]} />
      </mesh>
      <mesh position={[3.4, 0.95, 1.5]} castShadow material={wood}>
        <boxGeometry args={[2.6, 1.7, 2.4]} />
      </mesh>

      {/* Rear wings */}
      <mesh position={[-2.6, 0.95, -2.6]} castShadow material={concrete}>
        <boxGeometry args={[2.8, 1.7, 2.2]} />
      </mesh>
      <mesh position={[2.6, 0.95, -2.6]} castShadow material={concrete}>
        <boxGeometry args={[2.8, 1.7, 2.2]} />
      </mesh>

      {/* Courtyard column grove */}
      {[-1.2, 0, 1.2].map((x) => (
        <mesh key={x} position={[x, 1.2, -0.2]} castShadow material={wood}>
          <cylinderGeometry args={[0.09, 0.11, 2.2, 12]} />
        </mesh>
      ))}

      {/* Entry canopy */}
      <mesh position={[0, 2.2, 2.6]} castShadow material={leaf}>
        <boxGeometry args={[3.2, 0.1, 1.4]} />
      </mesh>
      <mesh position={[-1.3, 1.1, 2.9]} castShadow material={wood}>
        <boxGeometry args={[0.12, 2.1, 0.12]} />
      </mesh>
      <mesh position={[1.3, 1.1, 2.9]} castShadow material={wood}>
        <boxGeometry args={[0.12, 2.1, 0.12]} />
      </mesh>
    </group>
  )
}

function Landscape() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[28, 64]} />
        <meshStandardMaterial color="#b7c0a8" roughness={1} />
      </mesh>
      {[
        [-7, -4],
        [8, -5],
        [-9, 3],
        [9, 4],
        [-6, 6],
        [6, -7],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 2.4, 8]} />
            <meshStandardMaterial color="#5a4634" roughness={1} />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshStandardMaterial color={i % 2 ? '#3a5c4a' : '#2f4a3b'} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function HotspotMarker({
  hotspot,
  active,
  onHover,
}: {
  hotspot: Hotspot
  active: boolean
  onHover: (id: string | null) => void
}) {
  const navigate = useNavigate()
  return (
    <group position={hotspot.position}>
      <mesh
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(hotspot.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onHover(null)
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigate(hotspot.to)
        }}
        scale={active ? 1.15 : 1}
      >
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color={hotspot.color}
          emissive={hotspot.color}
          emissiveIntensity={active ? 0.35 : 0.12}
          roughness={0.45}
        />
      </mesh>
      <Html distanceFactor={10} position={[0, 0.85, 0]} center>
        <div className={`hotspot-label${active ? ' on' : ''}`}>
          <strong>{hotspot.label}</strong>
          <span>{hotspot.subtitle}</span>
        </div>
      </Html>
    </group>
  )
}

export function ArchivaScene() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="scene-shell">
      <Canvas
        shadows
        camera={{ position: [9, 6.5, 10], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#e4e7df']} />
        <fog attach="fog" args={['#e4e7df', 18, 42]} />
        <ambientLight intensity={0.55} />
        <directionalLight
          castShadow
          position={[8, 14, 6]}
          intensity={1.35}
          shadow-mapSize={[1024, 1024]}
        />
        <hemisphereLight args={['#f2f4ef', '#8a917f', 0.35]} />

        <Landscape />
        <Pavilion />
        {hotspots.map((h) => (
          <HotspotMarker
            key={h.id}
            hotspot={h}
            active={active === h.id}
            onHover={setActive}
          />
        ))}

        <ContactShadows position={[0, 0.02, 0]} opacity={0.4} scale={24} blur={2.5} />
        <Text
          position={[0, 3.3, 0]}
          fontSize={0.42}
          color="#243d32"
          anchorX="center"
          anchorY="middle"
        >
          ARCHIVA
        </Text>
        <OrbitControls
          makeDefault
          enablePan={false}
          minPolarAngle={0.35}
          maxPolarAngle={1.35}
          minDistance={7}
          maxDistance={18}
          target={[0, 1, 0]}
        />
      </Canvas>
      <div className="scene-hint">
        Drag to orbit · Scroll to zoom · Click a glowing cube to enter that lab
      </div>
    </div>
  )
}
