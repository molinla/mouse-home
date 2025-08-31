/** biome-ignore-all lint/suspicious/noArrayIndexKey: legacy component with index keys */
import { cn } from '@heroui/react'
import { useEffect, useRef, useState } from 'react'
import HackerRain from '../hero-sections/hacker-rain'
import useCarousel from '../hook/useCarousel'
import CarouselViewer, { type CarouselViewerRef } from './carousel-viewer'

const openPlatformImagesModules = import.meta.glob(
  '../assets/screenshots/open-platform-*.png',
  {
    eager: true,
  }
)

const ProgressBar = ({
  isActive,
  isCompleted,
  durationMs,
  restartNonce,
}: {
  isActive: boolean
  isCompleted: boolean
  durationMs: number
  restartNonce: number
}) => {
  const [animating, setAnimating] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: we need force update when restartNonce changes
  useEffect(() => {
    if (!isActive) {
      setAnimating(false)
      return
    }
    setAnimating(false)
    const id = requestAnimationFrame(() => {
      setAnimating(true)
    })
    return () => cancelAnimationFrame(id)
  }, [isActive, restartNonce])

  const transform = isActive
    ? animating
      ? 'translateX(0%)'
      : 'translateX(-100%)'
    : isCompleted
      ? 'translateX(0%)'
      : 'translateX(-100%)'

  const transitionDuration = isActive && animating ? `${durationMs}ms` : '0ms'
  const transitionProperty = isActive && animating ? 'transform' : 'none'

  return (
    <span
      className="absolute inset-0 bg-white/60 transition-transform ease-linear"
      style={{ transform, transitionDuration, transitionProperty }}
    />
  )
}

const CarouselProgressNav = ({
  totalSlides,
  currentIndex,
  intervalTime,
  restartNonceByIndex,
  onDotClick,
  className,
}: {
  totalSlides: number
  currentIndex: number
  intervalTime: number
  restartNonceByIndex: number[]
  onDotClick: (index: number) => void
  className?: string
}) => {
  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === currentIndex
        const isCompleted = index < currentIndex

        return (
          <button
            className="relative h-1 w-18 hd:w-24 overflow-hidden cursor-pointer transition-all duration-300 bg-white/30"
            onClick={() => onDotClick(index)}
            key={index}
            type="button"
          >
            <ProgressBar
              isActive={isActive}
              isCompleted={isCompleted}
              durationMs={intervalTime}
              restartNonce={restartNonceByIndex[index]}
            />
          </button>
        )
      })}
    </nav>
  )
}

function WhatCanWeDo() {
  const intervalTime = 5000
  const carouselViewerRef = useRef<CarouselViewerRef>(null)
  const openPlatformImages = Object.entries(openPlatformImagesModules).map(
    ([_, module]) => (module as any).default as string
  )
  const totalSlides = openPlatformImages.length

  const images = openPlatformImages

  const { currentIndex, virtualIndex, goTo, start, pause } = useCarousel({
    maxLength: totalSlides,
    interval: intervalTime,
    autoStart: true,
  })

  const [restartNonceByIndex, setRestartNonceByIndex] = useState<number[]>(() =>
    Array.from({ length: totalSlides }, () => 0)
  )

  const handleDotClick = (index: number) => {
    goTo(index)
    setRestartNonceByIndex((prev) => {
      const next = [...prev]
      next[index] += 1
      return next
    })
    pause()
    setTimeout(() => start(), 0)
  }

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 md:px-12">
      <div className="max-w-7xl hd:max-w-9xl w-full h-screen flex items-center justify-center mx-auto bg-white">
        <div className="relative z-100 w-full h-screen flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
            黑匣边缘计算设备能做什么？
          </h1>
        </div>
      </div>
      <div className="h-screen w-full inset-0 z-10 overflow-hidden">
        <HackerRain
          className="absolute inset-0 w-screen h-screen top-[100vh]"
          maxRippleSize={2000}
        />
        <section className="absolute top-[100vh] mx-auto inset-0 z-10 max-w-7xl hd:max-w-9xl h-screen">
          <header className="absolute top-24 left-0 flex flex-col gap-4 text-white h-auto pr-[40vw] z-9999">
            <h2 className="text-3xl font-bold hd:text-6xl hd:leading-[1.5]">
              AI边缘检测计算
            </h2>
            <p className="text-lg hd:text-2xl">
              可以实现任何操作系统的所有桌面视觉的自动化，图册、桌面图像检测、网页图像检测，或你日常使用的任何其他应用程序的图像检测。
            </p>
            <CarouselProgressNav
              className="mt-6"
              totalSlides={totalSlides}
              currentIndex={currentIndex}
              intervalTime={intervalTime}
              restartNonceByIndex={restartNonceByIndex}
              onDotClick={handleDotClick}
            />
          </header>
          <div className="relative w-full px-[20%] flex items-center justify-center">
            <CarouselViewer
              images={images}
              currentIndex={virtualIndex}
              totalSlides={totalSlides}
              onItemClick={handleDotClick}
              className="translate-y-[40vh]"
              ref={carouselViewerRef}
            />
          </div>
        </section>
      </div>
    </section>
  )
}

function LowCode() {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 p-4 md:p-12 pb-12 md:pb-24">
      <h1 className="max-w-7xl mx-auto text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
        低代码搭建AI应用
      </h1>
    </section>
  )
}

export default function Features() {
  return (
    <article className="min-h-screen">
      <WhatCanWeDo />
      <LowCode />
    </article>
  )
}
