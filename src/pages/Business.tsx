import { Link } from 'react-router-dom'
import { businessTopics, contractChecklist } from '../data/content'
import { FeeEstimator } from '../components/FeeEstimator'
import { CheckRow } from '../components/CheckRow'
import { useArchiva } from '../context/ArchivaContext'

export function Business() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Business</span>
        <h1>How architecture practices actually run</h1>
        <p>
          Fees, contracts, cashflow, procurement—and working tools so you can practise commercial
          judgement, not just read about it.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/business/tools">
            Open business tools
          </Link>
        </div>
      </header>

      <div className="content-grid">
        {businessTopics.map((topic) => (
          <article className="topic" key={topic.title}>
            <span className="label">Operations</span>
            <h3>{topic.title}</h3>
            <p>{topic.summary}</p>
            <ul>
              {topic.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}

export function BusinessTools() {
  const { isStepDone, toggleStep } = useArchiva()

  return (
    <div className="page wrap">
      <nav className="crumbs">
        <Link to="/business">Business</Link>
        <span>/</span>
        <span>Tools</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">Working tools</span>
        <h1>Fee estimator & contract checklist</h1>
        <p>
          Use these on real study projects, competitions, or early career scenarios. Educational
          only—verify with your supervisor and jurisdiction.
        </p>
      </header>

      <FeeEstimator />

      <section className="tool-card" style={{ marginTop: '1.5rem' }}>
        <div className="tool-card-head">
          <h2>Client–architect agreement checklist</h2>
          <p>Tick items before recommending a client signs. Progress saves locally.</p>
        </div>
        <div className="check-stack">
          {contractChecklist.map((item) => (
            <CheckRow
              key={item.id}
              id={item.id}
              label={item.label}
              checked={isStepDone(item.id)}
              onToggle={toggleStep}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
