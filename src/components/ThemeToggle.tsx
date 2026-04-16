type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="
        inline-flex h-10 items-center justify-center
        rounded-full px-4
        text-xs font-semibold tracking-wide
        transition-all duration-300 ease-in-out
        border border-gray-400 dark:border-white/20
        bg-white/80 dark:bg-white/10
        text-gray-900 dark:text-white
        backdrop-blur-xl
        hover:scale-105 hover:shadow-md
      "
    >
      {isDark ? 'LIGHT' : 'DARK'}
    </button>
  )
}



