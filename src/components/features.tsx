import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import lowCodeHome from '../assets/low-code-logo.svg'
import screenshot07 from '../assets/screenshots/client-find-my-device.png'
import screenshot05 from '../assets/screenshots/client-home.png'
import screenshot06 from '../assets/screenshots/client-model-training.png'
import screenshot08 from '../assets/screenshots/client-offline-update.png'
import screenshot01 from '../assets/screenshots/open-platform-01-home.png'
import screenshot02 from '../assets/screenshots/open-platform-02-running.png'
import screenshot03 from '../assets/screenshots/open-platform-03-editor.png'
import screenshot04 from '../assets/screenshots/open-platform-04-app-store.png'
import HackerRain, { type HackerRainRef } from '../hero-sections/hacker-rain'
import HexagonGrid from '../hero-sections/hexagon-grid'
import useCarousel from '../hook/useCarousel'
import CarouselProgressNav from './carousel-progress-nav'
import CarouselViewer, { type CarouselViewerRef } from './carousel-viewer'
import Footer from './footer'
import Hero from './hero'

const intervalTime = 3000
const COPY_WRITE_TEXT_OPEN_PLATFORM = [
  {
    title: 'AI边缘检测计算',
    description:
      '可以实现任何操作系统的所有桌面视觉的自动化，图册、桌面图像检测、网页图像检测，或你日常使用的任何其他应用程序的图像检测。',
    img: screenshot01,
  },
  {
    title: '安全与授权',
    description:
      '许可证系统：基于机器码的授权验证机制 项目加密：支持项目文件加密和密码保护 设备绑定：支持项目与特定设备绑定，防止非法复制',
    img: screenshot02,
  },
  {
    title: '全功能 IDE',
    description:
      '基于浏览器的集成开发环境、支持LUA脚本化开发和自动化任务、支持创建、编辑、删除和分享多个开发项目、支持SSDP协议，自动在网络中广播设备信息',
    img: screenshot03,
  },
  {
    title: '系统管理',
    description:
      '内置应用分发平台、模块化插件架构、支持重启、关机等系统级操作、完整的运行日志记录和查看功能',
    img: screenshot04,
  },
]

const COPY_WRITE_TEXT_CLIENT = [
  {
    title: '全平台兼容',
    description:
      '兼容 Windows、MacOS、Linux 主流操作系统，支持多平台开发和部署',
    img: screenshot05,
  },
  {
    title: '自定义模型训练',
    description: '支持自定义模型训练，如：人脸识别，物体识别，手势识别等',
    img: screenshot06,
  },
  {
    title: '多设备互通',
    description:
      '使用串口兼容调用外部设备，如：摄像头，机械臂，写字机器人等，支持多设备互通',
    img: screenshot07,
  },
  {
    title: '离线更新',
    description:
      '即使断网也可以使用，黑匣HEX可以控制您的键盘和鼠标，就像人一样操作',
    img: screenshot08,
  },
]

export interface WhatCanWeDoRef {
  enterStage2: () => void
  quitStage2: () => void
}

const RIGHT_TOWARDS = {
  rotateY: -30,
  rotateX: -10,
  spacingX: 80,
  spacingY: -60,
  spacingZ: -120,
  perspective: 2000,
  visibleRange: 8,
  staggerDelay: 50,
  animationDuration: 0.8,
  easingX1: 0.34,
  easingY1: 1.56,
  easingX2: 0.64,
  easingY2: 1,
  scale: 1,
}

const LEFT_TOWARDS = {
  rotateY: 30,
  rotateX: -10,
  spacingX: -80,
  spacingY: -60,
  spacingZ: -120,
  perspective: 2000,
  visibleRange: 8,
  staggerDelay: 50,
  animationDuration: 0.8,
  easingX1: 0.34,
  easingY1: 1.56,
  easingX2: 0.64,
  easingY2: 1,
  scale: 0.75,
}

const WhatCanWeDo = forwardRef<WhatCanWeDoRef>((_props, ref) => {
  const totalSlides = COPY_WRITE_TEXT_OPEN_PLATFORM.length

  const images = COPY_WRITE_TEXT_OPEN_PLATFORM.map((item) => item.img)
  const imagesClient = COPY_WRITE_TEXT_CLIENT.map((item) => item.img)

  const { currentIndex, virtualIndex, goTo, start, pause, next } = useCarousel({
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

  const { scrollYProgress } = useScroll()
  const fontSizeScale = useTransform(scrollYProgress, [0, 0.3], [300, 1])
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 0.35],
    ['rgb(255, 255, 255)', 'rgb(0, 0, 0)']
  )
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.4],
    [1, 1, 0]
  )
  const [isPointerEnabled, setIsPointerEnabled] = useState(false)
  const [isStage1Completed, setIsStage1Completed] = useState(false)
  const [shouldAnimateText, setShouldAnimateText] = useState(false)
  const [isInStage2, setIsInStage2] = useState(false)
  const previousScrollYProgressRef = useRef(0)

  useMotionValueEvent(fontSizeScale, 'change', (latest) => {
    setIsPointerEnabled(latest < 300)
    setIsStage1Completed(latest <= 1)
  })

  const hackerRainRef = useRef<HackerRainRef>(null)
  const carouselViewerRef = useRef<CarouselViewerRef>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enterStage2 = useCallback(() => {
    if (isInStage2) return
    setIsInStage2(true)
    hackerRainRef.current?.start()
    hackerRainRef.current?.replay()
    setShouldAnimateText(true)
    carouselViewerRef.current?.slideIn()
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    timerRef.current = setTimeout(() => {
      carouselViewerRef.current?.stopAnimation()
      start()
      timerRef.current = null
    }, 1000)
  }, [start, isInStage2])

  const quitStage2 = useCallback(() => {
    if (!isInStage2) return
    setIsInStage2(false)
    hackerRainRef.current?.stop()
    setShouldAnimateText(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    carouselViewerRef.current?.slideOut()
    pause()
  }, [pause, isInStage2])
  const [towards, setTowards] = useState<string>('right')

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const previous = previousScrollYProgressRef.current
    const isScrollingDown = latest > previous
    const isScrollingUp = latest < previous

    previousScrollYProgressRef.current = latest

    const shouldBeInStage2 = latest >= 0.35
    const shouldBeInStage3 = latest >= 0.85

    setTowards(latest > 0.6 ? 'left' : 'right')

    if (previous === 0 && shouldBeInStage2 && !shouldBeInStage3) {
      enterStage2()
      return
    }

    if (
      shouldBeInStage2 &&
      !isInStage2 &&
      isScrollingDown &&
      !shouldBeInStage3
    ) {
      enterStage2()
    } else if (!shouldBeInStage2 && isInStage2 && isScrollingUp) {
      quitStage2()
    }
  })

  const END_INDEX = 4

  const bannerIndex = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.7, 0.8, 0.9],
    [-1, 0, 1, 2, 3, END_INDEX]
  )

  useMotionValueEvent(bannerIndex, 'change', (latest) => {
    const tolerance = 0.005
    const targetValues = [0, 1, 2, 3, END_INDEX]

    for (const target of targetValues) {
      if (Math.abs(latest - target) < tolerance) {
        if (latest === END_INDEX) {
          return
        }
        next()
        break
      }
    }
  })

  useImperativeHandle(ref, () => ({
    enterStage2,
    quitStage2,
  }))

  return (
    <section
      style={{
        pointerEvents: isPointerEnabled ? 'auto' : 'none',
        mixBlendMode: isStage1Completed ? 'normal' : 'screen',
      }}
      className="fixed z-10 inset-0 w-full min-h-screen bg-white flex flex-col items-center justify-center gap-6 md:gap-12 md:px-12"
    >
      <motion.div
        style={{
          backgroundColor,
          opacity: backgroundOpacity,
        }}
        className="absolute inset-0 z-20 min-h-screen flex items-center justify-center pointer-events-none"
      >
        <motion.h1
          style={{ scale: fontSizeScale }}
          className="slogan text-3xl md:text-5xl lg:text-7xl font-bold text-center text-black"
        >
          黑匣边缘计算设备能做什么？
        </motion.h1>
      </motion.div>
      {isStage1Completed && (
        <div className="absolute inset-0 min-h-screen w-full z-10 overflow-hidden">
          <HackerRain
            className="absolute inset-0 w-screen h-screen"
            maxRippleSize={2000}
            ref={hackerRainRef}
          />
          <section className=" absolute mx-auto inset-0 z-10 max-w-7xl hd:max-w-9xl h-screen">
            <motion.header
              layout
              className={`absolute top-24 ${towards === 'right' ? 'left-4 hd:left-0' : 'right-4 hd:right-0'} flex flex-col gap-4 text-white ${towards === 'right' ? 'pr-[40vw]' : 'pl-[40vw]'} z-30`}
              initial={{ opacity: 0 }}
              animate={{ opacity: shouldAnimateText ? 1 : 0 }}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.h2
                  layout
                  key={`title-${currentIndex}`}
                  variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                  }}
                  initial="hidden"
                  animate={shouldAnimateText ? 'visible' : 'hidden'}
                  exit="exit"
                  transition={{
                    type: 'tween',
                    duration: 0.1,
                    ease: 'easeOut',
                  }}
                  className="text-3xl font-bold hd:text-6xl hd:leading-[1.5]"
                >
                  {towards === 'right'
                    ? COPY_WRITE_TEXT_OPEN_PLATFORM[currentIndex].title
                    : COPY_WRITE_TEXT_CLIENT[currentIndex].title}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                <motion.p
                  layout
                  key={`description-${currentIndex}`}
                  variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                  }}
                  initial="hidden"
                  animate={shouldAnimateText ? 'visible' : 'hidden'}
                  exit="exit"
                  transition={{
                    delay: 0.1,
                    duration: 0.1,
                    type: 'tween',
                    ease: 'easeOut',
                  }}
                  className="text-lg hd:text-2xl"
                >
                  {towards === 'right'
                    ? COPY_WRITE_TEXT_OPEN_PLATFORM[currentIndex].description
                    : COPY_WRITE_TEXT_CLIENT[currentIndex].description}
                </motion.p>
              </AnimatePresence>
              <motion.div
                layout
                variants={{
                  hidden: { opacity: 0, x: -150 },
                  visible: { opacity: 1, x: 0 },
                }}
                initial="hidden"
                animate={shouldAnimateText ? 'visible' : 'hidden'}
              >
                <CarouselProgressNav
                  className="mt-6"
                  totalSlides={totalSlides}
                  currentIndex={currentIndex}
                  intervalTime={intervalTime}
                  restartNonceByIndex={restartNonceByIndex}
                  onDotClick={handleDotClick}
                />
              </motion.div>
            </motion.header>
            <div className="relative w-full px-[20%] flex items-center justify-center">
              <CarouselViewer
                parameters={towards === 'right' ? RIGHT_TOWARDS : LEFT_TOWARDS}
                images={towards === 'right' ? images : imagesClient}
                currentIndex={virtualIndex}
                totalSlides={totalSlides}
                onItemClick={handleDotClick}
                className="sm:translate-y-[40vh] translate-y-[60vh]"
                ref={carouselViewerRef}
              />
            </div>
          </section>
        </div>
      )}
    </section>
  )
})

WhatCanWeDo.displayName = 'WhatCanWeDo'

function LowCode(props: { onQuit?: () => void }) {
  const START_PROGRESS = 0.8
  const [showLowCode, setShowLowCode] = useState(false)
  const [showStage3, setShowStage3] = useState(false)
  const unmountRef = useRef(false)

  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > START_PROGRESS) {
      if (!showStage3) {
        setShowStage3(true)
        unmountRef.current = false
      }
    } else {
      if (showStage3 && !unmountRef.current) {
        unmountRef.current = true
        if (props.onQuit) {
          props.onQuit()
        }
        setShowLowCode(false)
        setShowStage3(false)
      }
    }
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, START_PROGRESS, START_PROGRESS + 0.05],
    [0, 0, 1]
  )

  const fontScale = useTransform(
    scrollYProgress,
    [0, START_PROGRESS, START_PROGRESS + 0.05],
    [0, 0, 1]
  )

  const fontColor = useTransform(
    scrollYProgress,
    [0, START_PROGRESS, START_PROGRESS + 0.05],
    ['#ffffff', '#ffffff', '#000000']
  )

  return (
    <motion.section
      style={{
        pointerEvents: showStage3 ? 'auto' : 'none',
        opacity,
      }}
      className="fixed inset-0 z-30 w-full min-h-screen flex flex-col items-center justify-center bg-white"
    >
      {!showLowCode && (
        <div className="relative max-w-7xl mx-auto">
          <motion.h1
            onClick={() => {
              setShowLowCode(true)
            }}
            style={{ scale: fontScale, color: fontColor }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold text-black text-center cursor-pointer hover:!text-blue-600 active:!text-blue-700 active:scale-95 transition-all"
          >
            准备好搭建你的AI应用了吗？
          </motion.h1>
          <motion.button
            style={{
              opacity: fontScale,
              transformOrigin: 'left center',
            }}
            className="cursor-pointer absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-red-500 text-white text-xs md:text-sm px-3 py-0.5 rounded font-medium"
            animate={{
              rotate: [0, -5, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: 'easeInOut',
            }}
            onClick={() => {
              setShowLowCode(true)
            }}
          >
            点击
          </motion.button>
        </div>
      )}
      <AnimatePresence mode="popLayout">
        {showLowCode && <LowCodeHome key="low-code-home" />}
        {showLowCode && <Footer key="footer" className="absolute bottom-0" />}
      </AnimatePresence>
    </motion.section>
  )
}

function LowCodeHome() {
  return (
    <motion.div
      key="hexagon-grid"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      <HexagonGrid />
      <section className="absolute inset-0 flex flex-col gap-12 items-center justify-center">
        <motion.img
          src={lowCodeHome}
          alt="low-code-home"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />
        <motion.nav
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.4,
          }}
        >
          <motion.button
            style={{
              background: 'linear-gradient(253deg, #0055FF 47%, #4E89FF 100%)',
            }}
            className="text-white px-6 py-2 rounded w-48 cursor-pointer"
            type="button"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 20px rgba(0, 85, 255, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            立即使用
          </motion.button>
        </motion.nav>
      </section>
    </motion.div>
  )
}

export default function Features() {
  const whatCanWeDoRef = useRef<WhatCanWeDoRef>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.3) {
      setHeroVisible(false)
    } else {
      setHeroVisible(true)
    }
  })
  return (
    <article className="min-h-screen">
      {heroVisible && <Hero className="fixed inset-0" />}
      <WhatCanWeDo ref={whatCanWeDoRef} />
      <LowCode
        onQuit={() => {
          whatCanWeDoRef.current?.enterStage2()
        }}
      />
    </article>
  )
}
