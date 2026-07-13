import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { searchAll } from '../data/searchIndex'

export function SearchPanel({
  compact = false,
  autofocus = false,
}: {
  compact?: boolean
  autofocus?: boolean
}) {
  const [q, setQ] = useState('')
  const hits = useMemo(() => searchAll(q), [q])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
  }

  return (
    <div className={`search-panel${compact ? ' compact' : ''}`}>
      <form className="search-box" onSubmit={onSubmit} role="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search library, courses, software, lessons…"
          aria-label="Search Archiva"
          autoFocus={autofocus}
        />
      </form>
      {q.trim() ? (
        <div className="search-results">
          {hits.length === 0 ? (
            <p className="empty-state">No matches for “{q.trim()}”.</p>
          ) : (
            <ul>
              {hits.map((hit) => (
                <li key={`${hit.type}-${hit.id}`}>
                  <Link to={hit.to}>
                    <span className="hit-type">{hit.type}</span>
                    <strong>{hit.title}</strong>
                    <span className="hit-blurb">{hit.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
