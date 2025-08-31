import { cn } from '@heroui/react'
import { motion, useScroll, useTransform } from 'framer-motion'
import device from '../assets/imgs/device.png'
import LightRays from '../hero-sections/light-rays'
import TextType from '../hero-sections/text-type'

function Hero(props: { className?: string }) {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <motion.section
      className={cn('relative h-screen overflow-hidden', props.className)}
      initial="hidden"
      animate="visible"
      style={{ opacity }}
    >
      <LightRays className="absolute inset-0 z-0" />
      <div className="absolute inset-0 top-0 text-white h-screen flex flex-col gap-8 hd:gap-12 pt-20 items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: {
              y: '0%',
              opacity: 1,
              transition: {
                type: 'spring' as const,
                mass: 0.5,
                stiffness: 100,
                damping: 20,
                duration: 0.6,
                delay: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <TextType
            as="p"
            variableSpeed={{ min: 50, max: 150 }}
            pauseDuration={3500}
            deletingSpeed={30}
            className="text-3xl font-bold md:text-6xl hd:text-7xl"
            text={[
              '全面聚合AI边缘计算视觉深度学习',
              '智能边缘设备·实时AI视觉处理',
              '深度学习算法·边缘计算加速',
              '一站式AI视觉解决方案',
              '边缘智能·赋能视觉创新',
            ]}
          />
        </motion.div>
        <motion.p
          variants={{
            hidden: { y: 96, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 0.5,
                stiffness: 100,
                damping: 20,
                duration: 0.6,
                delay: 1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="animated-gradient text-xl md:text-3xl hd:text-5xl font-bold whitespace-nowrap"
        >
          黑匣HEX·AI Deep learning
        </motion.p>
        <motion.img
          variants={{
            hidden: { y: '50%', opacity: 0 },
            visible: {
              y: '0%',
              opacity: 1,
              transition: {
                type: 'spring' as const,
                mass: 0.5,
                stiffness: 100,
                damping: 20,
                duration: 0.4,
                delay: 1.5,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          className="mt-10 hd:mt-20 hd:scale-125 cursor-grab active:cursor-grabbing"
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
          className="bg-transparent border-none hd:scale-125"
        >
          <svg
            role="presentation"
            width="32"
            height="40"
            viewBox="0 0 40 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            style={{
              shapeRendering: 'geometricPrecision',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            <path
              d="M8 12 L20 20 L32 12"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-80 animate-pulse"
              style={{ animationDelay: '0s', animationDuration: '1.5s' }}
            />
            <path
              d="M8 22 L20 30 L32 22"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-80 animate-pulse"
              style={{ animationDelay: '0.3s', animationDuration: '1.5s' }}
            />
            <path
              d="M8 32 L20 40 L32 32"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-80 animate-pulse"
              style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}
            />
          </svg>
        </button>
      </nav>
    </motion.section>
  )
}

export default Hero
