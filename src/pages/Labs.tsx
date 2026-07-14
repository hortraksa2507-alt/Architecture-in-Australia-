import { Link } from 'react-router-dom'
import { WallAssemblyBuilder } from '../components/WallAssemblyBuilder'
import { FeeEstimator } from '../components/FeeEstimator'
import { QuizPlayer } from '../components/QuizPlayer'
import { quizzes } from '../data/labs'
import { SoftwareSimulator } from '../components/SoftwareSimulator'
import { useState } from 'react'

export function Labs() {
  const [sim, setSim] = useState<'revit' | 'rhino'>('revit')

  return (
    <div className="page wrap wide">
      <header className="page-hero">
        <span className="eyebrow">Interactive labs</span>
        <h1>Tools that make studio work stronger</h1>
        <p>
          Wall assemblies, fee logic, software trainers, and climate quizzes—practice judgement with
          your hands, not just your eyes.
        </p>
        <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
          <Link className="btn btn-ghost" to="/viz">
            Open viz lab
          </Link>
          <Link className="btn btn-outline" to="/projects">
            Real projects
          </Link>
        </div>
      </header>

      <WallAssemblyBuilder />

      <section className="section">
        <div className="filter-bar">
          <button type="button" className={sim === 'revit' ? 'active' : undefined} onClick={() => setSim('revit')}>
            Revit simulator
          </button>
          <button type="button" className={sim === 'rhino' ? 'active' : undefined} onClick={() => setSim('rhino')}>
            Rhino simulator
          </button>
        </div>
        <SoftwareSimulator trackId={sim} />
      </section>

      <section className="section">
        <FeeEstimator />
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <span className="eyebrow">Check understanding</span>
          <h2>Labs quizzes</h2>
        </div>
        <div className="quiz-grid">
          <QuizPlayer quizId="climate-design" title="Climate design" questions={quizzes['climate-design']} />
          <QuizPlayer quizId="practice-docs" title="Documentation practice" questions={quizzes['practice-docs']} />
        </div>
      </section>
    </div>
  )
}
