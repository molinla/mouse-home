import {
  createDraggable,
  createScope,
  createSpring,
  createTimeline,
  type Scope,
} from 'animejs'
import { useEffect, useRef } from 'react'
import device from '../assets/imgs/device.png'
import LightRays from '../hero-sections/light-rays'
import TextType from '../hero-sections/text-type'

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)
  const scope = useRef<Scope | null>(null)

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      const timeline = createTimeline()
      const spring = createSpring({ mass: 0.5, stiffness: 100, damping: 20 })
      timeline
        .label('hero-section')
        .add('.title', {
          y: {
            from: '100%',
            to: '0',
            duration: 600,
            ease: spring,
          },
          opacity: {
            from: 0,
            to: 1,
            duration: 600,
            delay: 100,
          },
        })
        .add('.slogan', {
          y: {
            from: '6rem',
            to: '0',
            duration: 600,
            ease: spring,
          },
          opacity: {
            from: 0,
            to: 1,
            duration: 600,
            delay: 100,
          },
        })
        .add('.device', {
          y: {
            from: '50%',
            to: '0',
            duration: 400,
            ease: spring,
          },
          opacity: {
            from: 0,
            to: 1,
            duration: 600,
          },
        })

      createDraggable('.device', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 300, damping: 30 }),
      })
    })

    return () => scope.current?.revert()
  }, [])

  return (
    <section ref={root} className="relative h-screen overflow-hidden">
      <LightRays className="absolute inset-0 z-0" />
      <div className="absolute inset-0 top-0 text-white h-screen flex flex-col gap-8 hd:gap-12 pt-20 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <TextType
          as="p"
          variableSpeed={{ min: 50, max: 150 }}
          pauseDuration={3500}
          deletingSpeed={30}
          className="title opacity-0 text-3xl font-bold md:text-6xl hd:text-7xl"
          text={[
            '全面聚合AI边缘计算视觉深度学习',
            '智能边缘设备·实时AI视觉处理',
            '深度学习算法·边缘计算加速',
            '一站式AI视觉解决方案',
            '边缘智能·赋能视觉创新',
          ]}
        />
        <p className="slogan opacity-0 animated-gradient text-xl md:text-3xl hd:text-5xl font-bold whitespace-nowrap">
          黑匣HEX·AI Deep learning
        </p>
        <img
          className="opacity-0 device mt-10 hd:mt-20 hd:scale-125"
          width={723}
          height={407}
          src={device}
          alt="device"
        />
      </div>
      <div className="absolute z-10 bg-[#F4CD2E] bottom-0 blur-[541px] left-0 size-[340px] rounded-full opacity-30"></div>
      <div className="absolute z-10 bg-[#ED9BFC] bottom-0 blur-[541px] right-0 size-[340px] rounded-full opacity-30"></div>
      <nav className="absolute bottom-4 left-0 w-full flex items-center justify-center z-20">
        <button
          type="button"
          className="bg-transparent border-none animate-bounce"
        >
          <svg
            role="presentation"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white animate-pulse"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </section>
  )
}
