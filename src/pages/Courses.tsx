import { Link } from 'react-router-dom'
import { courses } from '../data/content'

export function Courses() {
  return (
    <div className="page wrap">
      <header className="page-hero">
        <span className="eyebrow">Courses</span>
        <h1>Guided pathways through architecture education</h1>
        <p>
          Structured tracks from foundation design through advanced studio,
          digital craft, registration readiness, and practice literacy.
        </p>
      </header>

      <div className="course-stack">
        {courses.map((course) => (
          <article className="course" key={course.id}>
            <div className="course-level">{course.level}</div>
            <div>
              <h3>{course.title}</h3>
              <p>{course.summary}</p>
              <div className="course-meta">
                <span>{course.duration}</span>
                <span>{course.focus}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="split-two">
          <div className="panel">
            <h2>Pair courses with software</h2>
            <p>
              Every studio path is stronger with tool fluency. Use the Digital
              craft track alongside Revit, Rhino, and visualisation modules.
            </p>
            <Link className="btn btn-outline" to="/software">
              Open software studio
            </Link>
          </div>
          <div className="panel">
            <h2>Pair courses with practice</h2>
            <p>
              Graduates should stack registration literacy early—competencies,
              logbooks, and ethics alongside advanced design work.
            </p>
            <Link className="btn btn-outline" to="/practice">
              See practice path
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
