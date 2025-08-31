import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { calculate3DTransform } from '../utils/transform3d'

function parseTransformToCSSVars(transform: string, opacity: number) {
  const translateXMatch = transform.match(/translateX\(([^)]+)\)/)
  const translateYMatch = transform.match(/translateY\(([^)]+)\)/)
  const translateZMatch = transform.match(/translateZ\(([^)]+)\)/)
  const rotateXMatch = transform.match(/rotateX\(([^)]+)\)/)
  const rotateYMatch = transform.match(/rotateY\(([^)]+)\)/)
  const scaleMatch = transform.match(/scale\(([^)]+)\)/)

  return {
    '--origin-translateX': translateXMatch ? translateXMatch[1] : '0',
    '--origin-translateY': translateYMatch ? translateYMatch[1] : '0',
    '--origin-translateZ': translateZMatch ? translateZMatch[1] : '0',
    '--origin-rotateX': rotateXMatch ? rotateXMatch[1] : '0deg',
    '--origin-rotateY': rotateYMatch ? rotateYMatch[1] : '0deg',
    '--origin-scale': scaleMatch ? scaleMatch[1] : '1',
    '--origin-opacity': opacity.toString(),
  } as React.CSSProperties
}

interface CarouselViewerProps {
  images: string[]
  currentIndex: number
  totalSlides: number
  onItemClick?: (index: number) => void
  className?: string
}

export interface CarouselViewerRef {
  slideIn: () => void
  slideOut: () => void
}

interface AnimationState {
  isAnimating: boolean
  direction: 'in' | 'out' | null
}

interface VisibleItem {
  virtualIndex: number
  realIndex: number
  image: string
}

interface CarouselRenderProps {
  visibleItems: VisibleItem[]
  currentIndex: number
  onItemClick?: (index: number) => void
  className: string
  getImgTransformSeries: (index: number) => any
}

const NormalCarousel = ({
  visibleItems,
  currentIndex,
  onItemClick,
  className,
  getImgTransformSeries,
}: CarouselRenderProps) => (
  <div
    className={`relative transform-3d ${className}`}
    style={{ perspective: '2000px' }}
  >
    {visibleItems.map(({ virtualIndex, realIndex, image }) => {
      const relativeIndex = virtualIndex - currentIndex
      const transform3D = getImgTransformSeries(relativeIndex)
      const finalOpacity = relativeIndex >= 0 ? transform3D.opacity || 0 : 0

      return (
        <figure
          key={virtualIndex}
          className="absolute left-0 top-0 first:relative transition-all duration-500 ease"
          style={{
            transform: transform3D.transform,
            opacity: finalOpacity,
            zIndex: transform3D.zIndex,
          }}
        >
          <button
            className="block border-0 bg-transparent p-0 cursor-pointer"
            onClick={() => onItemClick?.(realIndex)}
            type="button"
            aria-label="Select carousel item"
          >
            <img
              src={image}
              className="shadow-white/5 shadow-2xl hover:shadow-white/10 transition-shadow duration-300"
              alt="carousel item"
            />
          </button>
        </figure>
      )
    })}
  </div>
)

interface AnimatedCarouselProps extends CarouselRenderProps {
  animationState: AnimationState
}

const AnimatedCarousel = ({
  visibleItems,
  currentIndex,
  onItemClick,
  className,
  getImgTransformSeries,
  animationState,
}: AnimatedCarouselProps) => (
  <div
    className={`relative transform-3d ${className}`}
    style={{ perspective: '2000px' }}
  >
    {visibleItems.map(({ virtualIndex, realIndex, image }) => {
      const relativeIndex = virtualIndex - currentIndex
      const transform3D = getImgTransformSeries(relativeIndex)
      const staggerDelay = 50
      const itemDelay = Math.abs(relativeIndex) * staggerDelay

      const finalOpacity = relativeIndex >= 0 ? transform3D.opacity || 0 : 0

      const cssVars = parseTransformToCSSVars(
        transform3D.transform,
        finalOpacity
      )

      const animationName =
        animationState.direction === 'in'
          ? 'slideInFromBottom'
          : animationState.direction === 'out'
            ? 'slideOutToBottom'
            : ''

      return (
        <figure
          key={virtualIndex}
          className="absolute left-0 top-0 first:relative"
          style={{
            ...cssVars,
            zIndex: transform3D.zIndex,
            animationName,
            animationDuration: '0.8s',
            animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            animationDelay: `${itemDelay}ms`,
            animationFillMode: 'both',
          }}
        >
          <button
            className="block border-0 bg-transparent p-0 cursor-pointer"
            onClick={() => onItemClick?.(realIndex)}
            type="button"
            aria-label="Select carousel item"
          >
            <img
              src={image}
              className="shadow-white/5 shadow-2xl hover:shadow-white/10 transition-shadow duration-300"
              alt="carousel item"
            />
          </button>
        </figure>
      )
    })}
  </div>
)

const CarouselViewer = forwardRef<CarouselViewerRef, CarouselViewerProps>(
  ({ images, currentIndex, totalSlides, onItemClick, className = '' }, ref) => {
    const [animationState, setAnimationState] = useState<AnimationState>({
      isAnimating: false,
      direction: null,
    })

    const previousIndexRef = useRef(currentIndex)

    const getImgTransformSeries = useCallback(
      (index: number) =>
        calculate3DTransform(index, {
          rotateY: -30,
          rotateX: -10,
          spacingX: 80,
          spacingY: -60,
          spacingZ: -120,
        }),
      []
    )

    const slideIn = useCallback(() => {
      setAnimationState({
        isAnimating: true,
        direction: 'in',
      })
    }, [])

    const slideOut = useCallback(() => {
      setAnimationState({
        isAnimating: true,
        direction: 'out',
      })
    }, [])

    useEffect(() => {
      if (
        previousIndexRef.current !== currentIndex &&
        animationState.isAnimating
      ) {
        setAnimationState({
          isAnimating: false,
          direction: null,
        })
      }
      previousIndexRef.current = currentIndex
    }, [currentIndex, animationState.isAnimating])

    useImperativeHandle(
      ref,
      () => ({
        slideIn,
        slideOut,
      }),
      [slideIn, slideOut]
    )

    const visibleRange = 8
    const visibleItems: VisibleItem[] = []

    for (let i = -visibleRange; i <= visibleRange; i++) {
      const virtualIndex = currentIndex + i
      const realIndex =
        ((virtualIndex % totalSlides) + totalSlides) % totalSlides
      const image = images[realIndex]

      visibleItems.push({
        virtualIndex,
        realIndex,
        image,
      })
    }

    const commonProps = {
      visibleItems,
      currentIndex,
      onItemClick,
      className,
      getImgTransformSeries,
    }

    return animationState.isAnimating ? (
      <AnimatedCarousel {...commonProps} animationState={animationState} />
    ) : (
      <NormalCarousel {...commonProps} />
    )
  }
)

CarouselViewer.displayName = 'CarouselViewer'

export default CarouselViewer
