import { useMemo } from 'react'
import { useArchiva } from '../context/ArchivaContext'
import { allLessons, allSoftwareSteps, courses } from '../data/content'
import { learningBooks } from '../data/books'
import { softwareCurricula } from '../data/labs'

export function CertificateRack() {
  const { state, isStepDone, isLessonDone } = useArchiva()

  const certificates = useMemo(() => {
    const list: { id: string; title: string; detail: string }[] = []

    for (const course of courses) {
      const done = course.lessons.every((l) => isLessonDone(l.id))
      if (done && course.lessons.length > 0) {
        list.push({
          id: `cert-course-${course.id}`,
          title: course.title,
          detail: `${course.lessons.length} lessons complete`,
        })
      }
    }

    for (const book of learningBooks) {
      const done = book.chapters.every((c) => isLessonDone(`book-${book.id}-${c.id}`))
      if (done) {
        list.push({
          id: `cert-book-${book.id}`,
          title: book.title,
          detail: 'All chapters complete',
        })
      }
    }

    for (const [key, curr] of Object.entries(softwareCurricula)) {
      const done = curr.weeks.every((w) => isStepDone(`week-${key}-${w.week}`))
      if (done) {
        list.push({
          id: `cert-curr-${key}`,
          title: curr.title,
          detail: `${curr.weeks.length}-week path complete`,
        })
      }
    }

    if (isStepDone('quiz-revit-basics-passed')) {
      list.push({ id: 'cert-quiz-revit', title: 'Revit basics quiz', detail: 'Passed ≥67%' })
    }
    if (isStepDone('quiz-viz-craft-passed')) {
      list.push({ id: 'cert-quiz-viz', title: 'Visualisation craft quiz', detail: 'Passed ≥67%' })
    }

    const lessonPct = state.completedLessons.length / Math.max(allLessons().length, 1)
    const stepPct = state.completedSteps.length / Math.max(allSoftwareSteps().length, 1)
    if (lessonPct > 0.5 && stepPct > 0.35) {
      list.push({
        id: 'cert-momentum',
        title: 'Archiva momentum',
        detail: 'Crossed halfway on lessons and software steps',
      })
    }

    return list
  }, [state, isStepDone, isLessonDone])

  if (certificates.length === 0) {
    return (
      <div className="cert-empty">
        <h3>Certificates unlock as you finish paths</h3>
        <p className="muted">Complete a course, book, curriculum week-set, or pass a quiz to earn one.</p>
      </div>
    )
  }

  return (
    <div className="cert-grid">
      {certificates.map((c) => (
        <article key={c.id} className="cert-card">
          <span className="eyebrow">Archiva credential</span>
          <h3>{c.title}</h3>
          <p>{c.detail}</p>
          <span className="cert-seal">AU · Practice Ready</span>
        </article>
      ))}
    </div>
  )
}
