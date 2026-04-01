import { useEffect, useRef } from 'react'

interface DataString {
  text: string
  x: number
  y: number
  z: number
  speed: number
  opacity: number
}

interface VortexBackgroundProps {
  focusColor?: string
}

const FRISKY_RUNE_STRINGS = [
  'ᚠRISK', 'SIGIL', 'WOLF', 'RUNE', 'VOID', 'GLYPH', 'SHADOW',  
  'ANCHOR', 'SYN', 'VEIL', 'GLASS', 'CIPHER', 'MYTH', 'FRISKY',
  'NODE_1132', 'GHOST_GX', 'CORE', 'STREAM', 'SIGNAL', 'FRACTURE',
  '◬◭◮', '⟡⟢⟣', '⌬⌭⌮', '△▽◇', '⬡⬢⬣', 'ᚱᚢᚾᛖ'
]

export function VortexBackground({ focusColor }: VortexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataStringsRef = useRef<DataString[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const initDataStrings = () => {
      dataStringsRef.current = Array.from({ length: 120 }, () => ({
        text: FRISKY_RUNE_STRINGS[Math.floor(Math.random() * FRISKY_RUNE_STRINGS.length)],
        x: (Math.random() - 0.5) * 1400,
        y: (Math.random() - 0.5) * 1400,
        z: Math.random() * 2500 + 500,
        speed: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.7 + 0.3
      }))
    }
    initDataStrings()

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.12)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      dataStringsRef.current.forEach((str) => {
        str.z -= str.speed

        if (str.z <= 0) {
          str.z = 2500
          str.x = (Math.random() - 0.5) * 1400
          str.y = (Math.random() - 0.5) * 1400
          str.text = FRISKY_RUNE_STRINGS[Math.floor(Math.random() * FRISKY_RUNE_STRINGS.length)]
        }

        const scale = 1000 / str.z
        const x = centerX + str.x * scale
        const y = centerY + str.y * scale
        const size = (1 - str.z / 2500) * 28 + 8

        if (x < -100 || x > canvas.width + 100 || y < -100 || y > canvas.height + 100) {
          return
        }

        const baseColor = focusColor || '#8B5CF6'
        const blueColor = '#3B82F6'
        const cyanColor = '#06B6D4'
        const progress = (str.z / 2500)
        const depth = 1 - progress
        
        ctx.save()
        ctx.globalAlpha = str.opacity * depth * 0.8
        
        const gradient = ctx.createLinearGradient(x - 40, y, x + 40, y)
        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(0.5, blueColor)
        gradient.addColorStop(1, cyanColor)
        
        ctx.fillStyle = gradient
        ctx.font = `${size}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        ctx.shadowBlur = 25 + (depth * 20)
        ctx.shadowColor = baseColor
        ctx.filter = `blur(${progress * 2}px)`
        ctx.fillText(str.text, x, y)
        
        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [focusColor])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#050505' }}
    />
  )
}
