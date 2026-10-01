import { motion, type Variants } from 'framer-motion'
import { FileText, Mail } from 'lucide-react'
import { Suspense, lazy } from 'react'
import GithubIcon from '../assets/github.svg?react'
import InstagramIcon from '../assets/instagram.svg?react'
import LinkedinIcon from '../assets/linkedin.svg?react'
import { socialLinks } from '../data/portfolio'

// Lazy-load the heavy 3D scene so it doesn't block paint
const HeroScene = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene }))
)

const socialItems = [
  { href: socialLinks.github, label: 'GitHub', Icon: GithubIcon },
  { href: socialLinks.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: socialLinks.instagram, label: 'Instagram', Icon: InstagramIcon },
]

// Stagger variants
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section
      id="home"
      className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-10"
    >
      {/* Two-column grid: text | 3D */}
      <div className="grid min-h-[520px] items-center gap-8 lg:grid-cols-2 lg:gap-12">

        {/* ── LEFT: Text content ───────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              AI &amp; Data Science Engineer
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="mt-5 text-[2.6rem] font-bold leading-[1.12] tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Sarvesh
            <br />
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Kumar A
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[1.05rem]"
          >
            AI &amp; Data Science student specializing in{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">DSA</span>,{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">AI systems</span>, and{' '}
            <span className="font-medium text-gray-800 dark:text-gray-200">scalable applications</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              id="hero-resume-btn"
              href="https://drive.google.com/file/d/1RJbKsz65M4HhyiQHZZLaRcMFNz-k-wwW/view"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"
            >
              <FileText size={15} />
              View Resume
            </a>

            <a
              id="hero-email-btn"
              href={socialLinks.email}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-6 py-3 text-sm font-semibold text-gray-900 backdrop-blur-lg shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-white/15 dark:bg-white/5 dark:text-white"
            >
              <Mail size={15} />
              Get in Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="mt-7 flex items-center gap-2.5">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Find me
            </p>
            <div className="h-px flex-1 max-w-[40px] bg-gray-200 dark:bg-white/10" />
            <div className="flex items-center gap-2">
              {socialItems.map(({ href, label, Icon }) => (
                <motion.a
                  key={label}
                  id={`hero-social-${label.toLowerCase()}`}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white/80 shadow-sm transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 dark:border-white/10 dark:bg-white/5 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10"
                >
                  <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-100 pt-7 dark:border-white/5"
          >
            {[
              { value: '8.05', label: 'CGPA' },
              { value: '123+', label: 'LeetCode' },
              { value: '2027', label: 'Graduating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: 3D Canvas ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Glow underneath */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-violet-500/8 blur-2xl dark:bg-violet-500/15" />

          {/* Canvas container */}
          <div className="relative h-[480px] w-full">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
                </div>
              }
            >
              <HeroScene isDark={isDark} />
            </Suspense>
          </div>

          {/* Floating label chips — decorative */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute left-2 top-16 rounded-xl border border-gray-200/80 bg-white/90 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/60 dark:text-gray-200"
          >
            ⚛️ Web Designer
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-20 right-4 rounded-xl border border-gray-200/80 bg-white/90 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/60 dark:text-gray-200"
          >
            🧠 AI &amp; ML
          </motion.div>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-36 left-4 rounded-xl border border-gray-200/80 bg-white/90 px-3 py-2 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-black/60 dark:text-gray-200"
          >
            🔷 DSA Expert
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
