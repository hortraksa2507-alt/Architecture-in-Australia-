import { Link } from 'react-router-dom'
import { businessTopics } from '../data/content'

export function Business() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Business</span>
        <h1>How architecture practices actually run</h1>
        <p>
          Fees, contracts, cashflow, procurement, and the operational realities
          behind every beautiful project photograph.
        </p>
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

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="feature-band reverse">
          <div className="feature-copy">
            <span className="eyebrow">For founders &amp; employees</span>
            <h2>Business literacy is professional care</h2>
            <p>
              Whether you join a large firm or open a one-person practice,
              understanding money, risk, and delivery lets you design with
              clearer responsibility—and protect your future self.
            </p>
            <Link className="btn btn-ghost" to="/studio">
              Care for studio life
            </Link>
          </div>
          <div className="feature-visual">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
              alt="Bright collaborative studio workspace"
              width={1600}
              height={1100}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
