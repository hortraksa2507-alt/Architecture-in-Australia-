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
              Australia&apos;s architecture library and learning workspace—for students,
              graduates, and practitioners building lasting practice.
            </p>
          </div>
          <div>
            <h4>Learn</h4>
            <Link to="/library">Library</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/software">Software</Link>
            <Link to="/search">Search</Link>
          </div>
          <div>
            <h4>Profession</h4>
            <Link to="/practice">Practice</Link>
            <Link to="/practice/logbook">Logbook</Link>
            <Link to="/business/tools">Business tools</Link>
            <Link to="/studio">Studio Life</Link>
          </div>
          <div>
            <h4>Workspace</h4>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/courses">Continue learning</Link>
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
