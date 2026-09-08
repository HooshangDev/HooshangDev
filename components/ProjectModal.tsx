'use client'

import { useEffect, useRef, useState } from 'react'
import CoverflowCarousel from './CoverflowCarousel'
import ProjectVisual from './ProjectVisual'
import type { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [imageSrc, setImageSrc] = useState(project.image)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow

      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setImageSrc(`${project.image}?v=${Date.now()}`)
      return
    }

    setImageSrc(project.image)
  }, [project.image])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[90vw]
          max-w-7xl
          h-[90vh]
          bg-zinc-950
          rounded-3xl
          overflow-y-auto
          border border-white/10
        "
      >
        <button
          onClick={onClose}
          className="
            sticky
            top-4
            float-right
            mr-4
            mt-4
            z-50
            text-white
            text-2xl
          "
        >
          ✕
        </button>

        {/* HERO IMAGE */}
        <section className="relative h-[500px]">
          {project.image ? (
            <img
              src={imageSrc}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <ProjectVisual project={project} />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />

          <div className="absolute bottom-10 left-10">
            <p className="text-blue-400 text-lg mb-2">
              {project.engine}
            </p>

            <h1 className="text-6xl font-black text-white">
              {project.title}
            </h1>
          </div>
        </section>

        {project.screenshots.length > 0 && (
          <section className="px-10 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Screenshots
            </h2>

            <CoverflowCarousel key={project.title} images={project.screenshots} />
          </section>
        )}

        {project.video && (
          <section className="px-10 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Gameplay
            </h2>

            <video
              ref={videoRef}
              src={project.video}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="
                w-full
                rounded-3xl
                border
                border-white/10
              "
            />
          </section>
        )}

        {project.highlights && (
          <section className="px-10 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              What I built
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="glass rounded-2xl p-5 text-white/75"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* DESCRIPTION */}
        <section className="px-10 pb-20">
          <h2 className="text-3xl font-bold text-white mb-8">
            Overview
          </h2>

          <p className="text-lg leading-8 text-white/70 max-w-4xl">
            {project.description}
          </p>
        </section>
      </div>
    </div>
  )
}
