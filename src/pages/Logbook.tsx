import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { competencies } from '../data/content'
import { useArchiva, type LogEntry } from '../context/ArchivaContext'

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  title: '',
  competency: competencies[0],
  hours: 1,
  reflection: '',
}

export function Logbook() {
  const { state, addLogEntry, updateLogEntry, deleteLogEntry } = useArchiva()
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<string | null>(null)
  const [filter, setFilter] = useState('All')

  const totalHours = useMemo(
    () => state.logbook.reduce((sum, e) => sum + (Number(e.hours) || 0), 0),
    [state.logbook],
  )

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? state.logbook
        : state.logbook.filter((e) => e.competency === filter),
    [state.logbook, filter],
  )

  const byCompetency = useMemo(() => {
    const map = new Map<string, number>()
    for (const c of competencies) map.set(c, 0)
    for (const e of state.logbook) {
      map.set(e.competency, (map.get(e.competency) ?? 0) + (Number(e.hours) || 0))
    }
    return [...map.entries()].filter(([, h]) => h > 0)
  }, [state.logbook])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.reflection.trim()) return
    if (editing) {
      updateLogEntry(editing, { ...form, hours: Number(form.hours) || 0 })
      setEditing(null)
    } else {
      addLogEntry({ ...form, hours: Number(form.hours) || 0 })
    }
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) })
  }

  function startEdit(entry: LogEntry) {
    setEditing(entry.id)
    setForm({
      date: entry.date,
      title: entry.title,
      competency: entry.competency,
      hours: entry.hours,
      reflection: entry.reflection,
    })
  }

  return (
    <div className="page wrap">
      <nav className="crumbs">
        <Link to="/practice">Practice</Link>
        <span>/</span>
        <span>Logbook</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">Practice tool</span>
        <h1>Competency logbook</h1>
        <p>
          Record supervised experience with competency tags. Export by screenshot or keep weekly
          evidence here—{totalHours.toFixed(1)} hours logged locally.
        </p>
      </header>

      <div className="split-two dash-split">
        <form className="panel solid form-panel" onSubmit={onSubmit}>
          <h2>{editing ? 'Edit entry' : 'New entry'}</h2>
          <div className="form-grid">
            <label>
              Date
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                required
              />
            </label>
            <label>
              Hours
              <input
                type="number"
                min={0.25}
                step={0.25}
                value={form.hours}
                onChange={(e) => setForm((f) => ({ ...f, hours: Number(e.target.value) }))}
                required
              />
            </label>
            <label className="full">
              Title
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Coordinated window schedule for Alterations DA"
                required
              />
            </label>
            <label className="full">
              Competency
              <select
                value={form.competency}
                onChange={(e) => setForm((f) => ({ ...f, competency: e.target.value }))}
              >
                {competencies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="full">
              Reflection (role, decision, outcome)
              <textarea
                rows={5}
                value={form.reflection}
                onChange={(e) => setForm((f) => ({ ...f, reflection: e.target.value }))}
                placeholder="What did you decide, why, and what changed?"
                required
              />
            </label>
          </div>
          <div className="notes-actions">
            <button type="submit" className="btn btn-ghost">
              {editing ? 'Update entry' : 'Add entry'}
            </button>
            {editing ? (
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setEditing(null)
                  setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) })
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <section className="panel solid">
          <h2>Hours by competency</h2>
          {byCompetency.length === 0 ? (
            <p className="muted">Add entries to see your coverage map.</p>
          ) : (
            <ul className="comp-bars">
              {byCompetency.map(([name, hours]) => (
                <li key={name}>
                  <div className="fee-stage-top">
                    <span>{name}</span>
                    <span>{hours.toFixed(1)}h</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min(100, (hours / Math.max(totalHours, 1)) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="filter-bar" role="group" aria-label="Filter logbook">
        <button
          type="button"
          className={filter === 'All' ? 'active' : undefined}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        {competencies.map((c) => (
          <button
            key={c}
            type="button"
            className={filter === c ? 'active' : undefined}
            onClick={() => setFilter(c)}
          >
            {c.split(': ').pop()}
          </button>
        ))}
      </div>

      <div className="log-list">
        {filtered.length === 0 ? (
          <p className="empty-state">No log entries yet. Capture your first evidence above.</p>
        ) : (
          filtered.map((entry) => (
            <article className="log-card" key={entry.id}>
              <div className="log-top">
                <div>
                  <span className="pill">{entry.date}</span>
                  <span className="pill">{entry.hours}h</span>
                  <span className="pill soft">{entry.competency}</span>
                </div>
                <div className="log-actions">
                  <button type="button" onClick={() => startEdit(entry)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteLogEntry(entry.id)}>
                    Delete
                  </button>
                </div>
              </div>
              <h3>{entry.title}</h3>
              <p>{entry.reflection}</p>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
