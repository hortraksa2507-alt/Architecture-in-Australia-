import { Link, Navigate, useParams } from 'react-router-dom'
import { getBook } from '../data/books'
import { BookReader } from '../components/BookReader'
import { BookmarkButton } from '../components/BookmarkButton'

export function BookDetail() {
  const { bookId } = useParams()
  const book = bookId ? getBook(bookId) : undefined
  if (!book) return <Navigate to="/books" replace />

  return (
    <div className="page wrap wide">
      <nav className="crumbs">
        <Link to="/books">Books</Link>
        <span>/</span>
        <span>{book.category}</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">{book.category} · {book.audience}</span>
        <h1>{book.title}</h1>
        <p>{book.subtitle}. {book.blurb}</p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <BookmarkButton id={book.id} />
          <Link className="btn btn-outline" to="/viz">
            Open visualisation lab
          </Link>
        </div>
      </header>

      <BookReader book={book} />
    </div>
  )
}
