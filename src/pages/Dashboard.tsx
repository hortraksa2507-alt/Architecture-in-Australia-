import { Link } from 'react-router-dom'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'
import { SearchPanel } from '../components/SearchPanel'
import {
  allLessons,
  allSoftwareSteps,
  courses,
  getCourse,
  getLibraryTopic,
  getSoftware,
  libraryTopics,
  softwareTools,
} from '../data/content'

export function Dashboard() {
  const { state, resetProgress } = useArchiva()
  const lessons = allLessons()
  const steps = allSoftwareSteps()
  const lessonDone = state.completedLessons.length
  const stepDone = state.completedSteps.length
  const hours = state.logbook.reduce((sum, e) => sum + (Number(e.hours) || 0), 0)

  const continueCourse = courses.find((c) =>
    c.lessons.some((l) => !state.completedLessons.includes(l.id)),
  )
  const nextLesson = continueCourse?.lessons.find(
    (l) => !state.completedLessons.includes(l.id),
  )

  const recentNotes = [...state.notes]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 4)

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Workspace</span>
        <h1>Your Archiva dashboard</h1>
        <p>
          Track courses, software drills, bookmarks, practice hours, and notes—saved on this
          device so you can work every day.
        </p>
      </header>

      <div className="dash-stats">
        <div className="stat">
          <span className="stat-label">Lessons done</span>
          <strong>
            {lessonDone}/{lessons.length}
          </strong>
          <ProgressBar value={lessonDone} max={lessons.length} label="Course lessons" />
        </div>
        <div className="stat">
          <span className="stat-label">Software steps</span>
          <strong>
            {stepDone}/{steps.length}
          </strong>
          <ProgressBar value={stepDone} max={steps.length} label="Software steps" />
        </div>
        <div className="stat">
          <span className="stat-label">Logbook hours</span>
          <strong>{hours.toFixed(1)}h</strong>
          <Link className="stat-link" to="/practice/logbook">
            Open logbook →
          </Link>
        </div>
        <div className="stat">
          <span className="stat-label">Saved items</span>
          <strong>{state.bookmarks.length}</strong>
          <Link className="stat-link" to="/saved">
            View saved →
          </Link>
        </div>
      </div>

      <div className="split-two dash-split">
        <section className="panel solid">
          <h2>Continue learning</h2>
          {nextLesson && continueCourse ? (
            <>
              <p className="muted">
                {continueCourse.title} · {nextLesson.duration}
              </p>
              <h3 className="continue-title">{nextLesson.title}</h3>
              <p>{nextLesson.summary}</p>
              <Link className="btn btn-ghost" to={`/courses/${continueCourse.id}/${nextLesson.id}`}>
                Resume lesson
              </Link>
            </>
          ) : (
            <p>All current course lessons are complete. Browse courses to go deeper.</p>
          )}
        </section>

        <section className="panel solid">
          <h2>Quick search</h2>
          <SearchPanel compact />
        </section>
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <span className="eyebrow">Shortcuts</span>
          <h2>Productive tools</h2>
        </div>
        <div className="hub-grid">
          <Link to="/courses" className="hub-item">
            <span className="hub-meta">Learn</span>
            <h3>Courses</h3>
            <p>{courses.length} pathways with interactive lessons and checklists.</p>
            <span className="hub-arrow">→</span>
          </Link>
          <Link to="/software" className="hub-item">
            <span className="hub-meta">Tools</span>
            <h3>Software studio</h3>
            <p>{softwareTools.length} tracks with step completion and tips.</p>
            <span className="hub-arrow">→</span>
          </Link>
          <Link to="/practice/logbook" className="hub-item">
            <span className="hub-meta">Practice</span>
            <h3>Competency logbook</h3>
            <p>Log hours against NSCA-aligned competency tags.</p>
            <span className="hub-arrow">→</span>
          </Link>
          <Link to="/business/tools" className="hub-item">
            <span className="hub-meta">Business</span>
            <h3>Fee & contracts tools</h3>
            <p>Estimate staged fees and audit client agreements.</p>
            <span className="hub-arrow">→</span>
          </Link>
          <Link to="/library" className="hub-item">
            <span className="hub-meta">Library</span>
            <h3>{libraryTopics.length} deep topics</h3>
            <p>Read full articles, bookmark, and keep notes.</p>
            <span className="hub-arrow">→</span>
          </Link>
          <Link to="/studio" className="hub-item">
            <span className="hub-meta">You</span>
            <h3>Studio checklists</h3>
            <p>Portfolio, critique, networks, and pace trackers.</p>
            <span className="hub-arrow">→</span>
          </Link>
        </div>
      </section>

      {(state.bookmarks.length > 0 || recentNotes.length > 0) && (
        <section className="section">
          <div className="split-two">
            <div>
              <h2 className="subhead">Bookmarks</h2>
              <ul className="simple-list">
                {state.bookmarks.slice(0, 6).map((id) => {
                  const topic = getLibraryTopic(id)
                  const course = getCourse(id)
                  const soft = getSoftware(id)
                  const title = topic?.title ?? course?.title ?? soft?.name ?? id
                  const to = topic
                    ? `/library/${id}`
                    : course
                      ? `/courses/${id}`
                      : soft
                        ? `/software/${id}`
                        : '/saved'
                  return (
                    <li key={id}>
                      <Link to={to}>{title}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h2 className="subhead">Recent notes</h2>
              {recentNotes.length === 0 ? (
                <p className="muted">Notes you save on lessons and articles appear here.</p>
              ) : (
                <ul className="simple-list">
                  {recentNotes.map((n) => (
                    <li key={n.id}>
                      <span className="hit-type">{n.refType}</span> {n.body.slice(0, 90)}
                      {n.body.length > 90 ? '…' : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="danger-row">
        <button type="button" className="btn btn-outline" onClick={() => {
          if (confirm('Reset all local progress, notes, logbook, and bookmarks?')) resetProgress()
        }}>
          Reset local data
        </button>
      </div>
    </div>
  )
}
