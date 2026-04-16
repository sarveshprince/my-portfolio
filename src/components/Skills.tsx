import { motion } from 'framer-motion'
import { Code, Cpu, Database } from 'lucide-react'
import { skills } from '../data/portfolio'
import { Section } from './Section'

const iconMap = {
  code: Code,
  database: Database,
  cpu: Cpu,
}

export function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="Core technologies, tools, and languages used in engineering workflows.">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid gap-5 md:grid-cols-3"
      >
        {skills.map((category) => {
          const Icon = iconMap[category.icon]

          return (
            <motion.article
              key={category.title}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.03, rotateX: 6, rotateY: -6 }}
              transition={{ duration: 0.35 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition before:duration-700 p-6"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-gray-900 dark:text-white">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-white/10 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}








