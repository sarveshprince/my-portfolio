import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import GithubIcon from '../assets/github.svg'
import InstagramIcon from '../assets/instagram.svg'
import LinkedinIcon from '../assets/linkedin.svg'
import { socialLinks } from '../data/portfolio'

const brandIconClass = 'w-6 h-6 brightness-0 dark:brightness-100 transition'

export function Hero() {
  return (
    <section id="home" className="relative z-10 mx-auto flex w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="w-full rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out sm:p-12"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">AI & Data Science Engineer</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">Sarvesh Kumar A</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
          AI & Data Science student specializing in DSA, AI systems, and scalable applications.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
          >
            Download Resume
          </a>

          <div className="flex items-center gap-3">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 ease-in-out"
              aria-label="GitHub"
            >
              <img src={GithubIcon} alt="GitHub" className={brandIconClass} loading="lazy" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 ease-in-out"
              aria-label="LinkedIn"
            >
              <img src={LinkedinIcon} alt="LinkedIn" className={brandIconClass} loading="lazy" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 ease-in-out"
              aria-label="Instagram"
            >
              <img src={InstagramIcon} alt="Instagram" className={brandIconClass} loading="lazy" />
            </a>
            <a
              href={socialLinks.email}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}