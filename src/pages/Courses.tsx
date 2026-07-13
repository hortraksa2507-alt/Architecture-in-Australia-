import { Link } from 'react-router-dom'
import { courses } from '../data/content'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

export function Courses() {
  const { isLessonDone } = useArchiva()

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Courses</span>
        <h1>Guided pathways through architecture education</h1>
        <p>
          Open a course, complete lessons, tick checklists, and keep notes. Progress saves on this
          device.
        </p>
      </header>

      <div className="course-stack">
        {courses.map((course) => {
          const done = course.lessons.filter((l) => isLessonDone(l.id)).length
          return (
            <article className="course" key={course.id}>
              <div className="course-level">{course.level}</div>
              <div>
                <h3>
                  <Link to={`/courses/${course.id}`}>{course.title}</Link>
                </h3>
                <p>{course.summary}</p>
                <div className="course-meta">
                  <span>{course.duration}</span>
                  <span>{course.focus}</span>
                  <span>
                    {done}/{course.lessons.length} lessons
                  </span>
                </div>
                <ProgressBar value={done} max={course.lessons.length} label={`${course.title} progress`} />
                <div className="row-actions">
                  <Link className="btn btn-ghost" to={`/courses/${course.id}`}>
                    Open course
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
