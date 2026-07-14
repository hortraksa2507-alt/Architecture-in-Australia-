import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { softwareTools } from '../data/content'
import { learningBooks } from '../data/books'
import { softwareCurricula, quizzes } from '../data/labs'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'
import { SoftwareSimulator } from '../components/SoftwareSimulator'
import { QuizPlayer } from '../components/QuizPlayer'

const categories = ['All', ...Array.from(new Set(softwareTools.map((t) => t.category)))]

export function Software() {
  const [category, setCategory] = useState('All')
  const [trainer, setTrainer] = useState<'revit' | 'rhino'>('revit')
  const { isStepDone, isLessonDone, toggleStep } = useArchiva()

  const tools = useMemo(
    () => softwareTools.filter((tool) => category === 'All' || tool.category === category),
    [category],
  )

  const curriculum = softwareCurricula[trainer]
  const weeksDone = curriculum.weeks.filter((w) => isStepDone(`week-${trainer}-${w.week}`)).length

  return (
    <div className="page wrap wide">
      <header className="page-hero">
        <span className="eyebrow">Software learning hub</span>
        <h1>Train like you will work</h1>
        <p>
          Interactive simulators, multi-week curricula, quizzes, and field-guide books—built to create
          portfolio and office-ready skill, not slide decks.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/explore">
            3D campus
          </Link>
          <Link className="btn btn-outline" to="/viz">
            Viz lab
          </Link>
          <Link className="btn btn-outline" to="/labs">
            Construction labs
          </Link>
        </div>
      </header>

      <div className="filter-bar" role="tablist" aria-label="Trainer">
        <button
          type="button"
          className={trainer === 'revit' ? 'active' : undefined}
          onClick={() => setTrainer('revit')}
        >
          Revit trainer
        </button>
        <button
          type="button"
          className={trainer === 'rhino' ? 'active' : undefined}
          onClick={() => setTrainer('rhino')}
        >
          Rhino trainer
        </button>
      </div>

      <SoftwareSimulator trackId={trainer} />

      <section className="curriculum-panel">
        <div className="section-head">
          <span className="eyebrow">Curriculum</span>
          <h2>{curriculum.title}</h2>
          <ProgressBar value={weeksDone} max={curriculum.weeks.length} label="Weeks completed" />
        </div>
        <div className="week-grid">
          {curriculum.weeks.map((week) => {
            const id = `week-${trainer}-${week.week}`
            const done = isStepDone(id)
            return (
              <article key={id} className={`week-card${done ? ' done' : ''}`}>
                <span className="pill">Week {week.week}</span>
                <h3>{week.title}</h3>
                <p>{week.focus}</p>
                <ul className="bullet-list">
                  {week.outcomes.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <div className="week-practice">
                  <strong>Practice</strong>
                  {week.practice.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className={`btn ${done ? 'btn-outline' : 'btn-ghost'}`}
                  onClick={() => toggleStep(id)}
                >
                  {done ? 'Completed' : 'Mark week done'}
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Validate</span>
          <h2>Software craft quizzes</h2>
        </div>
        <div className="quiz-grid">
          <QuizPlayer quizId="revit-basics" title="Revit basics" questions={quizzes['revit-basics']} />
          <QuizPlayer quizId="viz-craft" title="Visualisation craft" questions={quizzes['viz-craft']} />
        </div>
      </section>

      <div className="section-head">
        <span className="eyebrow">Step tracks</span>
        <h2>Tool drills</h2>
      </div>
      <div className="filter-bar">
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
        <div className="book-grid compact">
          {learningBooks
            .filter((b) => b.category === 'Software' || b.category === 'Visualisation')
            .map((book) => {
              const done = book.chapters.filter((c) => isLessonDone(`book-${book.id}-${c.id}`)).length
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
