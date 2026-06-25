'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
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
    </button>
  )
}
