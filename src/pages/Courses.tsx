import { Link } from 'react-router-dom'
import { courses } from '../data/content'
import { realWorldProjects } from '../data/books'
import { quizzes } from '../data/labs'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from '../components/ProgressBar'
import { QuizPlayer } from '../components/QuizPlayer'
import { CertificateRack } from '../components/CertificateRack'

export function Courses() {
  const { isLessonDone } = useArchiva()

  return (
    <div className="page wrap wide">
      <header className="page-hero">
        <span className="eyebrow">Courses &amp; studios</span>
        <h1>Learn, test, then make real work</h1>
        <p>
          Interactive courses, knowledge quizzes, certificates, and brief-driven projects that look
          like practice—not busywork.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/projects">
            Real-world projects
          </Link>
          <Link className="btn btn-outline" to="/software">
            Software trainers
          </Link>
          <Link className="btn btn-outline" to="/explore">
            3D campus
          </Link>
        </div>
      </header>

      <section className="hub-feature-row">
        {realWorldProjects.map((p) => (
          <Link key={p.id} to={`/projects#${p.id}`} className="hub-feature">
            <span className="hub-meta">{p.level}</span>
            <h3>{p.title}</h3>
            <p>{p.outcome}</p>
          </Link>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Credentials</span>
          <h2>Your earned certificates</h2>
        </div>
        <CertificateRack />
      </section>

      <div className="section-head">
        <span className="eyebrow">Learning paths</span>
        <h2>Courses with interactive lessons</h2>
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

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <span className="eyebrow">Stress-test knowledge</span>
          <h2>Course quizzes</h2>
        </div>
        <div className="quiz-grid">
          <QuizPlayer quizId="climate-design" title="Climate design" questions={quizzes['climate-design']} />
          <QuizPlayer quizId="practice-docs" title="Documentation practice" questions={quizzes['practice-docs']} />
        </div>
      </section>
    </div>
  )
}
