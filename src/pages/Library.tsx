import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { libraryTopics } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

const categories = ['All', ...Array.from(new Set(libraryTopics.map((t) => t.category)))]

export function Library() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const { isBookmarked } = useArchiva()

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
          Open full articles, save bookmarks, and keep personal notes. Progress is tracked as you
          read and work through related courses.
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

      <p className="muted count-line">
        {filtered.length} topic{filtered.length === 1 ? '' : 's'} ·{' '}
        {libraryTopics.filter((t) => isBookmarked(t.id)).length} saved
      </p>

      {filtered.length === 0 ? (
        <p className="empty-state">No topics match that search. Try a broader term.</p>
      ) : (
        <div className="content-grid">
          {filtered.map((topic) => (
            <article className="topic linkish" key={topic.id}>
              <span className="label">
                {topic.category}
                {isBookmarked(topic.id) ? ' · Saved' : ''}
              </span>
              <h3>
                <Link to={`/library/${topic.id}`}>{topic.title}</Link>
              </h3>
              <p>{topic.summary}</p>
              <div className="topic-foot">
                <span>{topic.readMins} min read</span>
                <Link to={`/library/${topic.id}`}>Open article →</Link>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="inline-progress">
        <ProgressBar
          value={libraryTopics.filter((t) => isBookmarked(t.id)).length}
          max={libraryTopics.length}
          label="Topics saved"
        />
      </div>
    </div>
  )
}
