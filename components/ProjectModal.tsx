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
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [imageSrc, setImageSrc] = useState(project.image)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement as HTMLElement | null
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], video[controls], [tabindex="0"]')
        if (!elements?.length) return
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()

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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
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
          ref={closeRef}
          aria-label="Close project details"
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
        <section className={`relative ${(project.image || project.cover) ? 'h-[350px] sm:h-[500px]' : 'min-h-60'}`}>
          {(project.image || project.cover) && <ProjectVisual project={project} imageSrc={imageSrc} />}

          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-transparent" />

          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10">
            <p className="text-blue-400 text-lg mb-2">
              {project.engine}
            </p>

            <h1 className="text-3xl sm:text-6xl font-black text-white">
              {project.title}
            </h1>
          </div>
        </section>

        {project.screenshots.length > 0 && (
          <section className="px-6 sm:px-10 py-10">
            <h2 className="text-3xl font-bold text-white mb-8">
              Screenshots
            </h2>

            <CoverflowCarousel key={project.title} images={project.screenshots} />
          </section>
        )}

        {project.video && (
          <section className="px-6 sm:px-10 py-10">
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
          <section className="px-6 sm:px-10 py-10">
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
