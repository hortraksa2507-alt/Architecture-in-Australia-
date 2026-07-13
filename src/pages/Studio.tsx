import { Link } from 'react-router-dom'
import { studioGuides } from '../data/content'
import { CheckRow } from '../components/CheckRow'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

export function Studio() {
  const { isStudioChecked, toggleStudioCheck } = useArchiva()
  const allChecks = studioGuides.flatMap((g) => g.checks)
  const done = allChecks.filter((c) => isStudioChecked(c.id)).length

  return (
    <>
      <div className="page wrap">
        <header className="page-hero">
          <span className="eyebrow">Studio Life</span>
          <h1>The personal half of becoming an architect</h1>
          <p>
            Working checklists for portfolios, critique, networks, and pace—tick what you complete
            this month.
          </p>
          <div className="inline-progress">
            <ProgressBar value={done} max={allChecks.length} label="Studio checklist" />
          </div>
        </header>

        <div className="studio-grid">
          {studioGuides.map((guide) => {
            const gDone = guide.checks.filter((c) => isStudioChecked(c.id)).length
            return (
              <section className="panel solid" key={guide.id}>
                <span className="label">Guide</span>
                <h2>{guide.title}</h2>
                <p>{guide.summary}</p>
                <ProgressBar value={gDone} max={guide.checks.length} label={guide.title} />
                <div className="check-stack" style={{ marginTop: '1rem' }}>
                  {guide.checks.map((c) => (
                    <CheckRow
                      key={c.id}
                      id={c.id}
                      label={c.label}
                      checked={isStudioChecked(c.id)}
                      onToggle={toggleStudioCheck}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <section className="cta-band">
        <div className="cta-inner">
          <h2>Keep momentum in your workspace.</h2>
          <p>Jump back to courses, software tracks, or the practice logbook.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/dashboard">
              Open dashboard
            </Link>
            <Link className="btn btn-secondary" to="/practice/logbook">
              Logbook
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
