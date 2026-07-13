import { Link } from 'react-router-dom'
import { courses } from '../data/content'
import { realWorldProjects } from '../data/books'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'

export function Courses() {
  const { isLessonDone } = useArchiva()

  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Courses &amp; real studios</span>
        <h1>Guided pathways that end in real work</h1>
        <p>
          Structured lessons plus world-style project briefs—housing, documentation sprints, and
          visualisation packages you can put in a portfolio.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/projects">
            Real-world projects
          </Link>
          <Link className="btn btn-outline" to="/books">
            Learning books
          </Link>
          <Link className="btn btn-outline" to="/explore">
            3D campus
          </Link>
        </div>
      </header>

      <section className="hub-feature-row">
        {realWorldProjects.slice(0, 4).map((p) => (
          <Link key={p.id} to={`/projects#${p.id}`} className="hub-feature">
            <span className="hub-meta">{p.level}</span>
            <h3>{p.title}</h3>
            <p>{p.outcome}</p>
          </Link>
        ))}
      </section>

      <div className="section-head" style={{ marginTop: '2.75rem' }}>
        <span className="eyebrow">Learning paths</span>
        <h2>Courses with interactive lessons</h2>
        <p>Complete lessons, tick field checklists, and keep notes as you go.</p>
      </div>

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
