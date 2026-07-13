import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import { useMemo, useState } from 'react'
import * as THREE from 'three'

function MassingHouse({
  cut,
  eaves,
}: {
  cut: number
  eaves: number
}) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#d7d2c6', roughness: 0.85 }),
    [],
  )
  const roof = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#243d32', roughness: 0.7 }),
    [],
  )
  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9bb0a4',
        transparent: true,
        opacity: 0.55,
        roughness: 0.2,
      }),
    [],
  )

  const clippingPlanes = useMemo(() => {
    const plane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), cut)
    return [plane]
  }, [cut])

  // Apply clipping to materials
  mat.clippingPlanes = clippingPlanes
  mat.clipShadows = true
  roof.clippingPlanes = clippingPlanes
  roof.clipShadows = true
  glass.clippingPlanes = clippingPlanes
  glass.clipShadows = true

  return (
    <group>
      <mesh position={[0, 0.9, 0]} castShadow material={mat}>
        <boxGeometry args={[3.2, 1.8, 2.4]} />
      </mesh>
      <mesh position={[0.2, 0.85, 1.22]} material={glass}>
        <boxGeometry args={[1.4, 1.1, 0.06]} />
      </mesh>
      <mesh position={[0, 2.05, 0]} castShadow material={roof} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.2 + eaves * 2, 0.16, 2.4 + eaves * 2]} />
      </mesh>
      <mesh position={[1.4, 0.55, 0.2]} castShadow material={mat}>
        <boxGeometry args={[1.4, 1.1, 1.6]} />
      </mesh>
    </group>
  )
}

function Sun({ altitude, azimuth }: { altitude: number; azimuth: number }) {
  const position = useMemo(() => {
    const alt = (altitude * Math.PI) / 180
    const az = (azimuth * Math.PI) / 180
    const r = 10
    const y = Math.sin(alt) * r
    const x = Math.cos(alt) * Math.sin(az) * r
    const z = Math.cos(alt) * Math.cos(az) * r
    return [x, Math.max(1.2, y), z] as [number, number, number]
  }, [altitude, azimuth])

  return (
    <>
      <directionalLight
        castShadow
        position={position}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
      />
      <mesh position={position}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#f0c36a" />
      </mesh>
    </>
  )
}

export function VizLabCanvas({
  altitude,
  azimuth,
  cut,
  eaves,
}: {
  altitude: number
  azimuth: number
  cut: number
  eaves: number
}) {
  return (
    <div className="viz-canvas">
      <Canvas
        shadows
        camera={{ position: [6, 4, 7], fov: 40 }}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true
        }}
      >
        <color attach="background" args={['#e8ebe4']} />
        <ambientLight intensity={0.35} />
        <Sun altitude={altitude} azimuth={azimuth} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#c9d0c0" />
        </mesh>
        <gridHelper args={[20, 20, '#8f9788', '#d5dacd']} position={[0, 0.01, 0]} />
        <MassingHouse cut={cut} eaves={eaves} />
        <ContactShadows opacity={0.35} scale={16} blur={2} />
        <OrbitControls makeDefault target={[0, 1, 0]} maxPolarAngle={1.4} />
      </Canvas>
    </div>
  )
}

export function VizLab() {
  const [altitude, setAltitude] = useState(42)
  const [azimuth, setAzimuth] = useState(35)
  const [cut, setCut] = useState(1.8)
  const [eaves, setEaves] = useState(0.35)
  const [mode, setMode] = useState<'sun' | 'section' | 'eaves'>('sun')

  return (
    <div className="viz-lab">
      <div className="viz-toolbar" role="tablist" aria-label="Visualisation mode">
        {(
          [
            ['sun', 'Sun path & shadow'],
            ['section', 'Section cut'],
            ['eaves', 'Eave depth'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={mode === id ? 'active' : undefined}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="viz-layout">
        <VizLabCanvas altitude={altitude} azimuth={azimuth} cut={cut} eaves={eaves} />

        <aside className="viz-controls panel solid">
          <h2>Interactive visualisation lab</h2>
          <p>
            Orbit the massing model. Adjust Australian-climate sun angles, cut a section through
            the volume, and test eave depth for shading.
          </p>

          {mode === 'sun' || mode === 'eaves' ? (
            <>
              <label>
                Sun altitude ({altitude}°)
                <input
                  type="range"
                  min={5}
                  max={80}
                  value={altitude}
                  onChange={(e) => setAltitude(Number(e.target.value))}
                />
              </label>
              <label>
                Sun azimuth ({azimuth}°)
                <input
                  type="range"
                  min={-80}
                  max={80}
                  value={azimuth}
                  onChange={(e) => setAzimuth(Number(e.target.value))}
                />
              </label>
            </>
          ) : null}

          {mode === 'section' ? (
            <label>
              Section cut plane ({cut.toFixed(2)})
              <input
                type="range"
                min={-0.2}
                max={2.2}
                step={0.05}
                value={cut}
                onChange={(e) => setCut(Number(e.target.value))}
              />
            </label>
          ) : null}

          {mode === 'eaves' || mode === 'sun' ? (
            <label>
              Eave overhang ({eaves.toFixed(2)} m)
              <input
                type="range"
                min={0}
                max={1.2}
                step={0.05}
                value={eaves}
                onChange={(e) => setEaves(Number(e.target.value))}
              />
            </label>
          ) : null}

          <div className="viz-notes">
            <h3>Reading the model</h3>
            <ul className="bullet-list">
              <li>Low winter sun wants controlled northern penetration in much of Australia.</li>
              <li>Deep eaves cut harsh summer altitude—watch facade shadow length.</li>
              <li>Section cuts reveal volume relationships before you open CAD.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
