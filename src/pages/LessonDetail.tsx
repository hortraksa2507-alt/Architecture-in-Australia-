import { Link, Navigate, useParams } from 'react-router-dom'
import { getCourse } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { CheckRow } from '../components/CheckRow'
import { NotesPanel } from '../components/NotesPanel'
import { QuizPlayer } from '../components/QuizPlayer'
import { quizzes } from '../data/labs'

export function LessonDetail() {
  const { courseId, lessonId } = useParams()
  const course = courseId ? getCourse(courseId) : undefined
  const lesson = course?.lessons.find((l) => l.id === lessonId)
  const { isLessonDone, toggleLesson, isStepDone, toggleStep } = useArchiva()

  if (!course || !lesson) return <Navigate to="/courses" replace />

  const idx = course.lessons.findIndex((l) => l.id === lesson.id)
  const prev = course.lessons[idx - 1]
  const next = course.lessons[idx + 1]
  const done = isLessonDone(lesson.id)
  const checksDone = lesson.checklist.every((_, i) => isStepDone(`${lesson.id}-c${i}`))

  return (
    <div className="page wrap narrow">
      <nav className="crumbs">
        <Link to="/courses">Courses</Link>
        <span>/</span>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
        <span>/</span>
        <span>Lesson {idx + 1}</span>
      </nav>

      <header className="page-hero">
        <span className="eyebrow">{lesson.duration}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
      </header>

      <div className="article-body">
        {lesson.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>

      <section className="panel solid">
        <h2>Lesson checklist</h2>
        <div className="check-stack">
          {lesson.checklist.map((item, i) => {
            const id = `${lesson.id}-c${i}`
            return (
              <CheckRow
                key={id}
                id={id}
                label={item}
                checked={isStepDone(id)}
                onToggle={toggleStep}
              />
            )
          })}
        </div>
      </section>

      <div className="complete-bar">
        <div>
          <h3>{done ? 'Lesson marked complete' : 'Mark lesson complete'}</h3>
          <p className="muted">
            {checksDone
              ? 'Checklist finished—ready to complete.'
              : 'You can complete anytime; checklist helps keep craft honest.'}
          </p>
        </div>
        <button
          type="button"
          className={`btn ${done ? 'btn-outline' : 'btn-ghost'}`}
          onClick={() => toggleLesson(lesson.id)}
        >
          {done ? 'Undo complete' : 'Complete lesson'}
        </button>
      </div>

      <NotesPanel refType="course" refId={lesson.id} placeholder="What clicked? What to ask in studio?" />

      {(course.id === 'building' || course.id === 'foundations') && (
        <div style={{ marginTop: '1.5rem' }}>
          <QuizPlayer quizId="climate-design" title="Climate check" questions={quizzes['climate-design']} />
        </div>
      )}
      {(course.id === 'digital' || course.id === 'practice-biz') && (
        <div style={{ marginTop: '1.5rem' }}>
          <QuizPlayer quizId="practice-docs" title="Docs check" questions={quizzes['practice-docs']} />
        </div>
      )}

      <div className="pager-nav">
        {prev ? (
          <Link className="btn btn-outline" to={`/courses/${course.id}/${prev.id}`}>
            ← {prev.title}
          </Link>
        ) : (
          <Link className="btn btn-outline" to={`/courses/${course.id}`}>
            Course overview
          </Link>
        )}
        {next ? (
          <Link className="btn btn-ghost" to={`/courses/${course.id}/${next.id}`}>
            {next.title} →
          </Link>
        ) : (
          <Link className="btn btn-ghost" to={`/courses/${course.id}`}>
            Back to course
          </Link>
        )}
      </div>
    </div>
  )
}
