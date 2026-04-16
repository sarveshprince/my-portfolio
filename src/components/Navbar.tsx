import { useState } from 'react'
import { navLinks } from '../data/portfolio'
import { ThemeToggle } from './ThemeToggle'

type NavbarProps = {
  isDark: boolean
  onThemeToggle: () => void
}

export function Navbar({ isDark, onThemeToggle }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
      <nav className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-sm font-semibold tracking-[0.2em] text-white transition-all duration-300 ease-in-out">
            SARVESH
          </a>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-200 transition-all duration-300 ease-in-out hover:text-white"
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
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-xs font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
            >
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-3 grid gap-2 border-t border-white/20 pt-3 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-sm text-slate-200 transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white"
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