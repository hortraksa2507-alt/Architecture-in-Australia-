import { Link } from 'react-router-dom'
import { hubLinks, learningPath } from '../data/content'

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
            One place for studio craft, software skill, professional pathways,
            business literacy, and a sustainable creative life.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/courses">
              Start learning
            </Link>
            <a className="btn btn-secondary" href="#hub">
              Explore the hub
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="hub">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">The hub</span>
            <h2>Everything a student needs—professionally and personally</h2>
            <p>
              Archiva stitches knowledge, courses, tools, registration, business,
              and studio life into one coherent place.
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
              <span className="eyebrow">Grounded here</span>
              <h2>Built for Australian schools, climates, and practice</h2>
              <p>
                From NatHERS and the NCC to state registration boards and local
                housing typologies, Archiva teaches architecture in the context
                you will actually work in.
              </p>
              <Link className="btn btn-ghost" to="/library">
                Enter the library
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
            <span className="eyebrow">Your arc</span>
            <h2>A clear path through study into practice</h2>
            <p>
              Follow the sequence, or jump to where you need strength today.
            </p>
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
          <h2>Open a course, open a tool, open a career chapter.</h2>
          <p>
            Whether you are preparing a first portfolio, learning Revit for a
            graduate role, or mapping AACA competencies—start from here.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/software">
              Learn software
            </Link>
            <Link className="btn btn-secondary" to="/practice">
              Practice pathway
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
