'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { Project } from '@/data/projects'
import ProjectVisual from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  onSelect: () => void
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [imageSrc, setImageSrc] = useState(project.image)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setImageSrc(`${project.image}?v=${Date.now()}`)
      return
    }

    setImageSrc(project.image)
  }, [project.image])

  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full cursor-pointer text-left"
    >
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.02,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
        }}
        className="
          glass
          rounded-3xl
          overflow-hidden
        "
      >
        <div className="h-60 bg-white/5 relative overflow-hidden">
          <ProjectVisual project={project} imageSrc={imageSrc} />
        </div>

        <div className="p-8">
          <p className="text-blue-400 mb-2">{project.engine}</p>

          <h2 className="text-3xl font-bold mb-4">
            {project.title}
          </h2>

          <p className="text-white/70">
            {project.description}
          </p>

          {project.highlights && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.highlights.slice(0, 3).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                >
                  {highlight.split(' ').slice(0, 4).join(' ')}…
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </button>
  )
}
