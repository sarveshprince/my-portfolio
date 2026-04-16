type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-xs font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105 dark:text-white"
    >
      {isDark ? 'LIGHT' : 'DARK'}
    </button>
  )
}