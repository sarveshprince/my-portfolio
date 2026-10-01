import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { useState } from 'react'
import { certifications } from '../data/portfolio'
import { Section } from './Section'
import type { Certification } from '../types'

export function Certifications() {
  const [preview, setPreview] = useState<Certification | null>(null)

  return (
    <>
      <Section
        id="certifications"
        title="Certifications"
        subtitle="Professional credentials and focused upskilling tracks."
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {certifications.map((cert) => (
            <CertCard key={cert.title} cert={cert} onPreview={() => setPreview(cert)} />
          ))}
        </motion.div>
      </Section>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <CertModal cert={preview} onClose={() => setPreview(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────

function CertCard({ cert, onPreview }: { cert: Certification; onPreview: () => void }) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${cert.color}`} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Icon badge */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cert.color} text-2xl shadow-md`}
        >
          {cert.icon}
        </div>

        {/* Title + org */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold leading-snug text-gray-900 dark:text-white">
            {cert.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            {cert.organization}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {cert.previewUrl && (
            <button
              onClick={onPreview}
              id={`cert-preview-${cert.title.replace(/\s+/g, '-').toLowerCase()}`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            >
              Preview
            </button>
          )}
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            id={`cert-open-${cert.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
            title="Open in Google Drive"
          >
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900"
        style={{ maxHeight: '90vh' }}
      >
        {/* Modal header */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 dark:border-white/10">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${cert.color} text-xl`}
          >
            {cert.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {cert.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{cert.organization}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <ExternalLink size={12} /> Open
            </a>
            <button
              onClick={onClose}
              id="cert-modal-close"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-100 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-800" style={{ minHeight: 500 }}>
          {cert.previewUrl ? (
            <iframe
              src={cert.previewUrl}
              className="h-full w-full border-0"
              style={{ minHeight: 500 }}
              title={cert.title}
              allow="autoplay"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No preview available
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
