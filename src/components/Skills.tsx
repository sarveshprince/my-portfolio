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
              className="rounded-2xl border border-white/20 bg-white/70 dark:bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-gray-900 dark:text-white">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/25 bg-white/70 dark:bg-white/10 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
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


