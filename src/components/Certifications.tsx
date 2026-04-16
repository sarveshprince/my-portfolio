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
            className="rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{cert.organization}</p>
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/70 dark:bg-white/10 px-4 py-2 text-sm text-gray-900 dark:text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
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


