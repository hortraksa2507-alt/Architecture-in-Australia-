import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { realWorldProjects } from '../data/books'
import { useArchiva } from '../context/ArchivaContext'
import { CheckRow } from '../components/CheckRow'
import { ProgressBar } from '../components/ProgressBar'

export function Projects() {
  const { isStepDone, toggleStep } = useArchiva()

  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Real-world studios</span>
        <h1>Projects that train practice habits</h1>
        <p>
          Housing, mixed-use, documentation sprints, and competition visualisation—scoped like
          brief-driven work students face in studios and early jobs.
        </p>
      </header>

      <div className="project-stack">
        {realWorldProjects.map((project) => {
          const checkIds = project.deliverables.map((_, i) => `proj-${project.id}-${i}`)
          const done = checkIds.filter((id) => isStepDone(id)).length
          return (
            <article className="project-card" key={project.id} id={project.id}>
              <div className="project-top">
                <div>
                  <span className="pill">{project.level}</span>
                  <span className="pill soft">{project.duration}</span>
                </div>
                <span className="hub-meta">{project.outcome}</span>
              </div>
              <h2>{project.title}</h2>
              <p>{project.brief}</p>

              <div className="split-two" style={{ marginTop: '1.25rem' }}>
                <div>
                  <h3 className="subhead">Deliverables</h3>
                  <ProgressBar value={done} max={project.deliverables.length} label="Deliverables" />
                  <div className="check-stack" style={{ marginTop: '0.85rem' }}>
                    {project.deliverables.map((item, i) => (
                      <CheckRow
                        key={checkIds[i]}
                        id={checkIds[i]}
                        label={item}
                        checked={isStepDone(checkIds[i])}
                        onToggle={toggleStep}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="subhead">Software to use</h3>
                  <ul className="bullet-list">
                    {project.software.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <h3 className="subhead" style={{ marginTop: '1.25rem' }}>
                    Practice tips
                  </h3>
                  <ul className="bullet-list">
                    {project.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="pager-nav">
        <Link className="btn btn-outline" to="/courses">
          Course pathways
        </Link>
        <Link className="btn btn-ghost" to="/software">
          Software hub
        </Link>
      </div>
    </div>
  )
}
