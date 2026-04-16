import { motion } from 'framer-motion'
import { achievements } from '../data/portfolio'
import { Section } from './Section'

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Selected milestones from hackathons and AI innovation tracks.">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        className="grid gap-5 md:grid-cols-2"
      >
        {achievements.map((item) => (
          <motion.article
            key={item.title}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-6"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Highlight
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{item.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.note}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}








