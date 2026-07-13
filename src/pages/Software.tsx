import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { softwareTools } from '../data/content'
import { learningBooks } from '../data/books'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

const categories = ['All', ...Array.from(new Set(softwareTools.map((t) => t.category)))]

export function Software() {
  const [category, setCategory] = useState('All')
  const { isStepDone, isLessonDone } = useArchiva()

  const tools = useMemo(
    () => softwareTools.filter((tool) => category === 'All' || tool.category === category),
    [category],
  )

  const softwareBooks = learningBooks.filter((b) => b.category === 'Software' || b.category === 'Visualisation')

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Software learning hub</span>
        <h1>Tools, books, and visualisation craft</h1>
        <p>
          Learn software the way studios use it—step tracks, field-guide books, interactive 3D
          visualisation, and project sprints that produce portfolio evidence.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/explore">
            Enter 3D pavilion
          </Link>
          <Link className="btn btn-outline" to="/viz">
            Viz lab
          </Link>
          <Link className="btn btn-outline" to="/books">
            Software books
          </Link>
        </div>
      </header>

      <section className="hub-feature-row">
        <Link to="/books/revit-field-guide" className="hub-feature">
          <span className="hub-meta">Book</span>
          <h3>Revit Field Guide</h3>
          <p>Setup → documentation → issuing like an Australian practice.</p>
        </Link>
        <Link to="/books/rhino-viz-craft" className="hub-feature">
          <span className="hub-meta">Book</span>
          <h3>Rhino → Visualisation</h3>
          <p>Clean geometry, Make2D, cameras, and climate-true lighting.</p>
        </Link>
        <Link to="/viz" className="hub-feature">
          <span className="hub-meta">Lab</span>
          <h3>Interactive Viz Lab</h3>
          <p>Orbit massing, scrub sun angles, cut sections, test eaves.</p>
        </Link>
        <Link to="/projects#viz-competition" className="hub-feature">
          <span className="hub-meta">Project</span>
          <h3>Competition viz sprint</h3>
          <p>Ten-day narrative image sequence for portfolio and contests.</p>
        </Link>
      </section>

      <div className="section-head" style={{ marginTop: '2.5rem' }}>
        <span className="eyebrow">Step tracks</span>
        <h2>Software drills with saved progress</h2>
        <p>Tick each step as you practise. Pair with the books above for deeper craft.</p>
      </div>

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

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <span className="eyebrow">Recommended books</span>
          <h2>Read, then practise in the lab</h2>
        </div>
        <div className="book-grid compact">
          {softwareBooks.map((book) => {
            const done = book.chapters.filter((c) =>
              isLessonDone(`book-${book.id}-${c.id}`),
            ).length
            return (
              <Link to={`/books/${book.id}`} className="book-cover" key={book.id}>
                <div className="book-cover-bar" style={{ background: book.coverAccent }} />
                <span className="hub-meta">{book.category}</span>
                <h2>{book.title}</h2>
                <p>{book.blurb}</p>
                <ProgressBar value={done} max={book.chapters.length} label="Book progress" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
