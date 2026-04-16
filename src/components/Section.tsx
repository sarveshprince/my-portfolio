import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SectionProps = {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
      className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16"
    >
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">{subtitle}</p> : null}
      </div>
      {children}
    </motion.section>
  )
}






