import { useArchiva } from '../context/ArchivaContext'

export function BookmarkButton({ id, label }: { id: string; label?: string }) {
  const { isBookmarked, toggleBookmark } = useArchiva()
  const on = isBookmarked(id)
  return (
    <button
      type="button"
      className={`bookmark-btn${on ? ' on' : ''}`}
      onClick={() => toggleBookmark(id)}
      aria-pressed={on}
    >
      <span aria-hidden="true">{on ? '★' : '☆'}</span>
      {label ?? (on ? 'Saved' : 'Save')}
    </button>
  )
}
