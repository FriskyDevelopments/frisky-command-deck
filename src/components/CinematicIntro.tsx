import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RuneAwakening } from './RuneAwakening'
import { useHaptic } from '@/hooks/use-haptic'

interface CinematicIntroProps {
  onComplete: () => void
}

type Phase = 'dormant' | 'ignition' | 'awakening' | 'presence' | 'emergence' | 'complete'

const RUNE_DOCTRINE_LINES = [
  { text: '◬ ◭ ◮ ◯', delay: 2000, phase: 'dormant' },
  { text: 'ᚠRISK // SIGIL_ACTIVE', delay: 4500, phase: 'ignition' },
  { text: 'WOLF_CORE :: AWAKENING', delay: 5500, phase: 'ignition' },
  { text: 'RUNE_STREAM // UNSEALED', delay: 7000, phase: 'awakening' },
  { text: 'VOID_LINE :: BREATHING', delay: 8500, phase: 'awakening' },
  { text: 'GLYPH_SYNC // TRUE', delay: 10000, phase: 'awakening' },
  { text: 'ᚱᚢᚾᛖ // SIGNAL // FRACTURE', delay: 11500, phase: 'presence' },
  { text: 'SYN // WOLF // VEIL', delay: 12500, phase: 'presence' },
  { text: 'SHADOW_MARK // ACCEPTED', delay: 13500, phase: 'presence' },
  { text: 'ANCHOR_SEAL // LOCKED', delay: 14500, phase: 'presence' },
  { text: 'GLASS_SIGIL // LIVE', delay: 15500, phase: 'presence' },
  { text: '⟡ FRISKY SYNDICATE ⟡', delay: 16500, phase: 'emergence' },
  { text: '⌬ SYSTEM SUMMONED ⌬', delay: 17500, phase: 'emergence' }
]

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<Phase>('dormant')
  const [visibleLines, setVisibleLines] = useState<typeof RUNE_DOCTRINE_LINES>([])
  const [showTitle, setShowTitle] = useState(false)
  const [complete, setComplete] = useState(false)
  const { haptic } = useHaptic()

  useEffect(() => {
    const phaseTimings = [
      { delay: 0, phase: 'dormant' as Phase, hapticStyle: 'light' as const },
      { delay: 4000, phase: 'ignition' as Phase, hapticStyle: 'medium' as const },
      { delay: 7500, phase: 'awakening' as Phase, hapticStyle: 'medium' as const },
      { delay: 11000, phase: 'presence' as Phase, hapticStyle: 'heavy' as const },
      { delay: 16000, phase: 'emergence' as Phase, hapticStyle: 'impact' as const },
      { delay: 18500, phase: 'complete' as Phase, hapticStyle: 'notification' as const }
    ]

    phaseTimings.forEach(({ delay, phase: nextPhase, hapticStyle }) => {
      setTimeout(() => {
        setPhase(nextPhase)
        haptic(hapticStyle)
      }, delay)
    })

    RUNE_DOCTRINE_LINES.forEach(line => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        haptic('selection')
      }, line.delay)
    })

    setTimeout(() => {
      setShowTitle(true)
      haptic('heavy')
    }, 16800)
    
    setTimeout(() => {
      setComplete(true)
      haptic('impact')
      setTimeout(onComplete, 1200)
    }, 19000)

  }, [onComplete, haptic])

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-background"
          style={{ pointerEvents: complete ? 'none' : 'auto' }}
        >
          <RuneAwakening phase={phase} />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl px-8">
              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {visibleLines.map((line, index) => (
                    <motion.div
                      key={`${line.text}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ 
                        opacity: [0, 1, 0.7],
                        y: 0,
                        scale: 1
                      }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ 
                        duration: 1.8,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: {
                          times: [0, 0.3, 1],
                          duration: 2.5
                        }
                      }}
                      className="text-center font-mono text-sm md:text-base tracking-[0.3em] uppercase"
                      style={{
                        color: phase === 'ignition' ? '#8B5CF6' :
                               phase === 'awakening' ? '#3B82F6' :
                               phase === 'presence' ? '#10B981' :
                               phase === 'emergence' ? '#06B6D4' :
                               '#59547b',
                        textShadow: `0 0 ${phase === 'dormant' ? 5 : 20}px currentColor`,
                        filter: phase === 'dormant' ? 'blur(2px)' : 'blur(0px)'
                      }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {showTitle && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 2.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="mt-20 pt-20 border-t border-primary/20"
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-[0.5em] uppercase text-center mb-6"
                        style={{
                          color: '#06B6D4',
                          textShadow: '0 0 30px rgba(6, 182, 212, 0.5)'
                        }}>
                      Frisky Dev Syndicate
                    </h1>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      className="h-px w-96 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
                      style={{
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
                      }}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {phase !== 'dormant' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-primary"
                  style={{
                    boxShadow: '0 0 15px currentColor'
                  }}
                />
                <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-mono">
                  {phase === 'ignition' ? 'Igniting Runes' :
                   phase === 'awakening' ? 'System Awakening' :
                   phase === 'presence' ? 'Frisky Presence' :
                   phase === 'emergence' ? 'Vessel Emergence' :
                   'Dormant'}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
