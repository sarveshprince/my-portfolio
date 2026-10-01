import { useEffect, useState } from 'react'
import { Achievements } from './components/Achievements'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { LeetCodeDashboard } from './components/LeetCodeDashboard'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

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
    <div className="relative min-h-screen overflow-hidden font-sans transition-colors duration-500
      bg-[#f8fafc] dark:bg-[#060912]
      text-gray-900 dark:text-white"
    >
      {/* ── Background grid ─────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-100 dark:opacity-60"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.045) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />

      {/* ── Ambient blobs ───────────────────────────── */}
      <div className="pointer-events-none fixed -left-48 top-0 z-0 h-[600px] w-[600px] rounded-full
        bg-blue-400/8 blur-[120px] transition-colors duration-500 dark:bg-blue-600/12" />
      <div className="pointer-events-none fixed -right-48 top-1/4 z-0 h-[500px] w-[500px] rounded-full
        bg-violet-400/8 blur-[120px] transition-colors duration-500 dark:bg-violet-600/14" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 z-0 h-[400px] w-[400px] rounded-full
        bg-cyan-400/6 blur-[100px] transition-colors duration-500 dark:bg-cyan-600/10" />

      <Navbar isDark={isDark} onThemeToggle={toggleTheme} />

      <main className="relative z-10 pb-16 pt-24 sm:pt-28">
        <Hero isDark={isDark} />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <LeetCodeDashboard />
        <Contact />
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="relative z-10 border-t border-gray-200/80 py-6 text-center text-xs
        text-gray-400 dark:border-white/8 dark:text-gray-600">
        Crafted with ⚛️ React Three Fiber &amp; ❤️ by Sarvesh Kumar A
      </footer>
    </div>
  )
}

export default App
