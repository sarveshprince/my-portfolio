import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import GithubIcon from '../assets/github.svg'
import InstagramIcon from '../assets/instagram.svg'
import LinkedinIcon from '../assets/linkedin.svg'
import { socialLinks } from '../data/portfolio'
import { Section } from './Section'

const brandIconClass = 'w-6 h-6 brightness-0 dark:brightness-100 transition'

export function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Available for internships, collaborations, and product engineering opportunities.">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all duration-300 ease-in-out sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:sarvesh.jr10@gmail.com"
            className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
            <Mail size={18} />
            sarvesh.jr10@gmail.com
          </a>
          <a
            href="tel:9003577007"
            className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white transition-all duration-300 ease-in-out hover:scale-[1.02]"
          >
            <Phone size={18} />
            9003577007
          </a>
        </div>

        <div className="mt-6 flex items-center gap-3">
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
        </div>
      </motion.div>
    </Section>
  )
}