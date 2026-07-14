import { Link } from 'react-router-dom'
import { hubLinks, learningPath } from '../data/content'
import { SearchPanel } from '../components/SearchPanel'

const HERO_IMG =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=80'
const FEATURE_IMG =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80'

export function Home() {
  return (
    <>
      <section className="hero" aria-label="Archiva introduction">
        <div className="hero-media" aria-hidden="true">
          <img
            src={HERO_IMG}
            alt=""
            width={2200}
            height={1400}
            fetchPriority="high"
          />
        </div>
        <div className="hero-content">
          <p className="hero-brand">
            Archiva<em>.</em>
          </p>
          <div className="hero-line" aria-hidden="true" />
          <h1>Australia&apos;s architecture library &amp; learning hub</h1>
          <p>
            Train in software simulators, work real project briefs, read field guides, and explore a live
            3D campus—built for Australian architecture education.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/explore">
              Enter 3D campus
            </Link>
            <Link className="btn btn-secondary" to="/software">
              Start software trainer
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="hub">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The hub</span>
            <h2>Everything a student needs—professionally and personally</h2>
            <p>
              Interactive lessons, checklists that save, competency logging, fee tools, and a
              personal dashboard.
            </p>
          </div>
          <div className="hub-grid">
            {hubLinks.map((item) => (
              <Link key={item.to} to={item.to} className="hub-item">
                <span className="hub-meta">{item.meta}</span>
                <h3>{item.label}</h3>
                <p>{item.summary}</p>
                <span className="hub-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="feature-band">
            <div className="feature-copy">
              <span className="eyebrow">Productive by design</span>
              <h2>Track progress. Keep notes. Log practice hours.</h2>
              <p>
                Archiva stores your learning on this device—complete lessons, tick software steps,
                bookmark articles, and build registration evidence as you go.
              </p>
              <Link className="btn btn-ghost" to="/dashboard">
                Go to dashboard
              </Link>
            </div>
            <div className="feature-visual">
              <img
                src={FEATURE_IMG}
                alt="Contemporary Australian house with deep eaves and timber detailing"
                width={1600}
                height={1100}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--mist)' }}>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Find fast</span>
            <h2>Search the whole library</h2>
            <p>Jump straight into topics, lessons, and software tracks.</p>
          </div>
          <SearchPanel />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Your arc</span>
            <h2>A clear path through study into practice</h2>
            <p>Follow the sequence, or jump to where you need strength today.</p>
          </div>
          <div className="path-list">
            {learningPath.map((step) => (
              <div className="path-row" key={step.num}>
                <span className="path-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.summary}</p>
                </div>
                <span className="path-tag">Path</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-inner">
          <h2>Start a lesson, a software drill, or a logbook entry.</h2>
          <p>
            Whether you are preparing a first portfolio, learning Revit for a graduate role, or
            mapping AACA competencies—work from here.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/software">
              Software trainers
            </Link>
            <Link className="btn btn-secondary" to="/labs">
              Open labs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
