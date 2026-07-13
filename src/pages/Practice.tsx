import { Link } from 'react-router-dom'
import { practicePaths } from '../data/content'

export function Practice() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Practice</span>
        <h1>Professional pathway to registration</h1>
        <p>
          Understand AACA competencies, state boards, mentoring, and the habits
          that turn graduate experience into architectural responsibility.
        </p>
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
          <div className="panel">
            <h2>What studios expect</h2>
            <p>
              Clear drawing communication, reliability under coordination
              pressure, and judgement about when to ask. Technical skill without
              professional maturity stalls careers.
            </p>
            <ul className="checklist">
              <li>Document carefully and name files for others</li>
              <li>Read consultant mark-ups before reissuing</li>
              <li>Know NCC / BCA references relevant to your work</li>
              <li>Protect client confidence and IP</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Career shapes</h2>
            <p>
              Residential craft studios, commercial delivery firms, government,
              heritage, academia, product design, and urban policy—all remain
              architecture-adjacent futures.
            </p>
            <Link className="btn btn-outline" to="/business">
              Explore business literacy
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
