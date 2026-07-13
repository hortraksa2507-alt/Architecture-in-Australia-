import { useMemo, useState } from 'react'
import { libraryTopics } from '../data/content'

const categories = ['All', ...Array.from(new Set(libraryTopics.map((t) => t.category)))]

export function Library() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return libraryTopics.filter((topic) => {
      const matchesCategory = category === 'All' || topic.category === category
      const matchesQuery =
        !q ||
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.points.some((p) => p.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Library</span>
        <h1>Knowledge built for studio and site</h1>
        <p>
          Browse architecture theory, Australian place-making, climate design,
          materials, urban housing, and documentation craft.
        </p>
      </header>

      <div className="search-box" role="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          placeholder="Search topics, climate, materials, detailing…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search the library"
        />
      </div>

      <div className="filter-bar" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={category === cat ? 'active' : undefined}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">No topics match that search. Try a broader term.</p>
      ) : (
        <div className="content-grid">
          {filtered.map((topic) => (
            <article className="topic" key={topic.id}>
              <span className="label">{topic.category}</span>
              <h3>{topic.title}</h3>
              <p>{topic.summary}</p>
              <ul>
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
