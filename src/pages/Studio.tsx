import { Link } from 'react-router-dom'
import { studioGuides } from '../data/content'

export function Studio() {
  return (
    <>
      <div className="page wrap">
        <header className="page-hero">
          <span className="eyebrow">Studio Life</span>
          <h1>The personal half of becoming an architect</h1>
          <p>
            Portfolios, critique stamina, networks, money while studying, and a
            pace that can last decades—not just one all-nighter.
          </p>
        </header>

        <div className="hub-grid">
          {studioGuides.map((guide) => (
            <article className="hub-item" key={guide.title}>
              <span className="hub-meta">Guide</span>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="cta-band">
        <div className="cta-inner">
          <h2>Return to the full hub whenever you need a next step.</h2>
          <p>
            Archiva is meant to sit beside your semester—open the library for
            a brief, a course for structure, software when a deadline demands craft.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/">
              Back to Archiva
            </Link>
            <Link className="btn btn-secondary" to="/courses">
              Browse courses
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
