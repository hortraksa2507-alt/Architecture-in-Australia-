import { useMemo, useState } from 'react'
import { simulatorTracks } from '../data/labs'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from './ProgressBar'

export function SoftwareSimulator({ trackId }: { trackId: 'revit' | 'rhino' }) {
  const track = simulatorTracks[trackId]
  const { isStepDone, toggleStep } = useArchiva()
  const [stepIdx, setStepIdx] = useState(0)
  const [message, setMessage] = useState('Follow the instruction. Click the highlighted control.')
  const [pulse, setPulse] = useState<string | null>(track.steps[0]?.target ?? null)
  const [walls, setWalls] = useState<number>(0)
  const [hasSection, setHasSection] = useState(false)
  const [hasSheet, setHasSheet] = useState(false)
  const [tagged, setTagged] = useState(false)
  const [mass, setMass] = useState(false)
  const [court, setCourt] = useState(false)
  const [make2d, setMake2d] = useState(false)
  const [activeLevel, setActiveLevel] = useState('L1')
  const [activeLayer, setActiveLayer] = useState('Site')

  const step = track.steps[stepIdx]
  const doneCount = track.steps.filter((s) => isStepDone(s.id)).length

  const highlight = useMemo(() => pulse ?? step?.target, [pulse, step])

  function completeCurrent() {
    if (!isStepDone(step.id)) toggleStep(step.id)
    setMessage(step.success)
    if (stepIdx < track.steps.length - 1) {
      const next = track.steps[stepIdx + 1]
      setTimeout(() => {
        setStepIdx((i) => i + 1)
        setPulse(next.target)
        setMessage(next.instruction)
      }, 650)
    } else {
      setPulse(null)
      setMessage('Trainer complete. Repeat until the workflow feels automatic.')
    }
  }

  function onTarget(id: string) {
    if (!step) return
    if (id !== step.target) {
      setMessage(`Not yet — you need: ${step.title}`)
      return
    }

    if (id === 'level-gf') setActiveLevel('GF')
    if (id === 'layer-massing') setActiveLayer('Massing')
    if (id === 'tool-wall') setWalls((w) => Math.min(4, w + 1))
    if (id === 'tool-section') setHasSection(true)
    if (id === 'sheet-drop') setHasSheet(true)
    if (id === 'tool-tag') setTagged(true)
    if (id === 'tool-rect' || id === 'tool-extrude') setMass(true)
    if (id === 'tool-boolean') setCourt(true)
    if (id === 'tool-make2d') setMake2d(true)

    completeCurrent()
  }

  function cls(id: string) {
    return `sim-hit${highlight === id ? ' hot' : ''}`
  }

  return (
    <div className="sim-shell">
      <div className="sim-head">
        <div>
          <span className="eyebrow">{track.software} trainer</span>
          <h2>{track.title}</h2>
        </div>
        <ProgressBar value={doneCount} max={track.steps.length} label="Trainer steps" />
      </div>

      <div className="sim-instruction">
        <strong>
          Step {stepIdx + 1}/{track.steps.length}: {step?.title}
        </strong>
        <p>{message}</p>
        <span className="sim-tip">{step?.tip}</span>
      </div>

      <div className={`sim-ui ${trackId}`}>
        <aside className="sim-rail">
          {trackId === 'revit' ? (
            <>
              <button type="button" className={cls('tool-wall')} onClick={() => onTarget('tool-wall')}>
                Wall
              </button>
              <button type="button" className={cls('tool-section')} onClick={() => onTarget('tool-section')}>
                Section
              </button>
              <button type="button" className={cls('tool-tag')} onClick={() => onTarget('tool-tag')}>
                Tag
              </button>
              <button type="button" className="sim-hit muted" disabled>
                Door
              </button>
            </>
          ) : (
            <>
              <button type="button" className={cls('tool-rect')} onClick={() => onTarget('tool-rect')}>
                Rect
              </button>
              <button type="button" className={cls('tool-extrude')} onClick={() => onTarget('tool-extrude')}>
                Extrude
              </button>
              <button type="button" className={cls('tool-boolean')} onClick={() => onTarget('tool-boolean')}>
                Boolean
              </button>
              <button type="button" className={cls('tool-make2d')} onClick={() => onTarget('tool-make2d')}>
                Make2D
              </button>
            </>
          )}
        </aside>

        <div className="sim-stage">
          {trackId === 'revit' ? (
            <>
              <div className="sim-levels">
                {['Roof', 'L1', 'GF'].map((lv) => (
                  <button
                    key={lv}
                    type="button"
                    className={`${cls(lv === 'GF' ? 'level-gf' : 'level-other')}${activeLevel === lv ? ' on' : ''}`}
                    onClick={() => (lv === 'GF' ? onTarget('level-gf') : undefined)}
                  >
                    {lv}
                  </button>
                ))}
              </div>
              <div className="sim-canvas">
                <div className="sim-grid" />
                {walls > 0 ? <div className={`sim-wall w${Math.min(walls, 4)}`} /> : null}
                {hasSection ? <div className="sim-section-line" /> : null}
                {tagged ? <div className="sim-tag">D01</div> : null}
                <button
                  type="button"
                  className={cls('sheet-drop')}
                  onClick={() => onTarget('sheet-drop')}
                >
                  {hasSheet ? 'Sheet A201 · view placed' : 'Drop view on Sheet A201'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="sim-layers">
                {['Site', 'Massing', 'Glazing'].map((ly) => (
                  <button
                    key={ly}
                    type="button"
                    className={`${cls(ly === 'Massing' ? 'layer-massing' : 'layer-other')}${activeLayer === ly ? ' on' : ''}`}
                    onClick={() => (ly === 'Massing' ? onTarget('layer-massing') : undefined)}
                  >
                    {ly}
                  </button>
                ))}
              </div>
              <div className="sim-canvas rhino">
                <div className="sim-grid" />
                {mass ? <div className={`sim-mass${court ? ' court' : ''}`} /> : null}
                {make2d ? <div className="sim-make2d">Make2D axon preview</div> : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
