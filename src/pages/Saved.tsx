import { Link } from 'react-router-dom'
import { useArchiva } from '../context/ArchivaContext'
import { getCourse, getLibraryTopic, getSoftware } from '../data/content'
import { getBook } from '../data/books'

export function Saved() {
  const { state } = useArchiva()

  const items = state.bookmarks
    .map((id) => {
      const topic = getLibraryTopic(id)
      if (topic)
        return { id, title: topic.title, blurb: topic.summary, to: `/library/${id}`, type: 'Library' }
      const course = getCourse(id)
      if (course)
        return { id, title: course.title, blurb: course.summary, to: `/courses/${id}`, type: 'Course' }
      const soft = getSoftware(id)
      if (soft)
        return { id, title: soft.name, blurb: soft.summary, to: `/software/${id}`, type: 'Software' }
      const book = getBook(id)
      if (book) return { id, title: book.title, blurb: book.blurb, to: `/books/${id}`, type: 'Book' }
      return null
    })
    .filter(Boolean) as { id: string; title: string; blurb: string; to: string; type: string }[]

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Saved</span>
        <h1>Bookmarks</h1>
        <p>Everything you star across library, courses, software, and books.</p>
      </header>

      {items.length === 0 ? (
        <p className="empty-state">No bookmarks yet. Open a topic, course, or book and tap Save.</p>
      ) : (
        <div className="content-grid">
          {items.map((item) => (
            <article className="topic linkish" key={item.id}>
              <span className="label">{item.type}</span>
              <h3>
                <Link to={item.to}>{item.title}</Link>
              </h3>
              <p>{item.blurb}</p>
              <div className="topic-foot">
                <Link to={item.to}>Open →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
