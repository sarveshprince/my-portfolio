import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import GithubIcon from '../assets/github.svg?react'
import { projects, socialLinks } from '../data/portfolio'
import { Section } from './Section'

const socialItems = [
  { href: socialLinks.github, label: "GitHub", Icon: GithubIcon },
];


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
            className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative h-64 overflow-hidden md:h-full">
                <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-blue-500/20" />
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{project.description}</p>

                <ul className="mt-4 grid gap-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {socialItems.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="
                        inline-flex h-11 w-11 items-center justify-center
                        rounded-full
                        border border-gray-200 dark:border-white/20
                        bg-white/90 dark:bg-white/10
                        backdrop-blur-lg
                        transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md
                      "
                    >
                      <Icon
                        className="
                          w-5 h-5
                          text-gray-900 dark:text-white
                          transition-colors duration-300
                        "
                      />
                    </a>
                  ))}
                    <ExternalLink size={16} />
                    Live Demo
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}








