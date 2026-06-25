'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Project {
  title: string
  engine: string
  description: string
  image: string
  screenshots: string[]
  video: string
}

interface ProjectCardProps {
  project: Project
  onSelect: () => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      cursor="pointer"
      onClick={onSelect}
      className="glass rounded-3xl overflow-hidden"
    >
      <div className="h-60 bg-white/5 relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 50vw"
          loading="eager"
          className="object-cover"
        />
      </div>

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
