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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const isDark = theme === 'dark'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark'
    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    const nextTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    setTheme(nextTheme)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#eef2f7] to-[#e2e8f0] dark:bg-gradient-to-br dark:from-black dark:via-gray-900 dark:to-black text-gray-900 dark:text-white transition-colors duration-300">
      <div className="pointer-events-none absolute -left-36 top-20 z-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl transition-colors duration-300 dark:bg-blue-400/10" />
      <div className="pointer-events-none absolute -right-40 top-1/3 z-0 h-96 w-96 rounded-full bg-purple-300/10 blur-3xl transition-colors duration-300 dark:bg-violet-500/20" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 z-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl transition-colors duration-300 dark:bg-cyan-500/20" />

      <Navbar isDark={isDark} onThemeToggle={toggleTheme} />
      <main className="relative z-10 pb-10 pt-24 sm:pt-28">
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



