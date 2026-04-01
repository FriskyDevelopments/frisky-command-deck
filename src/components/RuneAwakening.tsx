import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface RuneAwakeningProps {
  phase: 'dormant' | 'ignition' | 'awakening' | 'presence' | 'emergence' | 'complete'
  onPhaseComplete?: () => void
}

interface Rune {
  glyph: string
  x: number
  y: number
  opacity: number
  scale: number
  rotation: number
  velocity: { x: number; y: number }
  targetOpacity: number
  cluster: number
}

const FRISKY_RUNES = [
  'ᚠ', 'ᚱ', 'ᚢ', 'ᚾ', 'ᛖ', '᛫', '◬', '◭', '◮', '◯',
  '⬡', '⬢', '⬣', '△', '▽', '◇', '◈', '⟡', '⟢', '⟣',
  '╱', '╲', '╳', '┃', '━', '┄', '┅', '┆', '┇', '┈',
  '⌬', '⌭', '⌮', '⌯', '⍝', '⍞', '⍟', '⍢', '⍣', '⍤'
]

const RUNE_PHRASES = [
  'ᚠRISK // SIGIL_ACTIVE',
  'WOLF_CORE :: AWAKENING',
  'RUNE_STREAM // UNSEALED',
  'VOID_LINE :: BREATHING',
  'GLYPH_SYNC // TRUE',
  'SHADOW_MARK // ACCEPTED',
  'ANCHOR_SEAL // LOCKED',
  'ᚱᚢᚾᛖ // SIGNAL // FRACTURE',
  'SYN // WOLF // VEIL',
  'GLASS_SIGIL // LIVE',
  '◬◭◮ STREAM_DECODE ◯⬡⬢',
  'CIPHER_RUNE ⟡ ALIGNED',
  'MYTH_TECH ⌬ ONLINE',
  'FRISKY ⍝ DOCTRINE ⍞ SEALED'
]

export function RuneAwakening({ phase, onPhaseComplete }: RuneAwakeningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const runesRef = useRef<Rune[]>([])
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const initRunes = () => {
      const runeCount = phase === 'dormant' ? 40 : 120
      runesRef.current = Array.from({ length: runeCount }, (_, i) => ({
        glyph: FRISKY_RUNES[Math.floor(Math.random() * FRISKY_RUNES.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: phase === 'dormant' ? Math.random() * 0.05 : 0,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        velocity: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3
        },
        targetOpacity: 0,
        cluster: Math.floor(i / 15)
      }))
    }

    if (runesRef.current.length === 0) {
      initRunes()
    }

    const updateRuneTargets = () => {
      switch (phase) {
        case 'dormant':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = Math.random() * 0.08
          })
          break
        case 'ignition':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = Math.random() * 0.3 + 0.1
          })
          break
        case 'awakening':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = Math.random() * 0.5 + 0.2
          })
          break
        case 'presence':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = Math.random() * 0.7 + 0.3
          })
          break
        case 'emergence':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = Math.random() * 0.8 + 0.4
          })
          break
        case 'complete':
          runesRef.current.forEach(rune => {
            rune.targetOpacity = 0
          })
          break
      }
    }

    updateRuneTargets()

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      runesRef.current.forEach((rune) => {
        rune.opacity += (rune.targetOpacity - rune.opacity) * 0.02
        
        if (phase !== 'dormant') {
          rune.x += rune.velocity.x
          rune.y += rune.velocity.y
          rune.rotation += 0.002

          if (rune.x < 0 || rune.x > canvas.width) rune.velocity.x *= -1
          if (rune.y < 0 || rune.y > canvas.height) rune.velocity.y *= -1
        }

        ctx.save()
        ctx.translate(rune.x, rune.y)
        ctx.rotate(rune.rotation)
        ctx.globalAlpha = rune.opacity
        
        const size = 20 + rune.scale * 30
        ctx.font = `${size}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        const colors = {
          dormant: '#59547b',
          ignition: '#8B5CF6',
          awakening: '#3B82F6',
          presence: '#10B981',
          emergence: '#06B6D4',
          complete: '#59547b'
        }
        
        ctx.fillStyle = colors[phase]
        ctx.shadowBlur = phase === 'dormant' ? 5 : 15 + rune.opacity * 20
        ctx.shadowColor = colors[phase]
        
        ctx.fillText(rune.glyph, 0, 0)
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
  }, [phase])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#050505' }}
    />
  )
}
