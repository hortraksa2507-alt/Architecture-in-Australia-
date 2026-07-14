import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Html, OrbitControls, RoundedBox } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

type Room = {
  id: string
  label: string
  blurb: string
  to: string
  position: [number, number, number]
  cam: [number, number, number]
  color: string
}

const rooms: Room[] = [
  {
    id: 'studio',
    label: 'Design Studio',
    blurb: 'Courses, critiques, real project briefs',
    to: '/courses',
    position: [-4.2, 1.15, 2.2],
    cam: [2.5, 4.2, 8.5],
    color: '#a84b38',
  },
  {
    id: 'software',
    label: 'Software Lab',
    blurb: 'Simulators, curricula, trainers',
    to: '/software',
    position: [4.2, 1.15, 2.2],
    cam: [-2.2, 4.4, 8.8],
    color: '#9a7b4f',
  },
  {
    id: 'books',
    label: 'Book Stack',
    blurb: 'Chapter field guides',
    to: '/books',
    position: [-3.6, 1.15, -3.3],
    cam: [3.8, 4.6, -1.5],
    color: '#3a5c4a',
  },
  {
    id: 'viz',
    label: 'Viz Pavilion',
    blurb: 'Sun, section, typology lab',
    to: '/viz',
    position: [3.6, 1.15, -3.3],
    cam: [-3.5, 4.8, -1.2],
    color: '#243d32',
  },
  {
    id: 'projects',
    label: 'Project Court',
    blurb: 'Real-world studio sprints',
    to: '/projects',
    position: [0, 1.15, 4.4],
    cam: [0, 5.2, 11],
    color: '#6b4f3a',
  },
]

function CameraRig({ targetCam, lookAt }: { targetCam: [number, number, number]; lookAt: [number, number, number] }) {
  const { camera } = useThree()
  const controls = useThree((s) => s.controls) as unknown as { target: THREE.Vector3; update: () => void } | null
  useFrame((_, dt) => {
    camera.position.lerp(new THREE.Vector3(...targetCam), Math.min(1, dt * 2.2))
    if (controls?.target) {
      controls.target.lerp(new THREE.Vector3(...lookAt), Math.min(1, dt * 2.2))
      controls.update()
    }
  })
  return null
}

function FloatingMarker({
  room,
  active,
  onSelect,
}: {
  room: Room
  active: boolean
  onSelect: (id: string) => void
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = room.position[1] + Math.sin(clock.elapsedTime * 2 + room.position[0]) * 0.12
    ref.current.rotation.y += 0.01
  })

  return (
    <group position={[room.position[0], 0, room.position[2]]}>
      <mesh
        ref={ref}
        castShadow
        position={[0, room.position[1], 0]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(room.id)
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
        scale={active ? 1.2 : 1}
      >
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color={room.color}
          emissive={room.color}
          emissiveIntensity={active ? 0.55 : 0.2}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
      <Html center position={[0, 2.05, 0]} distanceFactor={9}>
        <div className={`hotspot-label${active ? ' on' : ''}`}>
          <strong>{room.label}</strong>
          <span>{room.blurb}</span>
        </div>
      </Html>
    </group>
  )
}

function Building() {
  const concrete = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d6d7d0', roughness: 0.92 }), [])
  const timber = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b9a585', roughness: 0.78 }), [])
  const leaf = useMemo(() => new THREE.MeshStandardMaterial({ color: '#243d32', roughness: 0.65 }), [])
  const oxide = useMemo(() => new THREE.MeshStandardMaterial({ color: '#a84b38', roughness: 0.55 }), [])
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#d9e5dd',
        transmission: 0.65,
        transparent: true,
        opacity: 0.9,
        roughness: 0.12,
        thickness: 0.5,
      }),
    [],
  )

  return (
    <group>
      <RoundedBox args={[16, 0.18, 12]} position={[0, 0.05, 0]} radius={0.05} receiveShadow castShadow material={concrete} />

      {/* Central atrium */}
      <RoundedBox args={[5.2, 3.2, 4.2]} position={[0, 1.7, 0]} radius={0.04} castShadow material={concrete} />
      <mesh position={[0, 1.7, 2.12]} material={glass}>
        <boxGeometry args={[4.2, 2.4, 0.1]} />
      </mesh>
      <RoundedBox args={[6.4, 0.18, 5.2]} position={[0, 3.45, 0]} radius={0.02} castShadow material={leaf} />

      {/* Wings */}
      <RoundedBox args={[3.4, 2.2, 3.2]} position={[-4.4, 1.2, 2.2]} radius={0.04} castShadow material={timber} />
      <RoundedBox args={[3.4, 2.2, 3.2]} position={[4.4, 1.2, 2.2]} radius={0.04} castShadow material={timber} />
      <RoundedBox args={[3.2, 2.2, 3]} position={[-3.8, 1.2, -3.2]} radius={0.04} castShadow material={concrete} />
      <RoundedBox args={[3.2, 2.2, 3]} position={[3.8, 1.2, -3.2]} radius={0.04} castShadow material={concrete} />

      {/* Entry court canopy */}
      <RoundedBox args={[4.4, 0.12, 2.2]} position={[0, 2.7, 4.4]} radius={0.02} castShadow material={oxide} />
      {[-1.6, 1.6].map((x) => (
        <mesh key={x} position={[x, 1.35, 5.1]} castShadow material={timber}>
          <cylinderGeometry args={[0.08, 0.1, 2.55, 12]} />
        </mesh>
      ))}

      {/* Atrium columns */}
      {[-1.4, 1.4].map((x) =>
        [-0.8, 0.8].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.6, z]} castShadow material={timber}>
            <cylinderGeometry args={[0.1, 0.12, 3.0, 16]} />
          </mesh>
        )),
      )}

      {/* Courtyard water plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, -0.15]} material={glass}>
        <circleGeometry args={[1.1, 32]} />
      </mesh>
    </group>
  )
}

function Landscape() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[40, 80]} />
        <meshStandardMaterial color="#aeb895" roughness={1} />
      </mesh>
      {[
        [-10, -6],
        [11, -7],
        [-12, 5],
        [12, 6],
        [-8, 9],
        [9, -10],
        [-14, -1],
        [14, 0],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.32, 2.8, 8]} />
            <meshStandardMaterial color="#5a4634" />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow>
            <sphereGeometry args={[1.35 + (i % 3) * 0.1, 18, 18]} />
            <meshStandardMaterial color={i % 2 ? '#355845' : '#2c4738'} roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export function ArchivaScene() {
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState<string>('projects')
  const active = rooms.find((r) => r.id === activeId) ?? rooms[0]
  const [autoTour, setAutoTour] = useState(false)

  useEffect(() => {
    if (!autoTour) return
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % rooms.length
      setActiveId(rooms[i].id)
    }, 3200)
    return () => window.clearInterval(id)
  }, [autoTour])

  return (
    <div className="scene-shell upgraded">
      <Canvas shadows camera={{ position: active.cam, fov: 40 }} dpr={[1, 1.7]}>
        <color attach="background" args={['#dfe5d7']} />
        <fog attach="fog" args={['#dfe5d7', 20, 48]} />
        <ambientLight intensity={0.45} />
        <hemisphereLight args={['#f5f7f1', '#7f8774', 0.45]} />
        <directionalLight castShadow position={[10, 16, 8]} intensity={1.4} shadow-mapSize={[2048, 2048]} />
        <Landscape />
        <Building />
        {rooms.map((room) => (
          <FloatingMarker key={room.id} room={room} active={activeId === room.id} onSelect={setActiveId} />
        ))}
        <ContactShadows position={[0, 0.03, 0]} opacity={0.45} scale={28} blur={2.6} />
        <Environment preset="park" />
        <CameraRig targetCam={active.cam} lookAt={[active.position[0] * 0.35, 1.2, active.position[2] * 0.25]} />
        <OrbitControls makeDefault enablePan={false} minDistance={7} maxDistance={20} maxPolarAngle={1.35} />
      </Canvas>

      <div className="scene-hud">
        <div className="scene-hud-card">
          <span className="eyebrow">Now focusing</span>
          <h2>{active.label}</h2>
          <p>{active.blurb}</p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate(active.to)}>
              Enter {active.label}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => setAutoTour((v) => !v)}>
              {autoTour ? 'Stop tour' : 'Auto tour'}
            </button>
          </div>
          <div className="scene-room-switch">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                className={r.id === activeId ? 'active' : undefined}
                onClick={() => setActiveId(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div className="scene-hint">Drag to orbit · Click crystals · Use HUD to enter rooms</div>
      </div>
    </div>
  )
}
