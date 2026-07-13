import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { loadJSON, saveJSON, uid } from '../lib/storage'

export type LogEntry = {
  id: string
  date: string
  title: string
  competency: string
  hours: number
  reflection: string
}

export type Note = {
  id: string
  refType: 'library' | 'course' | 'software' | 'general'
  refId: string
  body: string
  updatedAt: string
}

export type ArchivaState = {
  completedLessons: string[]
  completedSteps: string[]
  bookmarks: string[]
  notes: Note[]
  logbook: LogEntry[]
  studioChecks: string[]
}

const defaultState: ArchivaState = {
  completedLessons: [],
  completedSteps: [],
  bookmarks: [],
  notes: [],
  logbook: [],
  studioChecks: [],
}

type Ctx = {
  state: ArchivaState
  toggleLesson: (id: string) => void
  toggleStep: (id: string) => void
  toggleBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
  isLessonDone: (id: string) => boolean
  isStepDone: (id: string) => boolean
  toggleStudioCheck: (id: string) => void
  isStudioChecked: (id: string) => boolean
  upsertNote: (refType: Note['refType'], refId: string, body: string) => void
  getNote: (refType: Note['refType'], refId: string) => Note | undefined
  addLogEntry: (entry: Omit<LogEntry, 'id'>) => void
  updateLogEntry: (id: string, patch: Partial<Omit<LogEntry, 'id'>>) => void
  deleteLogEntry: (id: string) => void
  resetProgress: () => void
}

const ArchivaContext = createContext<Ctx | null>(null)

export function ArchivaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ArchivaState>(() =>
    loadJSON<ArchivaState>('state', defaultState),
  )

  useEffect(() => {
    saveJSON('state', state)
  }, [state])

  const toggleIn = useCallback((key: keyof ArchivaState, id: string) => {
    setState((prev) => {
      const list = prev[key] as string[]
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
      return { ...prev, [key]: next }
    })
  }, [])

  const toggleLesson = useCallback((id: string) => toggleIn('completedLessons', id), [toggleIn])
  const toggleStep = useCallback((id: string) => toggleIn('completedSteps', id), [toggleIn])
  const toggleBookmark = useCallback((id: string) => toggleIn('bookmarks', id), [toggleIn])
  const toggleStudioCheck = useCallback((id: string) => toggleIn('studioChecks', id), [toggleIn])

  const isBookmarked = useCallback(
    (id: string) => state.bookmarks.includes(id),
    [state.bookmarks],
  )
  const isLessonDone = useCallback(
    (id: string) => state.completedLessons.includes(id),
    [state.completedLessons],
  )
  const isStepDone = useCallback(
    (id: string) => state.completedSteps.includes(id),
    [state.completedSteps],
  )
  const isStudioChecked = useCallback(
    (id: string) => state.studioChecks.includes(id),
    [state.studioChecks],
  )

  const upsertNote = useCallback((refType: Note['refType'], refId: string, body: string) => {
    setState((prev) => {
      const existing = prev.notes.find((n) => n.refType === refType && n.refId === refId)
      const updatedAt = new Date().toISOString()
      if (!body.trim()) {
        return {
          ...prev,
          notes: prev.notes.filter((n) => !(n.refType === refType && n.refId === refId)),
        }
      }
      if (existing) {
        return {
          ...prev,
          notes: prev.notes.map((n) =>
            n.id === existing.id ? { ...n, body, updatedAt } : n,
          ),
        }
      }
      return {
        ...prev,
        notes: [...prev.notes, { id: uid(), refType, refId, body, updatedAt }],
      }
    })
  }, [])

  const getNote = useCallback(
    (refType: Note['refType'], refId: string) =>
      state.notes.find((n) => n.refType === refType && n.refId === refId),
    [state.notes],
  )

  const addLogEntry = useCallback((entry: Omit<LogEntry, 'id'>) => {
    setState((prev) => ({
      ...prev,
      logbook: [{ ...entry, id: uid() }, ...prev.logbook],
    }))
  }, [])

  const updateLogEntry = useCallback((id: string, patch: Partial<Omit<LogEntry, 'id'>>) => {
    setState((prev) => ({
      ...prev,
      logbook: prev.logbook.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))
  }, [])

  const deleteLogEntry = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      logbook: prev.logbook.filter((e) => e.id !== id),
    }))
  }, [])

  const resetProgress = useCallback(() => setState(defaultState), [])

  const value = useMemo(
    () => ({
      state,
      toggleLesson,
      toggleStep,
      toggleBookmark,
      isBookmarked,
      isLessonDone,
      isStepDone,
      toggleStudioCheck,
      isStudioChecked,
      upsertNote,
      getNote,
      addLogEntry,
      updateLogEntry,
      deleteLogEntry,
      resetProgress,
    }),
    [
      state,
      toggleLesson,
      toggleStep,
      toggleBookmark,
      isBookmarked,
      isLessonDone,
      isStepDone,
      toggleStudioCheck,
      isStudioChecked,
      upsertNote,
      getNote,
      addLogEntry,
      updateLogEntry,
      deleteLogEntry,
      resetProgress,
    ],
  )

  return <ArchivaContext.Provider value={value}>{children}</ArchivaContext.Provider>
}

export function useArchiva() {
  const ctx = useContext(ArchivaContext)
  if (!ctx) throw new Error('useArchiva must be used within ArchivaProvider')
  return ctx
}
