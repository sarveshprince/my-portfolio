import { motion } from 'framer-motion'
import { Code, Cpu, Database } from 'lucide-react'
import { skills } from '../data/portfolio'
import { Section } from './Section'

const iconMap = {
  code: Code,
  database: Database,
  cpu: Cpu,
}

// Icon accent colors per category
const accentMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  Languages: {
    bg: 'bg-blue-500/15 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500/30',
    glow: 'group-hover:shadow-blue-500/20',
  },
  Tools: {
    bg: 'bg-violet-500/15 dark:bg-violet-500/20',
    text: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-500/30',
    glow: 'group-hover:shadow-violet-500/20',
  },
  Technologies: {
    bg: 'bg-cyan-500/15 dark:bg-cyan-500/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    ring: 'ring-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/20',
  },
}

// Skill tag colors — cycles through a palette
const tagPalette = [
  'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/25',
  'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/25',
  'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/25',
  'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/25',
  'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/25',
]

export function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Core technologies, tools, and languages I use to build things."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-5 md:grid-cols-3"
      >
        {skills.map((category) => {
          const Icon = iconMap[category.icon]
          const accent = accentMap[category.title] ?? accentMap['Languages']

          return (
            <motion.article
              key={category.title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-300 dark:border-white/10 dark:bg-white/5 dark:hover:shadow-lg ${accent.glow}`}
            >
              {/* Subtle top gradient line */}
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${accent.text}`} />

              {/* Icon */}
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accent.bg} ${accent.text} ${accent.ring} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={22} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="mb-1 text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <p className="mb-4 text-xs text-gray-400 dark:text-gray-500">
                {category.skills.length} technologies
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-transform duration-200 hover:scale-105 ${tagPalette[i % tagPalette.length]}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
