import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { climatePresets, typologies } from '../data/labs'

function House({
  typology,
  cut,
  eaves,
}: {
  typology: string
  cut: number
  eaves: number
}) {
  const mats = useMemo(() => {
    const body = new THREE.MeshStandardMaterial({ color: '#d9d3c5', roughness: 0.84 })
    const roof = new THREE.MeshStandardMaterial({ color: '#2a4136', roughness: 0.62 })
    const glass = new THREE.MeshPhysicalMaterial({
      color: '#9fb4a8',
      transmission: 0.4,
      transparent: true,
      opacity: 0.8,
      roughness: 0.15,
      thickness: 0.2,
    })
    const dark = new THREE.MeshStandardMaterial({ color: '#5c5044', roughness: 0.9 })
    const plane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), cut)
    for (const m of [body, roof, glass, dark]) {
      m.clippingPlanes = [plane]
      m.clipShadows = true
    }
    return { body, roof, glass, dark }
  }, [cut])

  return (
    <group>
      {typology === 'skinny' ? (
        <>
          <mesh position={[0, 1.15, 0]} castShadow material={mats.body}>
            <boxGeometry args={[2.1, 2.3, 5.2]} />
          </mesh>
          <mesh position={[0, 1.2, 2.62]} material={mats.glass}>
            <boxGeometry args={[1.4, 1.6, 0.08]} />
          </mesh>
          <mesh position={[0, 2.45, 0]} castShadow material={mats.roof}>
            <boxGeometry args={[2.1 + eaves * 2, 0.14, 5.2 + eaves * 2]} />
          </mesh>
        </>
      ) : null}

      {typology === 'courtyard' ? (
        <>
          <mesh position={[-1.4, 0.95, 0]} castShadow material={mats.body}>
            <boxGeometry args={[1.6, 1.9, 4]} />
          </mesh>
          <mesh position={[1.4, 0.95, 0]} castShadow material={mats.body}>
            <boxGeometry args={[1.6, 1.9, 4]} />
          </mesh>
          <mesh position={[0, 0.95, -1.55]} castShadow material={mats.body}>
            <boxGeometry args={[4.4, 1.9, 1.3]} />
          </mesh>
          <mesh position={[0, 0.08, 0]} material={mats.dark}>
            <boxGeometry args={[1.5, 0.08, 2.2]} />
          </mesh>
          <mesh position={[0, 2.05, 0]} castShadow material={mats.roof}>
            <boxGeometry args={[4.6 + eaves, 0.12, 4.4 + eaves]} />
          </mesh>
          <mesh position={[1.4, 1.0, 2.02]} material={mats.glass}>
            <boxGeometry args={[1.0, 1.2, 0.06]} />
          </mesh>
        </>
      ) : null}

      {typology === 'pavilion' ? (
        <>
          <mesh position={[0, 0.85, 0]} castShadow material={mats.body}>
            <boxGeometry args={[4.4, 1.7, 3.2]} />
          </mesh>
          <mesh position={[0, 2.2, 0]} castShadow material={mats.roof}>
            <boxGeometry args={[5.4 + eaves * 2, 0.12, 4.0 + eaves * 2]} />
          </mesh>
          <mesh position={[0, 1.1, 0]} castShadow material={mats.dark}>
            <cylinderGeometry args={[0.1, 0.12, 2.0, 12]} />
          </mesh>
          <mesh position={[-1.6, 1.1, 1.1]} castShadow material={mats.dark}>
            <cylinderGeometry args={[0.08, 0.1, 2.0, 12]} />
          </mesh>
          <mesh position={[1.6, 1.1, 1.1]} castShadow material={mats.dark}>
            <cylinderGeometry args={[0.08, 0.1, 2.0, 12]} />
          </mesh>
          <mesh position={[0, 0.95, 1.62]} material={mats.glass}>
            <boxGeometry args={[3.2, 1.3, 0.06]} />
          </mesh>
        </>
      ) : null}
    </group>
  )
}

function SunDisk({ altitude, azimuth }: { altitude: number; azimuth: number }) {
  const light = useRef<THREE.DirectionalLight>(null)
  const pos = useMemo(() => {
    const alt = (altitude * Math.PI) / 180
    const az = (azimuth * Math.PI) / 180
    const r = 11
    return [
      Math.cos(alt) * Math.sin(az) * r,
      Math.max(1.4, Math.sin(alt) * r),
      Math.cos(alt) * Math.cos(az) * r,
    ] as [number, number, number]
  }, [altitude, azimuth])

  useFrame(() => {
    if (light.current) light.current.position.set(...pos)
  })

  return (
    <>
      <directionalLight ref={light} castShadow intensity={1.55} shadow-mapSize={[2048, 2048]} position={pos} />
      <mesh position={pos}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshBasicMaterial color="#f2c56d" />
      </mesh>
    </>
  )
}

export function VizLab() {
  const [presetId, setPresetId] = useState('melbourne')
  const preset = climatePresets.find((p) => p.id === presetId) ?? climatePresets[0]
  const [altitude, setAltitude] = useState(preset.altitude)
  const [azimuth, setAzimuth] = useState(preset.azimuth)
  const [cut, setCut] = useState(1.6)
  const [eaves, setEaves] = useState(preset.eaves)
  const [typology, setTypology] = useState('courtyard')
  const [mode, setMode] = useState<'climate' | 'section' | 'typology'>('climate')
  const [animating, setAnimating] = useState(false)
  const animRef = useRef<number | null>(null)

  function applyPreset(id: string) {
    const p = climatePresets.find((x) => x.id === id)
    if (!p) return
    setPresetId(id)
    setAltitude(p.altitude)
    setAzimuth(p.azimuth)
    setEaves(p.eaves)
  }

  function animateSun() {
    if (animating) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      setAnimating(false)
      return
    }
    setAnimating(true)
    let az = -80
    const tick = () => {
      az += 0.6
      setAzimuth(Math.sin((az * Math.PI) / 180) * 70)
      setAltitude(25 + Math.cos((az * Math.PI) / 180) * 30)
      if (az < 80) animRef.current = requestAnimationFrame(tick)
      else setAnimating(false)
    }
    animRef.current = requestAnimationFrame(tick)
  }

  return (
    <div className="viz-lab">
      <div className="viz-toolbar" role="tablist" aria-label="Visualisation mode">
        {(
          [
            ['climate', 'Climate & sun'],
            ['section', 'Section cut'],
            ['typology', 'Typology'],
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
        <button type="button" className={animating ? 'active' : undefined} onClick={animateSun}>
          {animating ? 'Stop sun path' : 'Animate day arc'}
        </button>
      </div>

      <div className="viz-layout">
        <div className="viz-canvas">
          <Canvas
            shadows
            camera={{ position: [7.5, 4.8, 8.2], fov: 38 }}
            onCreated={({ gl }) => {
              gl.localClippingEnabled = true
            }}
          >
            <color attach="background" args={['#dde3d7']} />
            <fog attach="fog" args={['#dde3d7', 16, 34]} />
            <ambientLight intensity={0.32} />
            <hemisphereLight args={['#f3f5ef', '#7f8776', 0.4]} />
            <SunDisk altitude={altitude} azimuth={azimuth} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[16, 64]} />
              <meshStandardMaterial color="#c2cbb6" />
            </mesh>
            <gridHelper args={[18, 18, '#8b9482', '#d0d6c7']} position={[0, 0.02, 0]} />
            <House typology={typology} cut={cut} eaves={eaves} />
            <ContactShadows opacity={0.42} scale={18} blur={2.4} />
            <Environment preset="forest" />
            <OrbitControls makeDefault target={[0, 1.1, 0]} maxPolarAngle={1.42} minDistance={5} maxDistance={16} />
          </Canvas>
        </div>

        <aside className="viz-controls panel solid">
          <h2>Visualisation laboratory</h2>
          <p>{preset.summary}</p>

          <div className="filter-bar">
            {climatePresets.map((p) => (
              <button
                key={p.id}
                type="button"
                className={presetId === p.id ? 'active' : undefined}
                onClick={() => applyPreset(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>

          {(mode === 'climate' || mode === 'typology') && (
            <>
              <label>
                Sun altitude ({altitude.toFixed(0)}°)
                <input type="range" min={5} max={85} value={altitude} onChange={(e) => setAltitude(Number(e.target.value))} />
              </label>
              <label>
                Sun azimuth ({azimuth.toFixed(0)}°)
                <input type="range" min={-90} max={90} value={azimuth} onChange={(e) => setAzimuth(Number(e.target.value))} />
              </label>
              <label>
                Eave overhang ({eaves.toFixed(2)} m)
                <input type="range" min={0} max={1.4} step={0.05} value={eaves} onChange={(e) => setEaves(Number(e.target.value))} />
              </label>
            </>
          )}

          {mode === 'section' && (
            <label>
              Section cut ({cut.toFixed(2)})
              <input type="range" min={-0.4} max={2.6} step={0.05} value={cut} onChange={(e) => setCut(Number(e.target.value))} />
            </label>
          )}

          {(mode === 'typology' || mode === 'section') && (
            <div className="filter-bar">
              {typologies.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={typology === t.id ? 'active' : undefined}
                  onClick={() => setTypology(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}

          <div className="viz-notes">
            <h3>Studio drill</h3>
            <ul className="bullet-list">
              <li>Match a climate preset, then redraw eaves that prove summer cut-off.</li>
              <li>Cut a section and sketch structure + drainage from what you see.</li>
              <li>Switch typology and keep the same sun—watch amenity change.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
