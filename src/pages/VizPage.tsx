import { VizLab } from '../components/VizLab'
import { Link } from 'react-router-dom'

export function VizPage() {
  return (
    <div className="page wrap wide">
      <header className="page-hero">
        <span className="eyebrow">Visualisation lab</span>
        <h1>Interact with massing, sun, and section</h1>
        <p>
          A live 3D learning tool for climate shading and sectional thinking—pair it with the Rhino
          visualisation book and competition project sprint.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/books/rhino-viz-craft">
            Rhino → Viz book
          </Link>
          <Link className="btn btn-outline" to="/projects">
            Competition sprint
          </Link>
        </div>
      </header>

      <VizLab />
    </div>
  )
}
