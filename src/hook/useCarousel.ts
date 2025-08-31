import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselOptions {
  maxLength: number
  initialIndex?: number
  interval?: number
  autoStart?: boolean
}

interface CarouselControls {
  currentIndex: number
  virtualIndex: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  start: () => void
  pause: () => void
  toggle: () => void
  isPlaying: boolean
}

export const useCarousel = ({
  maxLength,
  initialIndex = 0,
  interval = 3000,
  autoStart = true,
}: CarouselOptions): CarouselControls => {
  const [virtualIndex, setVirtualIndex] = useState(initialIndex)
  const [isPlaying, setIsPlaying] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  const currentIndex = ((virtualIndex % maxLength) + maxLength) % maxLength

  const clearAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startAutoScroll = useCallback(() => {
    clearAutoScroll()
    if (maxLength <= 1) return
    intervalRef.current = setInterval(() => {
      setVirtualIndex((prevVirtualIndex) => prevVirtualIndex + 1)
    }, interval)
  }, [clearAutoScroll, interval, maxLength])

  const next = useCallback(() => {
    setVirtualIndex((prevVirtualIndex) => prevVirtualIndex + 1)
  }, [])

  const prev = useCallback(() => {
    setVirtualIndex((prevVirtualIndex) => prevVirtualIndex - 1)
  }, [])

  const goTo = useCallback(
    (index: number) => {
      const safeIndex = Math.max(0, Math.min(index, maxLength - 1))
      
      const currentCycle = Math.floor(virtualIndex / maxLength)
      
      const targets = [
        (currentCycle - 1) * maxLength + safeIndex,
        currentCycle * maxLength + safeIndex,
        (currentCycle + 1) * maxLength + safeIndex,
      ]
      
      const closestTarget = targets.reduce((closest, target) => 
        Math.abs(target - virtualIndex) < Math.abs(closest - virtualIndex) 
          ? target 
          : closest
      )
      
      setVirtualIndex(closestTarget)
    },
    [maxLength, virtualIndex]
  )

  const start = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  useEffect(() => {
    if (isPlaying && maxLength > 1) {
      startAutoScroll()
    } else {
      clearAutoScroll()
    }
    return clearAutoScroll
  }, [isPlaying, startAutoScroll, clearAutoScroll, maxLength])

  useEffect(() => {
    return clearAutoScroll
  }, [clearAutoScroll])

  return {
    currentIndex,
    virtualIndex,
    next,
    prev,
    goTo,
    start,
    pause,
    toggle,
    isPlaying,
  }
}

export default useCarousel
