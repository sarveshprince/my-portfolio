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
            className="relative ml-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 ease-in-out"
          >
            <span className="absolute -left-9 top-5 inline-flex h-6 w-6 rounded-full bg-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
            <h3 className="text-lg font-semibold text-white">{item.institute}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
            <p className="mt-2 text-sm font-medium text-blue-200">{item.metric}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}