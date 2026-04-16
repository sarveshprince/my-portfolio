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
        className="w-full rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out sm:p-12"
      >
        <p className="text-sm uppercase tracking-[0.24em] text-blue-300">AI & Data Science Engineer</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">Sarvesh Kumar A</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
          AI & Data Science student specializing in DSA, AI systems, and scalable applications.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 dark:bg-white/10 px-5 py-3 text-sm font-medium text-gray-900 dark:text-white backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-105"
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
                border border-gray-400 dark:border-white/30
                bg-white/60 dark:bg-white/10
                backdrop-blur-xl
                transition-all duration-300 ease-in-out
                hover:scale-110 hover:shadow-lg
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
              border border-gray-400 dark:border-white/30
              bg-white/60 dark:bg-white/10
              backdrop-blur-xl
              transition-all duration-300 ease-in-out
              hover:scale-110 hover:shadow-lg
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



