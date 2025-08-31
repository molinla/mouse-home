import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'

interface HackerRainProps {
  className?: string
  updateInterval?: number
  rippleSpeed?: number
  rippleStep?: number
  maxRippleSize?: number
}

interface HackerRainRef {
  replay: () => void
}

const HackerRain = forwardRef<HackerRainRef, HackerRainProps>(
  (
    {
      className = '',
      updateInterval = 30,
      rippleSpeed = 20,
      rippleStep = 4,
      maxRippleSize = 300,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const animationRef = useRef<number>(null)

    const columnsRef = useRef<
      Array<{ y: number; trail: Array<{ char: string; y: number }> }>
    >([])
    const fontSize = 12
    const columnSpacing = 20
    const symbols =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポ'

    const ripplesRef = useRef<
      Array<{ x: number; y: number; r: number; lastUpdate: number }>
    >([])
    const lastUpdateTimeRef = useRef<number>(0)
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const debounce = useCallback((func: () => void, delay: number) => {
      return () => {
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current)
        }
        resizeTimeoutRef.current = setTimeout(func, delay)
      }
    }, [])

    const initializeColumns = useCallback((width: number) => {
      const columnCount = Math.floor(width / columnSpacing)
      columnsRef.current = Array(columnCount)
        .fill(null)
        .map(() => ({
          y: Math.floor(Math.random() * -200),
          trail: [],
        }))
    }, [])

    const replay = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      ripplesRef.current = []
      lastUpdateTimeRef.current = 0

      initializeColumns(canvas.width)

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }, [initializeColumns])

    useImperativeHandle(
      ref,
      () => ({
        replay,
      }),
      [replay]
    )

    const draw = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { width, height } = canvas
      const currentTime = Date.now()

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px monospace`

      const shouldUpdate =
        currentTime - lastUpdateTimeRef.current > updateInterval

      if (shouldUpdate) {
        columnsRef.current.forEach((column, i) => {
          const xPos = i * columnSpacing
          const trailLength = 10 + Math.floor(Math.random() * 11)

          column.trail.push({
            char: symbols.charAt(Math.floor(Math.random() * symbols.length)),
            y: column.y,
          })

          if (column.trail.length > trailLength) {
            column.trail.shift()
          }

          column.trail.forEach((trailChar, trailIndex) => {
            if (trailChar.y > 0 && trailChar.y < height + fontSize) {
              const fadeStartIndex = Math.floor(column.trail.length * 0.75)
              let opacity = 1
              if (trailIndex < fadeStartIndex) {
                opacity = 1 - (fadeStartIndex - trailIndex) / fadeStartIndex
              }
              ctx.fillStyle = `hsla(120, 100%, 35%, ${opacity})`
              ctx.fillText(trailChar.char, xPos, trailChar.y)
            }
          })

          if (column.y > height && Math.random() > 0.99) {
            columnsRef.current[i] = {
              y: 0,
              trail: [],
            }
          } else {
            columnsRef.current[i] = {
              ...column,
              y: column.y + fontSize,
            }
          }
        })

        lastUpdateTimeRef.current = currentTime
      }

      ripplesRef.current.forEach((rip) => {
        ctx.beginPath()
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(120, 100%, 35%, ${1 - rip.r / maxRippleSize})`
        ctx.lineWidth = 2
        ctx.stroke()

        if (currentTime - rip.lastUpdate > rippleSpeed) {
          rip.r += rippleStep
          rip.lastUpdate = currentTime
        }
      })
      ripplesRef.current = ripplesRef.current.filter((r) => r.r < maxRippleSize)

      animationRef.current = requestAnimationFrame(draw)
    }, [updateInterval, rippleSpeed, rippleStep, maxRippleSize])

    const handleResize = useCallback(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      initializeColumns(rect.width)
    }, [initializeColumns])

    const debouncedResize = useMemo(
      () => debounce(handleResize, 150),
      [debounce, handleResize]
    )

    const handleClick = useCallback((e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        ripplesRef.current.push({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          r: 0,
          lastUpdate: Date.now(),
        })
      }
    }, [])

    useEffect(() => {
      handleResize()
      window.addEventListener('resize', debouncedResize)

      window.addEventListener('click', handleClick)

      draw()

      return () => {
        window.removeEventListener('resize', debouncedResize)
        window.removeEventListener('click', handleClick)
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      }
    }, [draw, debouncedResize, handleClick, handleResize])

    return (
      <canvas
        style={{ backgroundColor: 'black' }}
        ref={canvasRef}
        className={className}
      />
    )
  }
)

HackerRain.displayName = 'HackerRain'

export default HackerRain
export type { HackerRainRef }
