import { Link, Navigate, useParams } from 'react-router-dom'
import { getCourse } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'
import { BookmarkButton } from '../components/BookmarkButton'
import { NotesPanel } from '../components/NotesPanel'

export function CourseDetail() {
  const { courseId } = useParams()
  const course = courseId ? getCourse(courseId) : undefined
  const { isLessonDone } = useArchiva()
  if (!course) return <Navigate to="/courses" replace />

  const done = course.lessons.filter((l) => isLessonDone(l.id)).length

  return (
    <div className="page wrap">
      <nav className="crumbs">
        <Link to="/courses">Courses</Link>
        <span>/</span>
        <span>{course.title}</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">{course.level}</span>
        <h1>{course.title}</h1>
        <p>{course.summary}</p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <BookmarkButton id={course.id} />
          <span className="pill">{course.focus}</span>
        </div>
        <div className="inline-progress">
          <ProgressBar value={done} max={course.lessons.length} label="Course progress" />
        </div>
      </header>

      <section className="panel solid outcomes">
        <h2>Outcomes</h2>
        <ul className="bullet-list">
          {course.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <div className="lesson-list">
        {course.lessons.map((lesson, i) => {
          const complete = isLessonDone(lesson.id)
          return (
            <Link
              key={lesson.id}
              to={`/courses/${course.id}/${lesson.id}`}
              className={`lesson-row${complete ? ' done' : ''}`}
            >
              <span className="lesson-idx">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.summary}</p>
              </div>
              <div className="lesson-side">
                <span>{lesson.duration}</span>
                <span className="status-dot">{complete ? 'Done' : 'Start'}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <NotesPanel refType="course" refId={course.id} placeholder="Course goals, tutor feedback, weekly plan…" />
    </div>
  )
}
