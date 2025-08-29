import type React from 'react'
import { useEffect, useRef } from 'react'

interface HexagonGridProps {
  backgroundColor?: string
  hexSize?: number
  gap?: number
  style?: React.CSSProperties
}

class Hexagon {
  private x: number
  private y: number
  private targetZ = 0
  private currentZ = 0
  private brightness = 0
  private points: { x: number; y: number }[]
  private isActive = false
  private lastActiveTime = 0
  private activeDuration = 1000
  private mouseDistance = Number.POSITIVE_INFINITY
  private mouseInfluence = 0
  private mouseTargetZ = 0
  private randomTargetZ = 0
  private hexSize: number
  private gap: number
  private opacity = 0
  private targetOpacity = 0
  private distanceFromCenter: number
  private ring = 0
  private transitionSpeed = 0.1

  constructor(
    x: number,
    y: number,
    hexSize: number,
    gap: number,
    centerX: number,
    centerY: number
  ) {
    this.x = x
    this.y = y
    this.hexSize = hexSize
    this.gap = gap
    this.points = this.calculatePoints()

    const dx = x - centerX
    const dy = y - centerY
    this.distanceFromCenter = Math.sqrt(dx * dx + dy * dy)
    this.ring = Math.floor(this.distanceFromCenter / (hexSize * 1.5))
  }

  calculatePoints(): { x: number; y: number }[] {
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3
      const xPos = this.x + (this.hexSize - this.gap) * Math.cos(angle)
      const yPos = this.y + (this.hexSize - this.gap) * Math.sin(angle)
      points.push({ x: xPos, y: yPos })
    }
    return points
  }

  updateMouseInfluence(mouseX: number, mouseY: number): void {
    const dx = mouseX - this.x
    const dy = mouseY - this.y
    this.mouseDistance = Math.sqrt(dx * dx + dy * dy)
    const influenceRadius = 150

    if (this.mouseDistance < influenceRadius) {
      this.mouseInfluence = 1 - this.mouseDistance / influenceRadius
      this.mouseTargetZ = 20 * this.mouseInfluence
    } else {
      this.mouseInfluence = 0
      this.mouseTargetZ = 0
    }
  }

  activate(time: number, strength = 1): void {
    if (strength > 0.1) {
      this.isActive = true
      this.lastActiveTime = time
      this.randomTargetZ = 20 * strength
    }
  }

  reset(): void {
    this.mouseInfluence = 0
    this.mouseTargetZ = 0
    this.mouseDistance = Number.POSITIVE_INFINITY
  }

  startAnimation(maxRings: number) {
    const delay = (this.ring / maxRings) * 1000
    setTimeout(() => {
      this.targetOpacity = 1
    }, delay)
  }

  update(time: number): void {
    if (this.isActive) {
      const timeSinceActivation = time - this.lastActiveTime
      if (timeSinceActivation > this.activeDuration) {
        this.isActive = false
        this.randomTargetZ = 0
      }
    }

    this.targetZ = Math.max(this.mouseTargetZ, this.randomTargetZ)
    this.currentZ += (this.targetZ - this.currentZ) * 0.1
    this.brightness = this.currentZ / 20
    this.opacity += (this.targetOpacity - this.opacity) * this.transitionSpeed
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.opacity <= 0) return

    ctx.globalAlpha = this.opacity

    ctx.beginPath()
    this.points.forEach((point, i) => {
      const shadowPoint = {
        x: point.x + this.currentZ * 0.5,
        y: point.y + this.currentZ * 0.5,
      }
      if (i === 0) ctx.moveTo(shadowPoint.x, shadowPoint.y)
      else ctx.lineTo(shadowPoint.x, shadowPoint.y)
    })
    ctx.closePath()
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    ctx.fill()

    ctx.beginPath()
    this.points.forEach((point, i) => {
      const elevatedPoint = {
        x: point.x - this.currentZ * 0.5,
        y: point.y - this.currentZ * 0.5,
      }
      if (i === 0) ctx.moveTo(elevatedPoint.x, elevatedPoint.y)
      else ctx.lineTo(elevatedPoint.x, elevatedPoint.y)
    })
    ctx.closePath()

    const gradient = ctx.createLinearGradient(
      this.x - this.hexSize,
      this.y - this.hexSize,
      this.x + this.hexSize,
      this.y + this.hexSize
    )
    gradient.addColorStop(0, '#0a0a0a')
    gradient.addColorStop(1, '#141414')
    ctx.fillStyle = gradient
    ctx.fill()

    if (this.brightness > 0) {
      ctx.strokeStyle = `rgba(100, 255, 218, ${this.brightness * 0.7})`
      ctx.lineWidth = 2
      ctx.stroke()

      const innerGlow = ctx.createLinearGradient(
        this.x - this.hexSize,
        this.y - this.hexSize,
        this.x + this.hexSize,
        this.y + this.hexSize
      )
      innerGlow.addColorStop(0, `rgba(100, 255, 218, ${this.brightness * 0.2})`)
      innerGlow.addColorStop(1, 'rgba(100, 255, 218, 0)')
      ctx.fillStyle = innerGlow
      ctx.fill()
    }

    ctx.globalAlpha = 1
  }

  getRing(): number {
    return this.ring
  }
}

export const HexagonGrid: React.FC<HexagonGridProps> = ({
  backgroundColor = '#000000',
  hexSize = 40,
  gap = 2,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hexagonsRef = useRef<Hexagon[]>([])
  const isMouseOnScreenRef = useRef(false)
  const randomActivationTimerRef = useRef<number>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight

      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`

      ctx.scale(dpr, dpr)
    }

    const createHexGrid = () => {
      const hexWidth = hexSize * 2
      const hexHeight = Math.sqrt(3) * hexSize

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const numRows = Math.ceil(canvas.height / hexHeight) + 2
      const numCols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2

      const startX = centerX - (numCols * hexWidth * 0.75) / 2
      const startY = centerY - (numRows * hexHeight) / 2

      hexagonsRef.current = []

      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = startX + col * hexWidth * 0.75
          const y = startY + row * hexHeight + (col % 2) * (hexHeight / 2)
          const hex = new Hexagon(x, y, hexSize, gap, centerX, centerY)
          hexagonsRef.current.push(hex)
        }
      }

      const maxRings = Math.max(
        ...hexagonsRef.current.map((hex) => hex.getRing())
      )

      for (const hex of hexagonsRef.current) {
        hex.startAnimation(maxRings)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1

      const isInCanvas =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom

      if (!isInCanvas) {
        isMouseOnScreenRef.current = false
        for (const hex of hexagonsRef.current) {
          hex.reset()
        }
        return
      }

      if (!isMouseOnScreenRef.current) {
        isMouseOnScreenRef.current = true
      }

      const mouseX = (e.clientX - rect.left) * dpr
      const mouseY = (e.clientY - rect.top) * dpr

      for (const hex of hexagonsRef.current) {
        hex.updateMouseInfluence(mouseX / dpr, mouseY / dpr)
      }
    }

    const handleMouseLeave = () => {
      isMouseOnScreenRef.current = false
      for (const hex of hexagonsRef.current) {
        hex.reset()
      }
    }

    const animate = (time: number) => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const hex of hexagonsRef.current) {
        hex.update(time)
        hex.draw(ctx)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const activateRandomHexagons = () => {
      if (hexagonsRef.current.length === 0) return

      const activationCount = 1 + Math.floor(Math.random() * 30)

      for (let i = 0; i < activationCount; i++) {
        const randomIndex = Math.floor(
          Math.random() * hexagonsRef.current.length
        )
        const randomHex = hexagonsRef.current[randomIndex]
        const randomStrength = 0.3 + Math.random() * 0.5
        randomHex.activate(performance.now(), randomStrength)
      }

      const nextInterval = 500 + Math.random() * 1500
      randomActivationTimerRef.current = window.setTimeout(
        activateRandomHexagons,
        nextInterval
      )
    }

    let animationFrameId: number

    setupCanvas()
    createHexGrid()
    activateRandomHexagons()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', () => {
      setupCanvas()
      createHexGrid()
    })

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', () => {
        setupCanvas()
        createHexGrid()
      })
      cancelAnimationFrame(animationFrameId)
      if (randomActivationTimerRef.current) {
        clearTimeout(randomActivationTimerRef.current)
      }
    }
  }, [backgroundColor, hexSize, gap])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: backgroundColor,
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}

export default HexagonGrid
