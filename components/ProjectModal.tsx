'use client'

import ImageCarousel from './ImageCarousel'
import { useEffect, useRef } from 'react'

interface ProjectModalProps {
  project: {
    title: string
    engine: string
    description: string
    image: string
    screenshots: string[]
    video: string
  }
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50" onClick={onClose}>
      <div className="relative w-[75vw] h-[75vh] max-w-6xl max-h-[80vh] bg-black/80 rounded-2xl p-6 flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex-1 overflow-hidden">
          {/* Image Carousel */}
          <ImageCarousel images={project.screenshots} className="h-[60%] mb-4" />

          {/* Video */}
          <div className="h-[25%] mb-4">
            <video
              ref={videoRef}
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-contain"
            />
          </div>

          {/* Description */}
          <div className="flex-1 text-white/80 overflow-y-auto">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-base">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}