import { motion } from 'framer-motion'
import { Section } from './Section'

export function About() {
  return (
    <Section
      id="about"
      title="About"
      subtitle="Focused on real-world AI products, clean architecture, and high-performance frontend engineering."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-6 sm:p-8"
      >
        <p className="leading-relaxed text-gray-600 dark:text-gray-400">
          I build scalable applications that combine algorithmic rigor with refined user experience. My focus spans
          AI-enabled systems, data-driven interfaces, and production-ready frontend architecture with a minimal,
          cinematic design language.
        </p>
      </motion.div>
    </Section>
  )
}






