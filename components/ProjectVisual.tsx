import Image from 'next/image'
import type { Project } from '@/data/projects'

interface ProjectVisualProps {
  project: Project
  imageSrc?: string
  sizes?: string
  priority?: boolean
  className?: string
}

export default function ProjectVisual({
  project,
  imageSrc,
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  className = '',
}: ProjectVisualProps) {
  if (project.image) {
    return (
      <Image
        src={imageSrc ?? project.image}
        alt={project.title}
        fill
        priority={priority}
        sizes={sizes}
        unoptimized
        className={`object-cover ${className}`}
      />
    )
  }

  const cover = project.cover

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 78% 18%, ${cover?.accent ?? '#2563eb'}55, transparent 34%), linear-gradient(135deg, #0b1220 0%, #050505 70%)`,
        boxShadow: `inset 0 0 90px ${cover?.accent ?? '#2563eb'}30`,
      }}
      aria-label={project.title}
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          {cover?.eyebrow ?? project.engine}
        </span>
        <div>
          <div
            className="mb-4 h-1 w-16 rounded-full"
            style={{ backgroundColor: cover?.accent ?? '#2563eb' }}
          />
          <p className="max-w-xl text-3xl font-black leading-tight text-white">
            {cover?.title ?? project.title}
          </p>
          {cover?.detail && (
            <p className="mt-2 text-sm text-white/60">{cover.detail}</p>
          )}
        </div>
      </div>
    </div>
  )
}
