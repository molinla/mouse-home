import { cn } from '@heroui/react'
import { motion } from 'framer-motion'

export interface CarouselProgressNavProps {
  totalSlides: number
  currentIndex: number
  intervalTime: number
  restartNonceByIndex: number[]
  onDotClick: (index: number) => void
  className?: string
}

const CarouselProgressNav = ({
  totalSlides,
  currentIndex,
  intervalTime,
  restartNonceByIndex,
  onDotClick,
  className,
}: CarouselProgressNavProps) => {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === currentIndex
        const isCompleted = index < currentIndex

        const getXPosition = () => {
          if (isCompleted) return '0%'
          if (isActive) return '0%'
          return '-100%'
        }

        return (
          <button
            className="relative h-1 w-18 hd:w-24 overflow-hidden cursor-pointer transition-all duration-300 bg-white/30"
            onClick={() => onDotClick(index)}
            // biome-ignore lint/suspicious/noArrayIndexKey: only for display
            key={index}
            type="button"
          >
            <motion.span
              key={`${restartNonceByIndex[index]}-${isActive}`}
              className="absolute inset-0 bg-white/60"
              initial={{ x: '-100%' }}
              animate={{ x: getXPosition() }}
              transition={{
                duration: isActive ? intervalTime / 1000 : 0,
                ease: 'linear',
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}

export default CarouselProgressNav
