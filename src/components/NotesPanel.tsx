import { useEffect, useState } from 'react'
import { useArchiva, type Note } from '../context/ArchivaContext'

export function NotesPanel({
  refType,
  refId,
  placeholder = 'Write a note for yourself…',
}: {
  refType: Note['refType']
  refId: string
  placeholder?: string
}) {
  const { getNote, upsertNote } = useArchiva()
  const existing = getNote(refType, refId)
  const [body, setBody] = useState(existing?.body ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setBody(existing?.body ?? '')
  }, [existing?.body, refId, refType])

  function save() {
    upsertNote(refType, refId, body)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1600)
  }

  return (
    <div className="notes-panel">
      <div className="notes-head">
        <h3>Your notes</h3>
        <span className="notes-status">{saved ? 'Saved' : 'Private · device only'}</span>
      </div>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder}
        rows={5}
      />
      <div className="notes-actions">
        <button type="button" className="btn btn-ghost" onClick={save}>
          Save note
        </button>
      </div>
    </div>
  )
}
