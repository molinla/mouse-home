import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  calculate3DTransform,
  type Transform3DResult,
} from '../utils/transform3d'

export interface CarouselParameters {
  rotateY: number
  rotateX: number
  spacingX: number
  spacingY: number
  spacingZ: number
  scale: number
  perspective: number
  visibleRange: number
  staggerDelay: number
  animationDuration: number
  easingX1: number
  easingY1: number
  easingX2: number
  easingY2: number
}

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
  parameters: CarouselParameters
}

export interface CarouselViewerRef {
  slideIn: () => void
  slideOut: () => void
  stopAnimation: () => void
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
  getImgTransformSeries: (index: number) => Transform3DResult
  parameters: CarouselParameters
}

const NormalCarousel = memo(
  ({
    visibleItems,
    currentIndex,
    onItemClick,
    className,
    getImgTransformSeries,
    parameters,
  }: CarouselRenderProps) => (
    <div
      className={`relative transform-3d ${className}`}
      style={{ perspective: `${parameters.perspective}px` }}
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
                style={{ clipPath: 'inset(3px)' }}
                alt="carousel item"
              />
            </button>
          </figure>
        )
      })}
    </div>
  )
)

interface AnimatedCarouselProps extends CarouselRenderProps {
  animationState: AnimationState
}

const AnimatedCarousel = memo(
  ({
    visibleItems,
    currentIndex,
    onItemClick,
    className,
    getImgTransformSeries,
    animationState,
    parameters,
  }: AnimatedCarouselProps) => (
    <div
      className={`relative transform-3d ${className}`}
      style={{ perspective: `${parameters.perspective}px` }}
    >
      {visibleItems.map(({ virtualIndex, realIndex, image }) => {
        const relativeIndex = virtualIndex - currentIndex
        const transform3D = getImgTransformSeries(relativeIndex)
        const itemDelay = Math.abs(relativeIndex) * parameters.staggerDelay

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
              animationDuration: `${parameters.animationDuration}s`,
              animationTimingFunction: `cubic-bezier(${parameters.easingX1}, ${parameters.easingY1}, ${parameters.easingX2}, ${parameters.easingY2})`,
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
                style={{ clipPath: 'inset(3px)' }}
                alt="carousel item"
              />
            </button>
          </figure>
        )
      })}
    </div>
  )
)

const CarouselViewer = forwardRef<CarouselViewerRef, CarouselViewerProps>(
  (
    {
      images,
      currentIndex,
      totalSlides,
      onItemClick,
      className = '',
      parameters,
    },
    ref
  ) => {
    const [animationState, setAnimationState] = useState<AnimationState>({
      isAnimating: false,
      direction: null,
    })

    const previousIndexRef = useRef(currentIndex)

    const getImgTransformSeries = useCallback(
      (index: number) =>
        calculate3DTransform(index, {
          rotateY: parameters.rotateY,
          rotateX: parameters.rotateX,
          spacingX: parameters.spacingX,
          spacingY: parameters.spacingY,
          spacingZ: parameters.spacingZ,
          scale: parameters.scale,
        }),
      [parameters]
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

    const stopAnimation = useCallback(() => {
      setAnimationState({
        isAnimating: false,
        direction: null,
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
        stopAnimation,
      }),
      [slideIn, slideOut, stopAnimation]
    )

    const visibleRange = parameters.visibleRange

    const visibleItems: VisibleItem[] = useMemo(() => {
      const items: VisibleItem[] = []
      for (let i = -visibleRange; i <= visibleRange; i++) {
        const virtualIndex = currentIndex + i
        const realIndex =
          ((virtualIndex % totalSlides) + totalSlides) % totalSlides
        const image = images[realIndex]

        items.push({
          virtualIndex,
          realIndex,
          image,
        })
      }
      return items
    }, [currentIndex, totalSlides, images, visibleRange])

    const commonProps = {
      visibleItems,
      currentIndex,
      onItemClick,
      className,
      getImgTransformSeries,
      parameters,
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
