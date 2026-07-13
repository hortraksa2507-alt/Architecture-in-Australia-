import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/library', label: 'Library' },
  { to: '/courses', label: 'Courses' },
  { to: '/software', label: 'Software' },
  { to: '/practice', label: 'Practice' },
  { to: '/business', label: 'Business' },
  { to: '/studio', label: 'Studio Life' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          Archiva <span>AU</span>
        </NavLink>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>

        <nav
          id="primary-nav"
          className={`nav-links${open ? ' open' : ''}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
