import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '../data/portfolio'
import { Section } from './Section'

const colors = [
  { dot: 'bg-blue-500', ring: 'ring-blue-500/30', glow: 'shadow-blue-500/20', badge: 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300' },
  { dot: 'bg-violet-500', ring: 'ring-violet-500/30', glow: 'shadow-violet-500/20', badge: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300' },
]

export function Education() {
  return (
    <Section id="education" title="Education" subtitle="Academic milestones shaping my engineering foundation.">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[22px] top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-blue-400/60 via-violet-400/40 to-transparent sm:left-[26px]" />

        <div className="grid gap-5">
          {education.map((item, idx) => {
            const c = colors[idx % colors.length]
            return (
              <motion.article
                key={item.institute}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 6 }}
                className="relative flex gap-5 sm:gap-7"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ring-2 ${c.ring} ${c.dot} bg-opacity-20 shadow-lg ${c.glow}`}>
                    <GraduationCap size={18} className="text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className="group flex-1 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 p-5 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-lg dark:border-white/8 dark:bg-white/[0.03]">
                  {/* Top accent */}
                  <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${idx === 0 ? 'from-blue-500 via-cyan-400 to-transparent' : 'from-violet-500 via-pink-400 to-transparent'}`} />

                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white sm:text-lg">
                      {item.institute}
                    </h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.badge}`}>
                      {item.metric}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.detail}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
