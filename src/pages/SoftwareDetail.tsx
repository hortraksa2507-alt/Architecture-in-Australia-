import { Link, Navigate, useParams } from 'react-router-dom'
import { getSoftware } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { CheckRow } from '../components/CheckRow'
import { ProgressBar } from '../components/ProgressBar'
import { BookmarkButton } from '../components/BookmarkButton'
import { NotesPanel } from '../components/NotesPanel'
import { SoftwareSimulator } from '../components/SoftwareSimulator'

export function SoftwareDetail() {
  const { toolId } = useParams()
  const tool = toolId ? getSoftware(toolId) : undefined
  const { isStepDone, toggleStep } = useArchiva()
  if (!tool) return <Navigate to="/software" replace />

  const done = tool.steps.filter((s) => isStepDone(s.id)).length

  return (
    <div className="page wrap narrow">
      <nav className="crumbs">
        <Link to="/software">Software</Link>
        <span>/</span>
        <span>{tool.category}</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">{tool.category}</span>
        <h1>{tool.name}</h1>
        <p>{tool.summary}</p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <BookmarkButton id={tool.id} />
        </div>
        <div className="inline-progress">
          <ProgressBar value={done} max={tool.steps.length} label="Track progress" />
        </div>
      </header>

      <section className="panel solid">
        <h2>Why it matters</h2>
        <p>{tool.why}</p>
        <p className="muted" style={{ marginTop: '0.75rem' }}>
          Suggested path: {tool.track}
        </p>
      </section>

      <section className="panel solid">
        <h2>Learning steps</h2>
        <div className="check-stack">
          {tool.steps.map((step) => (
            <CheckRow
              key={step.id}
              id={step.id}
              label={step.title}
              detail={step.detail}
              checked={isStepDone(step.id)}
              onToggle={toggleStep}
            />
          ))}
        </div>
      </section>

      <section className="panel solid">
        <h2>Practice tips</h2>
        <ul className="bullet-list">
          {tool.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {(tool.id === 'revit' || tool.id === 'rhino') && (
        <div style={{ marginTop: '1.25rem' }}>
          <SoftwareSimulator trackId={tool.id} />
        </div>
      )}

      <NotesPanel
        refType="software"
        refId={tool.id}
        placeholder="Shortcuts, office standards, bugs you hit, personal exercises…"
      />

      <div className="pager-nav">
        <Link className="btn btn-outline" to="/software">
          All software
        </Link>
        <Link
          className="btn btn-ghost"
          to={
            tool.id === 'revit'
              ? '/books/revit-field-guide'
              : tool.id === 'rhino' || tool.id === 'lumion' || tool.id === 'grasshopper'
                ? '/books/rhino-viz-craft'
                : '/books'
          }
        >
          Related learning book
        </Link>
      </div>
    </div>
  )
}
