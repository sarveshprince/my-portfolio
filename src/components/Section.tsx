import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  label?: string
  children: ReactNode
}

let sectionCounter = 0

export function Section({ id, title, subtitle, label, children }: SectionProps) {
  sectionCounter++
  const num = String(sectionCounter).padStart(2, '0')

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20"
    >
      {/* Section header */}
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs font-bold text-blue-500/60 dark:text-blue-400/50">
            {label ?? num}
          </span>
          <div className="h-px flex-1 max-w-[48px] bg-gradient-to-r from-blue-400/50 to-transparent" />
        </div>
        <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {title}
          <span className="ml-1 text-blue-500">.</span>
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>

      {children}
    </motion.section>
  )
}
