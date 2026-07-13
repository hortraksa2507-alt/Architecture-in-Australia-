import { Link } from 'react-router-dom'
import { practicePaths } from '../data/content'

export function Practice() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Practice</span>
        <h1>Professional pathway to registration</h1>
        <p>
          Understand AACA competencies, then log real evidence in the Archiva logbook—weekly,
          not once a year.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/practice/logbook">
            Open logbook
          </Link>
          <Link className="btn btn-outline" to="/courses/registration">
            Registration course
          </Link>
        </div>
      </header>

      <div className="path-list">
        {practicePaths.map((step) => (
          <div className="path-row" key={step.num}>
            <span className="path-num">{step.num}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </div>
            <span className="path-tag">{step.tag}</span>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="split-two">
          <div className="panel solid">
            <h2>What studios expect</h2>
            <ul className="checklist">
              <li>Document carefully and name files for others</li>
              <li>Read consultant mark-ups before reissuing</li>
              <li>Know NCC / BCA references relevant to your work</li>
              <li>Protect client confidence and IP</li>
            </ul>
          </div>
          <div className="panel solid">
            <h2>Working tools</h2>
            <p>
              Use the competency logbook to gather evidence now. Pair with the registration course
              lessons and ethics drills.
            </p>
            <Link className="btn btn-ghost" to="/practice/logbook">
              Start logging hours
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
