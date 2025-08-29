import { useEffect, useState } from 'react'
import HexagonGrid from '../hero-sections/hexagon-grid'

const clientImagesModules = import.meta.glob(
  '../assets/screenshots/client-*.png',
  {
    eager: true,
  }
)

const openPlatformImagesModules = import.meta.glob(
  '../assets/screenshots/open-platform-*.png',
  {
    eager: true,
  }
)

function WhatCanWeDo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const totalSlides = 3
  const intervalTime = 3000

  useEffect(() => {
    setCurrentIndex(-1)

    return () => {
      setCurrentIndex(0)
    }
  }, [])

  const clientImages = Object.entries(clientImagesModules).map(
    ([_, module]) => (module as any).default as string
  )

  const openPlatformImages = Object.entries(openPlatformImagesModules).map(
    ([_, module]) => (module as any).default as string
  )

  const active = (index: number, force = false) => {
    if (index !== currentIndex) {
      return
    }
    const newIndex = (currentIndex + 1) % totalSlides
    if (isPlaying || force) {
      if (newIndex === 0) {
        setCurrentIndex(-1)
      } else {
        setCurrentIndex(newIndex)
      }
    } else {
      const prevIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1
      setCurrentIndex(prevIndex)
      setTimeout(() => setCurrentIndex(newIndex), 10)
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (currentIndex === -1) {
      setTimeout(() => setCurrentIndex(0), 10)
    }
  }, [currentIndex])

  // TODO: update dot click logic not working
  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
    setTimeout(() => {
      active(index, true)
    }, 1000)
  }

  return (
    <section className="relative w-full min-h-screen bg-white dark:bg-transparent flex flex-col items-center justify-center gap-6 md:gap-12 p-4 md:p-12">
      <h1 className="max-w-7xl hd:max-w-9xl w-full flex items-center justify-center mx-auto bg-white h-screen text-3xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[4] text-[#1d1d1d] dark:text-white text-center">
        黑匣边缘计算设备能做什么？
      </h1>
      <div className="h-screen w-full inset-0 z-10">
        <HexagonGrid style={{ top: '100vh' }} />
        <section className="absolute top-[100vh] mx-auto inset-0 z-10 max-w-7xl hd:max-w-9xl h-screen flex items-center justify-between gap-4">
          <div className="flex flex-col gap-4 text-white h-auto">
            <h2 className="text-3xl font-bold hd:text-6xl hd:leading-[1.5]">
              AI边缘检测计算
            </h2>
            <p className="text-lg hd:text-2xl">
              可以实现任何操作系统的所有桌面视觉的自动化，图册、桌面图像检测、网页图像检测，或你日常使用的任何其他应用程序的图像检测。
            </p>
            <nav className="flex items-center gap-2 mt-24">
              {Array.from({ length: totalSlides }).map((_, index) => {
                const isActive = index === currentIndex
                const isCompleted = index < currentIndex

                return (
                  <button
                    className="relative h-1 w-18 hd:w-24 overflow-hidden cursor-pointer transition-all duration-300 bg-white/30"
                    onClick={() => handleDotClick(index)}
                    // biome-ignore lint/suspicious/noArrayIndexKey: only for dots
                    key={index}
                    type="button"
                  >
                    <span
                      className="absolute inset-0 bg-white/60 transition-transform ease-linear"
                      style={{
                        transform:
                          isCompleted || isActive
                            ? 'translateX(0%)'
                            : 'translateX(-100%)',
                        transitionDuration: isActive
                          ? `${intervalTime}ms`
                          : '0ms',
                      }}
                      onTransitionEnd={() => {
                        active(index)
                      }}
                    />
                  </button>
                )
              })}
            </nav>
          </div>
          <div className="relative w-full px-24 flex items-center justify-center">
            <div className="relative transform-3d origin-left rotate-y-12 ">
              {clientImages.slice(0, 0).map((image, index) => (
                <img
                  src={image}
                  className="first:relative not-first:absolute left-[calc(var(--i)*16px)] top-[calc(var(--i)*-12px)] hd:left-[calc(var(--i)*32px)] hd:top-[calc(var(--i)*-24px)]"
                  style={
                    {
                      '--i': index,
                      zIndex: 10 - index,
                    } as React.CSSProperties
                  }
                  alt="screenshot"
                  key={image}
                />
              ))}
              {openPlatformImages.slice(0, -1).map((image, index) => (
                <img
                  src={image}
                  className="first:relative not-first:absolute left-[calc(var(--i)*16px)] top-[calc(var(--i)*-12px)] hd:left-[calc(var(--i)*32px)] hd:top-[calc(var(--i)*-24px)]"
                  style={
                    {
                      '--i': index,
                      zIndex: 10 - index,
                    } as React.CSSProperties
                  }
                  alt="screenshot"
                  key={image}
                />
              ))}
            </div>
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
