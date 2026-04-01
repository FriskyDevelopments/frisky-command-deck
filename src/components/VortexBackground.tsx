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

const cryptoStrings = [
  'GX-7A2B', 'SIG_VOID', 'INTAKE_ACTIVE', 'NODE_1132', 'GHOST_ID',
  'CORE_PRIME', 'VOID_LINE', 'AUTH_OK', 'SIGNAL_ACK', 'VAULT_OPEN',
  'CIPHER_X9', 'DELTA_7', 'SYNC_ACTIVE', 'STREAM_OK', 'WOLF_CORE',
  'HASH_7F2A', 'KEY_ALPHA', 'OMEGA_SEC', 'BREACH_NO', 'SECURE_YES'
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
      dataStringsRef.current = Array.from({ length: 40 }, () => ({
        text: cryptoStrings[Math.floor(Math.random() * cryptoStrings.length)],
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 2000 + 500,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      }))
    }
    initDataStrings()

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      dataStringsRef.current.forEach((str) => {
        str.z -= str.speed

        if (str.z <= 0) {
          str.z = 2000
          str.x = (Math.random() - 0.5) * 1000
          str.y = (Math.random() - 0.5) * 1000
          str.text = cryptoStrings[Math.floor(Math.random() * cryptoStrings.length)]
        }

        const scale = 1000 / str.z
        const x = centerX + str.x * scale
        const y = centerY + str.y * scale
        const size = (1 - str.z / 2000) * 20 + 8

        if (x < -100 || x > canvas.width + 100 || y < -100 || y > canvas.height + 100) {
          return
        }

        const baseColor = focusColor || '#8B5CF6'
        const blueColor = '#3B82F6'
        const progress = (str.z / 2000)
        
        ctx.save()
        ctx.globalAlpha = str.opacity * (1 - progress)
        
        const gradient = ctx.createLinearGradient(x - 20, y, x + 20, y)
        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(1, blueColor)
        
        ctx.fillStyle = gradient
        ctx.font = `${size}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        ctx.shadowBlur = 15
        ctx.shadowColor = baseColor
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
