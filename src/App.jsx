import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import JoinModal from './components/JoinModal'
import Home from './pages/Home'
import Events from './pages/Events'
import Companies from './pages/Companies'
import Members from './pages/Members'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <ScrollToTop />
      <Navbar onJoinClick={() => setShowModal(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home onJoinClick={() => setShowModal(true)} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </main>
      <Footer onJoinClick={() => setShowModal(true)} />
      <JoinModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
