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
            className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Highlight
            </div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm font-medium text-slate-200">{item.subtitle}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.note}</p>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}