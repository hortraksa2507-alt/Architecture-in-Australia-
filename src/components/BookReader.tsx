import { useMemo, useState } from 'react'
import type { LearningBook } from '../data/books'
import { useArchiva } from '../context/ArchivaContext'
import { ProgressBar } from './ProgressBar'
import { CheckRow } from './CheckRow'

export function BookReader({ book }: { book: LearningBook }) {
  const [chapterIdx, setChapterIdx] = useState(0)
  const [pageIdx, setPageIdx] = useState(0)
  const { isStepDone, toggleStep, isLessonDone, toggleLesson } = useArchiva()

  const chapter = book.chapters[chapterIdx]
  const page = chapter.pages[pageIdx]
  const chapterDoneId = `book-${book.id}-${chapter.id}`

  const completedChapters = useMemo(
    () => book.chapters.filter((c) => isLessonDone(`book-${book.id}-${c.id}`)).length,
    [book, isLessonDone],
  )

  function goChapter(next: number) {
    setChapterIdx(next)
    setPageIdx(0)
  }

  return (
    <div className="book-reader">
      <aside className="book-toc">
        <div className="book-toc-head">
          <span className="eyebrow">{book.category}</span>
          <h2>{book.title}</h2>
          <ProgressBar
            value={completedChapters}
            max={book.chapters.length}
            label="Chapters complete"
          />
        </div>
        <ol>
          {book.chapters.map((ch, i) => {
            const done = isLessonDone(`book-${book.id}-${ch.id}`)
            return (
              <li key={ch.id}>
                <button
                  type="button"
                  className={i === chapterIdx ? 'active' : undefined}
                  onClick={() => goChapter(i)}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    {ch.title}
                    {done ? ' · Done' : ''}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </aside>

      <div className="book-stage">
        <div className="book-spread" style={{ ['--book-accent' as string]: book.coverAccent }}>
          <div className="book-spine" aria-hidden="true" />
          <article className="book-page">
            <header>
              <span className="eyebrow">
                Chapter {chapterIdx + 1} · Page {pageIdx + 1}/{chapter.pages.length} · {chapter.minutes}{' '}
                min
              </span>
              <h1>{page.heading}</h1>
            </header>
            {page.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {page.callout ? <blockquote className="book-callout">{page.callout}</blockquote> : null}

            <div className="book-pager">
              <button
                type="button"
                className="btn btn-outline"
                disabled={pageIdx === 0}
                onClick={() => setPageIdx((v) => Math.max(0, v - 1))}
              >
                Previous page
              </button>
              {pageIdx < chapter.pages.length - 1 ? (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setPageIdx((v) => v + 1)}
                >
                  Next page
                </button>
              ) : (
                <button
                  type="button"
                  className={`btn ${isLessonDone(chapterDoneId) ? 'btn-outline' : 'btn-ghost'}`}
                  onClick={() => toggleLesson(chapterDoneId)}
                >
                  {isLessonDone(chapterDoneId) ? 'Chapter complete ✓' : 'Mark chapter complete'}
                </button>
              )}
            </div>
          </article>
        </div>

        {chapter.exercise ? (
          <section className="panel solid book-exercise">
            <h2>Field exercise · {chapter.exercise.title}</h2>
            <div className="check-stack">
              {chapter.exercise.steps.map((step, i) => {
                const id = `${chapterDoneId}-ex-${i}`
                return (
                  <CheckRow
                    key={id}
                    id={id}
                    label={step}
                    checked={isStepDone(id)}
                    onToggle={toggleStep}
                  />
                )
              })}
            </div>
          </section>
        ) : null}

        <div className="pager-nav">
          <button
            type="button"
            className="btn btn-outline"
            disabled={chapterIdx === 0}
            onClick={() => goChapter(chapterIdx - 1)}
          >
            ← Previous chapter
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={chapterIdx >= book.chapters.length - 1}
            onClick={() => goChapter(chapterIdx + 1)}
          >
            Next chapter →
          </button>
        </div>
      </div>
    </div>
  )
}
