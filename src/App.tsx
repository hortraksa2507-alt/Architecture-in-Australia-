import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Library } from './pages/Library'
import { Courses } from './pages/Courses'
import { Software } from './pages/Software'
import { Practice } from './pages/Practice'
import { Business } from './pages/Business'
import { Studio } from './pages/Studio'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="courses" element={<Courses />} />
          <Route path="software" element={<Software />} />
          <Route path="practice" element={<Practice />} />
          <Route path="business" element={<Business />} />
          <Route path="studio" element={<Studio />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
