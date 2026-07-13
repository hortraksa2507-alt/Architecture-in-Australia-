import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand">
              Archiva <span>AU</span>
            </div>
            <p>
              Australia&apos;s architecture library and learning workspace—courses, software books,
              3D visualisation, and practice tools.
            </p>
          </div>
          <div>
            <h4>Learn</h4>
            <Link to="/explore">3D Campus</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/software">Software</Link>
            <Link to="/books">Books</Link>
          </div>
          <div>
            <h4>Create</h4>
            <Link to="/viz">Viz Lab</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/practice/logbook">Logbook</Link>
            <Link to="/studio">Studio Life</Link>
          </div>
          <div>
            <h4>Workspace</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/library">Library</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/search">Search</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Progress saves on this device. Educational resource—not professional advice.</span>
          <span>© {new Date().getFullYear()} Archiva</span>
        </div>
      </div>
    </footer>
  )
}
