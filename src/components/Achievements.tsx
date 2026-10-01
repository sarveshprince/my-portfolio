import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { achievements } from '../data/portfolio'
import { Section } from './Section'

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Selected milestones from hackathons and AI innovation tracks.">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid gap-5 md:grid-cols-2"
      >
        {achievements.map((item, idx) => (
          <motion.article
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative overflow-hidden rounded-2xl border border-amber-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl dark:border-amber-500/15 dark:bg-white/[0.03] dark:hover:shadow-[0_12px_40px_rgba(251,191,36,0.1)]"
          >
            {/* Corner glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-400/10 blur-2xl dark:bg-amber-400/15" />

            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-transparent" />

            <div className="relative flex gap-4">
              {/* Icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg shadow-amber-400/30">
                <Trophy size={20} className="text-white" />
              </div>

              <div className="flex-1 min-w-0">
                {/* Badge */}
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400">
                  🏆 Hackathon Highlight
                </div>

                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  {item.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.note}
                </p>
              </div>
            </div>

            {/* Rank badge */}
            <div className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-400 text-sm font-bold text-white shadow">
              {String(idx + 1).padStart(2, '0')}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
