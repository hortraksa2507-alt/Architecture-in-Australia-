import { SearchPanel } from '../components/SearchPanel'

export function SearchPage() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Search</span>
        <h1>Find anything in Archiva</h1>
        <p>Library articles, courses, lessons, and software tracks in one place.</p>
      </header>
      <SearchPanel autofocus />
    </div>
  )
}
