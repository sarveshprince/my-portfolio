import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import GithubIcon from '../assets/github.svg?react'
import InstagramIcon from '../assets/instagram.svg?react'
import LinkedinIcon from '../assets/linkedin.svg?react'
import { socialLinks } from '../data/portfolio'
// import React from 'react'


const socialItems = [
  { href: socialLinks.github, label: "GitHub", Icon: GithubIcon },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function Hero() {
  return (
    <section id="home" className="relative z-10 mx-auto flex w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="w-full relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-8 sm:p-12"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">AI & Data Science Engineer</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Sarvesh Kumar A</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
          AI & Data Science student specializing in DSA, AI systems, and scalable applications.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-5 py-3 text-sm font-medium text-gray-900 dark:text-white backdrop-blur-lg transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md"
          >
            Download Resume
          </a>

          <div className="flex items-center gap-3">
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

          {/* Email */}
          <a
            href={socialLinks.email}
            aria-label="Email"
            className="
              inline-flex h-11 w-11 items-center justify-center
              rounded-full
              border border-gray-200 dark:border-white/20
              bg-white/90 dark:bg-white/10
              backdrop-blur-lg
              transition-all duration-300 shadow-sm hover:scale-105 hover:shadow-md
            "
          >
            <Mail
              className="
                w-5 h-5
                text-gray-900 dark:text-white
              "
            />
          </a>
        </div>
        </div>
      </motion.div>
    </section>
  )
}








