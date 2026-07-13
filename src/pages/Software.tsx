import { useMemo, useState } from 'react'
import { softwareTools } from '../data/content'

const categories = ['All', ...Array.from(new Set(softwareTools.map((t) => t.category)))]

export function Software() {
  const [category, setCategory] = useState('All')

  const tools = useMemo(
    () =>
      softwareTools.filter(
        (tool) => category === 'All' || tool.category === category,
      ),
    [category],
  )

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Software</span>
        <h1>Digital craft for Australian studios</h1>
        <p>
          Learn the tools practices hire for—BIM, modelling, visualisation, and
          coordination—tied to how work actually gets delivered.
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
        {tools.map((tool) => (
          <article className="soft-row" key={tool.id}>
            <div>
              <div className="soft-cat">{tool.category}</div>
              <h3>{tool.name}</h3>
            </div>
            <div>
              <p>{tool.summary}</p>
              <p style={{ marginTop: '0.55rem', color: 'var(--leaf-mid)' }}>{tool.track}</p>
            </div>
            <span className="soft-link">Learning track</span>
          </article>
        ))}
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <span className="eyebrow">Recommended order</span>
          <h2>A sensible sequence if you are starting from scratch</h2>
          <p>
            SketchUp or Rhino for early massing → AutoCAD drafting hygiene →
            Revit for practice-ready documentation → visualisation for reviews
            → Grasshopper when your geometry needs logic.
          </p>
        </div>
      </section>
    </div>
  )
}
