import { motion } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'
import GithubIcon from '../assets/github.svg?react'
import { projects } from '../data/portfolio'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="Engineering-focused builds with real-world impact.">
      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl transition-all duration-500 hover:shadow-2xl dark:border-white/8 dark:bg-white/[0.03] dark:hover:shadow-[0_20px_60px_rgba(59,130,246,0.12)]"
          >
            {/* Top gradient border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="grid md:grid-cols-5">
              {/* Image panel */}
              <div className="relative h-56 overflow-hidden md:col-span-2 md:h-auto">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />
                {/* Year badge */}
                <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  2024
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col p-6 sm:p-8 md:col-span-3">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <Sparkles size={10} />
                      Featured Project
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-5 grid grid-cols-2 gap-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs font-medium text-gray-700 dark:border-white/8 dark:bg-white/5 dark:text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    id={`project-github-${idx}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white"
                  >
                    <GithubIcon className="h-4 w-4 text-gray-900 dark:text-white" />
                    Source Code
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    id={`project-demo-${idx}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-blue-500/40"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
