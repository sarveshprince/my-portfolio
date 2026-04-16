import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import GithubIcon from '../assets/github.svg?react'
import InstagramIcon from '../assets/instagram.svg?react'
import LinkedinIcon from '../assets/linkedin.svg?react'
import { socialLinks } from '../data/portfolio'
import { Section } from './Section'

const socialItems = [
  { href: socialLinks.github, label: "GitHub", Icon: GithubIcon },
  { href: socialLinks.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: socialLinks.instagram, label: "Instagram", Icon: InstagramIcon },
];

export function Contact() {
  return (
    <Section id="contact" title="Contact" subtitle="Available for internships, collaborations, and product engineering opportunities.">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-6 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:sarvesh.jr10@gmail.com"
            className="inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white transition-all duration-300 shadow-sm hover:scale-[1.02] hover:shadow-md"
          >
            <Mail size={18} />
            sarvesh.jr10@gmail.com
          </a>
          <a
            href="tel:9003577007"
            className="inline-flex items-center gap-3 rounded-xl border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-4 py-3 text-sm text-gray-900 dark:text-white transition-all duration-300 shadow-sm hover:scale-[1.02] hover:shadow-md"
          >
            <Phone size={18} />
            9003577007
          </a>
        </div>

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
      </motion.div>
    </Section>
  )
}







