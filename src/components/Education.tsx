import { motion } from 'framer-motion'
import { education } from '../data/portfolio'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" title="Education" subtitle="Academic milestones and performance metrics.">
      <div className="relative grid gap-4">
        <div className="absolute left-4 top-3 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-blue-400/70 to-transparent" />
        {education.map((item, idx) => (
          <motion.article
            key={item.institute}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="relative ml-10 overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-5"
          >
            <span className="absolute -left-9 top-5 inline-flex h-6 w-6 rounded-full bg-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.institute}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.detail}</p>
            <p className="mt-2 text-sm font-medium text-blue-200">{item.metric}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}






