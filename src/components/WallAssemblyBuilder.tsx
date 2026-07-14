import { useMemo, useState } from 'react'
import { wallAssemblies } from '../data/labs'

export function WallAssemblyBuilder() {
  const [activeId, setActiveId] = useState(wallAssemblies[0].id)
  const [hidden, setHidden] = useState<string[]>([])
  const assembly = wallAssemblies.find((a) => a.id === activeId) ?? wallAssemblies[0]

  const visible = useMemo(
    () => assembly.layers.filter((l) => !hidden.includes(`${assembly.id}:${l.id}`)),
    [assembly, hidden],
  )

  const total = visible.reduce((sum, l) => sum + l.thickness, 0)

  function toggleLayer(layerId: string) {
    const key = `${assembly.id}:${layerId}`
    setHidden((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]))
  }

  return (
    <div className="wall-lab">
      <div className="wall-lab-head">
        <div>
          <span className="eyebrow">Construction lab</span>
          <h2>Wall assembly builder</h2>
          <p>Toggle layers to understand thickness, roles, and climate fit—then redraw it in section.</p>
        </div>
        <div className="filter-bar">
          {wallAssemblies.map((a) => (
            <button
              key={a.id}
              type="button"
              className={activeId === a.id ? 'active' : undefined}
              onClick={() => {
                setActiveId(a.id)
                setHidden([])
              }}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      <div className="wall-layout">
        <div className="wall-visual" aria-hidden="true">
          {assembly.layers.map((layer, i) => {
            const key = `${assembly.id}:${layer.id}`
            const on = !hidden.includes(key)
            return (
              <div
                key={layer.id}
                className={`wall-strip${on ? '' : ' off'}`}
                style={{
                  flexGrow: layer.thickness,
                  background: stripColor(i),
                }}
                title={layer.name}
              />
            )
          })}
        </div>

        <div className="wall-list">
          <p className="pill soft">{assembly.climate}</p>
          <p className="muted">{assembly.notes}</p>
          <p>
            Visible thickness ≈ <strong>{total} mm</strong>
          </p>
          <ul className="wall-layers">
            {assembly.layers.map((layer, i) => {
              const key = `${assembly.id}:${layer.id}`
              const on = !hidden.includes(key)
              return (
                <li key={layer.id}>
                  <button type="button" className={on ? 'on' : undefined} onClick={() => toggleLayer(layer.id)}>
                    <span className="swatch" style={{ background: stripColor(i) }} />
                    <span>
                      <strong>{layer.name}</strong>
                      <em>
                        {layer.thickness} mm · {layer.role}
                      </em>
                    </span>
                    <span>{on ? 'On' : 'Off'}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function stripColor(i: number) {
  const colors = ['#f4efe6', '#e4ddd0', '#c8b89a', '#8f9d86', '#d7e0ea', '#a84b38', '#243d32']
  return colors[i % colors.length]
}
