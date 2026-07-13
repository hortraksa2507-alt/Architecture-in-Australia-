import { Link, Navigate, useParams } from 'react-router-dom'
import { getLibraryTopic } from '../data/content'
import { BookmarkButton } from '../components/BookmarkButton'
import { NotesPanel } from '../components/NotesPanel'

export function LibraryTopic() {
  const { topicId } = useParams()
  const topic = topicId ? getLibraryTopic(topicId) : undefined
  if (!topic) return <Navigate to="/library" replace />

  return (
    <div className="page wrap narrow">
      <nav className="crumbs">
        <Link to="/library">Library</Link>
        <span>/</span>
        <span>{topic.category}</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">{topic.category}</span>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <BookmarkButton id={topic.id} />
          <span className="pill">{topic.readMins} min read</span>
        </div>
      </header>

      <div className="article-body">
        {topic.sections.map((section) => (
          <section key={section.heading} className="article-section">
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        <section className="article-section">
          <h2>Key points</h2>
          <ul className="bullet-list">
            {topic.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="article-section">
          <h2>Resources</h2>
          <ul className="resource-list">
            {topic.resources.map((r) => (
              <li key={r.label}>
                <strong>{r.label}</strong>
                <span>{r.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <NotesPanel
        refType="library"
        refId={topic.id}
        placeholder="Capture studio applications, questions for tutors, or site observations…"
      />

      <div className="pager-nav">
        <Link className="btn btn-outline" to="/library">
          All topics
        </Link>
        <Link className="btn btn-ghost" to="/courses">
          Related courses
        </Link>
      </div>
    </div>
  )
}
