import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import GithubIcon from '../assets/github.svg'
import { projects } from '../data/portfolio'
import { Section } from './Section'

const brandIconClass = 'w-6 h-6 brightness-0 dark:brightness-100 transition'

export function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="Cinematic product builds with performance and systems thinking.">
      <div className="grid gap-6">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.01, rotateX: 4, rotateY: -4 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative h-64 overflow-hidden md:h-full">
                <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-blue-500/20" />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{project.description}</p>

                <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <img src={GithubIcon} alt="GitHub" className={brandIconClass} loading="lazy" />
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    <ExternalLink size={16} />
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