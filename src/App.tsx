import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { ArchivaProvider } from './context/ArchivaContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { Library } from './pages/Library'
import { LibraryTopic } from './pages/LibraryTopic'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { LessonDetail } from './pages/LessonDetail'
import { Software } from './pages/Software'
import { SoftwareDetail } from './pages/SoftwareDetail'
import { Practice } from './pages/Practice'
import { Logbook } from './pages/Logbook'
import { Business, BusinessTools } from './pages/Business'
import { Studio } from './pages/Studio'
import { Saved } from './pages/Saved'
import { SearchPage } from './pages/SearchPage'
import { Books } from './pages/Books'
import { BookDetail } from './pages/BookDetail'
import { Projects } from './pages/Projects'
import { Labs } from './pages/Labs'

const Explore = lazy(() =>
  import('./pages/Explore').then((m) => ({ default: m.Explore })),
)
const VizPage = lazy(() =>
  import('./pages/VizPage').then((m) => ({ default: m.VizPage })),
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="page wrap">
      <p className="muted">Loading interactive studio…</p>
    </div>
  )
}

export default function App() {
  return (
    <ArchivaProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="library" element={<Library />} />
              <Route path="library/:topicId" element={<LibraryTopic />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="courses/:courseId/:lessonId" element={<LessonDetail />} />
              <Route path="software" element={<Software />} />
              <Route path="software/:toolId" element={<SoftwareDetail />} />
              <Route path="explore" element={<Explore />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:bookId" element={<BookDetail />} />
              <Route path="viz" element={<VizPage />} />
              <Route path="projects" element={<Projects />} />
              <Route path="labs" element={<Labs />} />
              <Route path="practice" element={<Practice />} />
              <Route path="practice/logbook" element={<Logbook />} />
              <Route path="business" element={<Business />} />
              <Route path="business/tools" element={<BusinessTools />} />
              <Route path="studio" element={<Studio />} />
              <Route path="saved" element={<Saved />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ArchivaProvider>
  )
}
