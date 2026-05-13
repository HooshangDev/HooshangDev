'use client'

import { motion } from 'framer-motion'

interface Project {
  title: string
  engine: string
  description: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass rounded-3xl overflow-hidden"
    >
      <div className="h-60 bg-white/5" />

      <div className="p-8">
        <p className="text-blue-400 mb-2">{project.engine}</p>

        <h2 className="text-3xl font-bold mb-4">
          {project.title}
        </h2>

        <p className="text-white/70">
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}
