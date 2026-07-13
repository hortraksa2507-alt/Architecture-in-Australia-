import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { softwareTools } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

const categories = ['All', ...Array.from(new Set(softwareTools.map((t) => t.category)))]

export function Software() {
  const [category, setCategory] = useState('All')
  const { isStepDone } = useArchiva()

  const tools = useMemo(
    () => softwareTools.filter((tool) => category === 'All' || tool.category === category),
    [category],
  )

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Software</span>
        <h1>Digital craft for Australian studios</h1>
        <p>
          Follow step-by-step tracks, tick completed drills, and keep tool notes. Built for daily
          practice—not brochure pages.
        </p>
      </header>

      <div className="filter-bar" role="group" aria-label="Filter software">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={category === cat ? 'active' : undefined}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="software-list">
        {tools.map((tool) => {
          const done = tool.steps.filter((s) => isStepDone(s.id)).length
          return (
            <article className="soft-row" key={tool.id}>
              <div>
                <div className="soft-cat">{tool.category}</div>
                <h3>
                  <Link to={`/software/${tool.id}`}>{tool.name}</Link>
                </h3>
              </div>
              <div>
                <p>{tool.summary}</p>
                <div className="inline-progress" style={{ marginTop: '0.75rem' }}>
                  <ProgressBar value={done} max={tool.steps.length} label={`${tool.name} steps`} />
                </div>
              </div>
              <Link className="soft-link" to={`/software/${tool.id}`}>
                Open track →
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
