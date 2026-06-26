'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface Props {
  images: string[]
}

const LOOP_COPIES = 9
const MIDDLE_COPY = Math.floor(LOOP_COPIES / 2)

export default function CoverflowCarousel({ images }: Props) {
  const imageCount = images.length
  const middleStartIndex = MIDDLE_COPY * imageCount
  const [selectedIndex, setSelectedIndex] = useState(middleStartIndex)
  const [isDragging, setIsDragging] = useState(false)
  const [version, setVersion] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const isDraggingRef = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScrollLeft = useRef(0)
  const dragMoved = useRef(false)
  const snapTimer = useRef<number | null>(null)
  const initializedRef = useRef(false)
  

const autoScrollRef = useRef<number | null>(null)
const autoScrollStoppedRef = useRef(true)

  const loopedImages = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => images).flat(),
    [images]
  )

  const getCenteredScrollLeft = useCallback((index: number) => {
    const container = containerRef.current
    const item = itemRefs.current[index]

    if (!container || !item) return 0

    return item.offsetLeft - (container.clientWidth - item.clientWidth) / 2
  }, [])

  const scrollToIndex = useCallback((
    index: number,
    behavior: ScrollBehavior = 'smooth'
  ) => {
    const container = containerRef.current

    if (!container || imageCount === 0) return

    container.scrollTo({
      left: getCenteredScrollLeft(index),
      behavior,
    })
  }, [getCenteredScrollLeft, imageCount])

  const normalizeToMiddleCopy = useCallback((index: number) => {
    if (imageCount === 0) return 0

    const originalIndex = ((index % imageCount) + imageCount) % imageCount
    return middleStartIndex + originalIndex
  }, [imageCount, middleStartIndex])

  const findClosestIndex = useCallback(() => {
    const container = containerRef.current
    if (!container) return selectedIndex

    const viewportCenter = container.scrollLeft + container.clientWidth / 2
    let closestIndex = selectedIndex
    let closestDistance = Infinity

    itemRefs.current.forEach((item, index) => {
      if (!item) return

      const itemCenter = item.offsetLeft + item.clientWidth / 2
      const distance = Math.abs(itemCenter - viewportCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    return closestIndex
  }, [selectedIndex])

  const keepScrollInLoop = useCallback((index: number) => {
    const container = containerRef.current
    if (!container || imageCount === 0) return index

    const copyIndex = Math.floor(index / imageCount)

    if (copyIndex > 1 && copyIndex < LOOP_COPIES - 2) {
      return index
    }

    const normalizedIndex = normalizeToMiddleCopy(index)
    const currentLeft = getCenteredScrollLeft(index)
    const normalizedLeft = getCenteredScrollLeft(normalizedIndex)
    const offset = normalizedLeft - currentLeft

    container.scrollLeft += offset
    dragStartScrollLeft.current += offset
    return normalizedIndex
  }, [getCenteredScrollLeft, imageCount, normalizeToMiddleCopy])

  const updateSelectedFromScroll = useCallback(() => {
    const closestIndex = findClosestIndex()
    const loopedIndex = keepScrollInLoop(closestIndex)
    setSelectedIndex(loopedIndex)
    return loopedIndex
  }, [findClosestIndex, keepScrollInLoop])

  const snapToCenteredImage = useCallback(() => {
    const index = updateSelectedFromScroll()
    scrollToIndex(index)
  }, [scrollToIndex, updateSelectedFromScroll])

  useEffect(() => {
  const initialIndex = 0
  setSelectedIndex(initialIndex)

  requestAnimationFrame(() => {
    scrollToIndex(initialIndex, 'auto')
    initializedRef.current = true
  })
}, [images, middleStartIndex, scrollToIndex])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setVersion(String(Date.now()))
      return
    }

    setVersion(null)
  }, [images])
useEffect(() => {
  const container = containerRef.current

  if (!container) return

  const speed = 1 // pixels per frame

  const animate = () => {
    if (
      container &&
      !autoScrollStoppedRef.current &&
      !isDraggingRef.current
    ) {
      container.scrollLeft += speed
    }

    autoScrollRef.current = requestAnimationFrame(animate)
  }

  autoScrollRef.current = requestAnimationFrame(animate)

  return () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current)
    }
  }
}, [])
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
  if (!initializedRef.current) return

  updateSelectedFromScroll()

  if (snapTimer.current) {
    clearTimeout(snapTimer.current)
  }

  if (!isDragging) {
    snapTimer.current = window.setTimeout(
      snapToCenteredImage,
      140
    )
  }
}

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)

      if (snapTimer.current) {
        clearTimeout(snapTimer.current)
      }
    }
  }, [isDragging, snapToCenteredImage, updateSelectedFromScroll])

  if (imageCount === 0) {
    return <div className="w-full flex items-center justify-center">No images</div>
  }

  const selectedOriginalIndex = ((selectedIndex % imageCount) + imageCount) % imageCount

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    autoScrollStoppedRef.current = true
    if (!containerRef.current) return

    if (snapTimer.current) {
      clearTimeout(snapTimer.current)
    }

    setIsDragging(true)
    isDraggingRef.current = true
    dragMoved.current = false
    dragStartX.current = e.pageX
    dragStartScrollLeft.current = containerRef.current.scrollLeft
    containerRef.current.setPointerCapture(e.pointerId)
    containerRef.current.style.cursor = 'grabbing'
    containerRef.current.style.userSelect = 'none'
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return

    e.preventDefault()
    const delta = e.pageX - dragStartX.current
    dragMoved.current = Math.abs(delta) > 4
    containerRef.current.scrollLeft = dragStartScrollLeft.current - delta
  }

  const endDrag = () => {
    setIsDragging(false)
    isDraggingRef.current = false

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
      containerRef.current.style.userSelect = ''
    }

    snapToCenteredImage()
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }

    endDrag()
  }

  const onPointerCancel = () => {
    if (isDragging) {
      endDrag()
    }
  }

  const onImageDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault()
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="
          flex
          items-center
          justify-start
          gap-6
          overflow-x-auto
          py-10
          px-4
          scrollbar-hide
          cursor-grab
          select-none
        "
        style={{
          perspective: '1500px',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {loopedImages.map((image, index) => {
          const offset = index - selectedIndex
          const isSelected = index === selectedIndex

          return (
            <motion.div
              key={`${index}-${image}`}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              onClick={() => {
                if (dragMoved.current) return

                const targetIndex = normalizeToMiddleCopy(index)
                setSelectedIndex(targetIndex)
                scrollToIndex(targetIndex)
              }}
              animate={{
                rotateY: Math.max(-3, Math.min(3, offset)) * -18,
                x: Math.max(-3, Math.min(3, offset)) * 32,
                scale: isSelected ? 1 : 0.82,
                opacity: Math.abs(offset) > 4 ? 0.25 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 24,
              }}
              className="
                relative
                w-[min(78vw,600px)]
                aspect-[30/17]
                shrink-0
                cursor-pointer
              "
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <Image
                src={version ? `${image}?v=${version}` : image}
                alt=""
                fill
                sizes="(max-width: 768px) 78vw, 600px"
                unoptimized
                className="
                  object-cover
                  rounded-3xl
                  border
                  border-white/10
                "
                onDragStart={onImageDragStart}
              />
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              const targetIndex = middleStartIndex + i
              setSelectedIndex(targetIndex)
              scrollToIndex(targetIndex)
            }}
            className={`h-3 w-3 rounded-full transition-colors ${
              selectedOriginalIndex === i ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`Show screenshot ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
