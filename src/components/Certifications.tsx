import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { certifications } from '../data/portfolio'
import { Section } from './Section'

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications" subtitle="Professional credentials and focused upskilling tracks.">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certifications.map((cert) => (
          <motion.article
            key={`${cert.title}-${cert.organization}`}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{cert.organization}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-4 py-2 text-sm text-gray-900 dark:text-white backdrop-blur-lg transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md"
            >
              View Certificate
              <ExternalLink size={14} />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}









