'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ImageCarouselProps {
  images: string[]
  className?: string
}

export default function ImageCarousel({ images, className = '' }: ImageCarouselProps) {
  // Fixed values for the carousel
  const RADIUS = 150 // radius of the circle in pixels
  const IMAGE_SIZE = 150 // width and height of each image in pixels

  if (images.length === 0) {
    return <div className="h-full w-full flex items-center justify-center">No images</div>
  }

  const angleStep = 360 / images.length

  return (
    <div className={`relative w-full h-full ${className}`}>
      <motion.div
        style={{ transform: 'rotateY(0deg)' }}
        while={{ rotateY: 360 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {images.map((src, index) => {
          const angle = index * angleStep
          return (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${IMAGE_SIZE}px`,
                height: `${IMAGE_SIZE}px`,
                marginLeft: `-${IMAGE_SIZE / 2}px`,
                marginTop: `-${IMAGE_SIZE / 2}px`,
                transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
              }}
            >
              <Image
                src={src}
                alt=""
                layout="fixed"
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}