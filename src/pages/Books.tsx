import { Link } from 'react-router-dom'
import { learningBooks } from '../data/books'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

export function Books() {
  const { isLessonDone } = useArchiva()

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Learning books</span>
        <h1>Field guides you can work through</h1>
        <p>
          Chapter-based books with exercises for Revit, visualisation craft, portfolio packaging,
          and documenting Australian houses—built for studio and practice.
        </p>
      </header>

      <div className="book-grid">
        {learningBooks.map((book) => {
          const done = book.chapters.filter((c) =>
            isLessonDone(`book-${book.id}-${c.id}`),
          ).length
          return (
            <Link to={`/books/${book.id}`} className="book-cover" key={book.id}>
              <div className="book-cover-bar" style={{ background: book.coverAccent }} />
              <span className="hub-meta">{book.category}</span>
              <h2>{book.title}</h2>
              <p>{book.blurb}</p>
              <div className="book-cover-meta">
                <span>{book.audience}</span>
                <span>{book.chapters.length} chapters</span>
              </div>
              <ProgressBar value={done} max={book.chapters.length} label={`${book.title} progress`} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
