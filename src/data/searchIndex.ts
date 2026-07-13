import { learningBooks, realWorldProjects } from './books'
import { searchAll as searchCore, type SearchHit } from './content'

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase()
  const hits = searchCore(query)
  if (!q) return []

  for (const book of learningBooks) {
    const hay = `${book.title} ${book.subtitle} ${book.blurb} ${book.category}`.toLowerCase()
    if (hay.includes(q)) {
      hits.push({
        type: 'book',
        id: book.id,
        title: book.title,
        blurb: book.blurb,
        to: `/books/${book.id}`,
      })
    }
  }

  for (const project of realWorldProjects) {
    const hay = `${project.title} ${project.brief} ${project.outcome}`.toLowerCase()
    if (hay.includes(q)) {
      hits.push({
        type: 'project',
        id: project.id,
        title: project.title,
        blurb: project.brief,
        to: `/projects#${project.id}`,
      })
    }
  }

  return hits.slice(0, 40)
}

export type { SearchHit }
