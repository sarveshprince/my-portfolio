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
        className="rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out sm:p-8"
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


