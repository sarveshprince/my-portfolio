import { motion } from 'framer-motion'
import { Mail, Phone, Send } from 'lucide-react'
import GithubIcon from '../assets/github.svg?react'
import InstagramIcon from '../assets/instagram.svg?react'
import LinkedinIcon from '../assets/linkedin.svg?react'
import { socialLinks } from '../data/portfolio'
import { Section } from './Section'

const contactItems = [
  {
    id: 'contact-email',
    label: 'Email',
    value: 'sarvesh.jr10@gmail.com',
    href: 'mailto:sarvesh.jr10@gmail.com',
    Icon: Mail,
    accent: 'from-blue-500 to-cyan-400',
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'contact-phone',
    label: 'Phone',
    value: '+91 9003577007',
    href: 'tel:9003577007',
    Icon: Phone,
    accent: 'from-emerald-500 to-teal-400',
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
]

const socialItems = [
  {
    id: 'contact-github',
    href: socialLinks.github,
    label: 'GitHub',
    Icon: GithubIcon,
    bg: 'hover:bg-gray-100 dark:hover:bg-white/10',
    border: 'hover:border-gray-400/50 dark:hover:border-white/25',
  },
  {
    id: 'contact-linkedin',
    href: socialLinks.linkedin,
    label: 'LinkedIn',
    Icon: LinkedinIcon,
    bg: 'hover:bg-blue-50 dark:hover:bg-blue-500/10',
    border: 'hover:border-blue-400/50 dark:hover:border-blue-500/40',
  },
  {
    id: 'contact-instagram',
    href: socialLinks.instagram,
    label: 'Instagram',
    Icon: InstagramIcon,
    bg: 'hover:bg-pink-50 dark:hover:bg-pink-500/10',
    border: 'hover:border-pink-400/50 dark:hover:border-pink-500/40',
  },
  {
    id: 'contact-mail',
    href: socialLinks.email,
    label: 'Email',
    Icon: Mail,
    bg: 'hover:bg-cyan-50 dark:hover:bg-cyan-500/10',
    border: 'hover:border-cyan-400/50 dark:hover:border-cyan-500/40',
  },
]

export function Contact() {
  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Available for internships, collaborations, and engineering opportunities."
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid gap-6 lg:grid-cols-5"
      >
        {/* ── Left: CTA panel ─────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-7 dark:border-white/10 dark:from-blue-950/40 dark:via-slate-900/60 dark:to-slate-900/80 lg:col-span-2">
          {/* Decorative blob */}
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl dark:bg-blue-500/20" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl dark:bg-cyan-500/15" />

          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
              <Send size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Let's build something great
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              I'm actively looking for internships and collaboration opportunities. Drop me a message — I usually respond within 24 hours.
            </p>

            {/* Social links */}
            <div className="mt-6">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Find me on
              </p>
              <div className="flex gap-2">
                {socialItems.map(({ id, href, label, Icon, bg, border }) => (
                  <motion.a
                    key={label}
                    id={id}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/80 bg-white/80 shadow-sm transition-all duration-200 dark:border-white/10 dark:bg-white/5 ${bg} ${border}`}
                  >
                    {label === 'Email' ? (
                      <Mail size={17} className="text-gray-600 dark:text-gray-300" />
                    ) : (
                      <Icon className="h-[17px] w-[17px] text-gray-600 dark:text-gray-300" />
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Contact cards ─────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          {contactItems.map(({ id, label, value, href, Icon, accent, iconBg, iconColor }, i) => (
            <motion.a
              key={label}
              id={id}
              href={href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-200 hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              {/* Gradient left bar */}
              <div className={`absolute left-0 top-4 h-10 w-1 rounded-r-full bg-gradient-to-b ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={20} className={iconColor} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {label}
                </p>
                <p className="mt-0.5 truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>

              <div className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-gray-500 dark:text-gray-600 dark:group-hover:text-gray-400">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.a>
          ))}

          {/* Availability badge */}
          <div className="mt-1 flex items-center gap-2.5 rounded-2xl border border-green-200/80 bg-green-50/80 px-5 py-4 dark:border-green-500/20 dark:bg-green-500/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Available for internship & collaboration — Oct 2026 onwards
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
