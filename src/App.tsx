import { useEffect, useState } from 'react'
import { Achievements } from './components/Achievements'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { LeetCodeDashboard } from './components/LeetCodeDashboard'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'

function App() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const shouldUseDark = savedTheme ? savedTheme === 'dark' : true
    setIsDark(shouldUseDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black">
      <div className="pointer-events-none absolute -left-36 top-20 z-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 z-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 z-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Navbar isDark={isDark} onThemeToggle={toggleTheme} />
      <main className="relative z-10 pb-10">
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <LeetCodeDashboard />
        <Contact />
      </main>
    </div>
  )
}

export default App