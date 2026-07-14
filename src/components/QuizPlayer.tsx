import { useState } from 'react'
import type { QuizQuestion } from '../data/labs'
import { useArchiva } from '../context/ArchivaContext'

export function QuizPlayer({
  quizId,
  questions,
  title,
}: {
  quizId: string
  questions: QuizQuestion[]
  title: string
}) {
  const { isStepDone, toggleStep } = useArchiva()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[index]
  const passId = `quiz-${quizId}-passed`
  const passed = isStepDone(passId)
  const pct = Math.round((score / Math.max(questions.length, 1)) * 100)

  function lockIn() {
    if (selected === null || revealed) return
    const correct = selected === q.answer
    if (correct) setScore((s) => s + 1)
    setRevealed(true)
  }

  function goNext(currentScore: number) {
    if (index >= questions.length - 1) {
      const finalPct = currentScore / questions.length
      if (finalPct >= 0.67 && !isStepDone(passId)) toggleStep(passId)
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setRevealed(false)
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const ok = score / questions.length >= 0.67
    return (
      <div className="quiz-card">
        <span className="eyebrow">Quiz result</span>
        <h3>{title}</h3>
        <p className="quiz-score">
          {score}/{questions.length} correct · {pct}%
        </p>
        <p>{ok ? 'Passed — solid working knowledge.' : 'Keep practising—revisit the material and retry.'}</p>
        {passed ? <span className="pill soft">Pass saved in workspace</span> : null}
        <div className="notes-actions">
          <button type="button" className="btn btn-outline" onClick={restart}>
            Retry quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-card">
      <div className="quiz-top">
        <span className="eyebrow">
          {title} · {index + 1}/{questions.length}
        </span>
        <span className="pill">{score} correct</span>
      </div>
      <h3>{q.prompt}</h3>
      <div className="quiz-choices">
        {q.choices.map((choice, i) => {
          let cls = 'quiz-choice'
          if (revealed && i === q.answer) cls += ' correct'
          if (revealed && selected === i && i !== q.answer) cls += ' wrong'
          if (!revealed && selected === i) cls += ' selected'
          return (
            <button
              key={choice}
              type="button"
              className={cls}
              onClick={() => !revealed && setSelected(i)}
              disabled={revealed}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {choice}
            </button>
          )
        })}
      </div>
      {revealed ? <p className="quiz-explain">{q.explain}</p> : null}
      <div className="notes-actions">
        {!revealed ? (
          <button type="button" className="btn btn-ghost" disabled={selected === null} onClick={lockIn}>
            Check answer
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              const nextScore = score
              goNext(nextScore)
            }}
          >
            {index >= questions.length - 1 ? 'See results' : 'Next question'}
          </button>
        )}
      </div>
    </div>
  )
}
