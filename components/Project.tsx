'use client'

import { motion } from 'framer-motion'

interface ProjectProps {
  title: string
  subtitle: string
  engine: string
  bullets: string[]
  skills?: string[]
  featured?: boolean
}

export default function Project({
  title,
  subtitle,
  engine,
  bullets,
  skills = [],
  featured = false,
}: ProjectProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`glass rounded-3xl p-8 border transition-all duration-300 hover:scale-[1.01] ${
        featured
          ? 'border-blue-500/40'
          : 'border-white/10'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-3xl font-black">{title}</h3>

          <p className="text-white/60 mt-2">
            {subtitle}
          </p>
        </div>

        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 whitespace-nowrap">
          {engine}
        </span>
      </div>

      <ul className="mt-8 space-y-3">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-3 text-white/80"
          >
            <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-8">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-sm text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.article>
  )
}