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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 
bg-white/90 dark:bg-black/60 
backdrop-blur-xl 
border-b border-gray-200 dark:border-white/20 
shadow-[0_4px_20px_rgba(0,0,0,0.05)]
transition-shadow duration-300 ${
  scrolled ? 'shadow-[0_6px_30px_rgba(0,0,0,0.08)]' : ''
}`}
    >
      <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-sm font-semibold tracking-[0.2em] text-gray-900 dark:text-white transition-all duration-300">
            SARVESH
          </a>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 hover:text-gray-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            <button
              aria-label="Open menu"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex h-10 items-center justify-center rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 shadow-sm px-4 text-xs font-semibold tracking-wide text-gray-900 dark:text-white backdrop-blur-lg transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md"
            >
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-3 grid gap-2 border-t border-gray-200 dark:border-white/20 pt-3 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-gray-600 dark:text-gray-400 transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  )
}








