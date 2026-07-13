import { Link } from 'react-router-dom'
import { ArchivaScene } from '../components/scene/ArchivaScene'

export function Explore() {
  return (
    <div className="explore-page">
      <div className="page wrap" style={{ paddingBottom: '1rem' }}>
        <header className="page-hero" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
          <span className="eyebrow">3D campus</span>
          <h1>Explore the Archiva pavilion</h1>
          <p>
            Orbit a learning campus built as architecture. Click glowing rooms to enter Courses,
            Software Lab, Books, or the Visualisation pavilion.
          </p>
        </header>
      </div>

      <ArchivaScene />

      <div className="wrap explore-links">
        <Link className="btn btn-ghost" to="/books">
          Open learning books
        </Link>
        <Link className="btn btn-outline" to="/viz">
          Open viz lab
        </Link>
        <Link className="btn btn-outline" to="/projects">
          Real-world projects
        </Link>
      </div>
    </div>
  )
}
