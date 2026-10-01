import { useEffect, useState } from 'react'
import { navLinks } from '../data/portfolio'
import { ThemeToggle } from './ThemeToggle'

type NavbarProps = {
  isDark: boolean
  onThemeToggle: () => void
}

export function Navbar({ isDark, onThemeToggle }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id)
          break
        }
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#060912]/80 backdrop-blur-2xl border-b border-gray-200/60 dark:border-white/8 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            className="font-display text-sm font-bold tracking-[0.18em] text-gray-900 dark:text-white transition-opacity hover:opacity-75"
          >
            <span className="gradient-text">S</span>ARVESH
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-blue-600 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-white/10" />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              )
            })}
            <div className="ml-2">
              <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            <button
              id="mobile-menu-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white/90 text-gray-700 shadow-sm transition-all dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
            >
              {open ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="mt-3 grid gap-1 border-t border-gray-100 pt-3 dark:border-white/8 md:hidden">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}
