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
              Australia&apos;s architecture library and learning hub—for students,
              graduates, and practitioners building lasting practice.
            </p>
          </div>
          <div>
            <h4>Learn</h4>
            <Link to="/library">Library</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/software">Software</Link>
          </div>
          <div>
            <h4>Profession</h4>
            <Link to="/practice">Practice</Link>
            <Link to="/business">Business</Link>
            <Link to="/studio">Studio Life</Link>
          </div>
          <div>
            <h4>Focus</h4>
            <Link to="/">Full hub</Link>
            <Link to="/courses">Learning paths</Link>
            <Link to="/practice">Registration</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Made for architecture education in Australia.</span>
          <span>© {new Date().getFullYear()} Archiva</span>
        </div>
      </div>
    </footer>
  )
}
