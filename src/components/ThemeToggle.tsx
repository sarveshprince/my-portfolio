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
        transition-all duration-300
        border border-gray-200 dark:border-white/20
        bg-white/90 dark:bg-white/10
        shadow-sm
        text-gray-900 dark:text-white
        backdrop-blur-lg
        hover:scale-105 hover:shadow-md
      "
    >
      {isDark ? 'LIGHT' : 'DARK'}
    </button>
  )
}








