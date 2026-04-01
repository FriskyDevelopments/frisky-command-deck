import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface IngressTerminalProps {
  onBootComplete: () => void
}

interface BootLog {
  delay: number
  text: string
  type: 'system' | 'auth' | 'success' | 'module' | 'critical'
}

const bootSequence = [
  { delay: 0, text: '> INITIALIZING SYNDICATE HUB...', type: 'system' },
  { delay: 400, text: '> ESTABLISHING SECURE CONNECTION...', type: 'system' },
  { delay: 800, text: '> CONNECTING TO SYNDICATE REPOSITORIES...', type: 'system' },
  { delay: 1400, text: '> AUTHENTICATING GHOST_ID GX-7A2B...', type: 'auth' },
  { delay: 1800, text: '  ✓ GHOST VERIFIED', type: 'success' },
  { delay: 2000, text: '> LOADING CORE MODULES...', type: 'system' },
  { delay: 2300, text: '  ├─ initializing intake...', type: 'module' },
  { delay: 2500, text: '  ├─ linking void_line...', type: 'module' },
  { delay: 2700, text: '  ├─ waking engine...', type: 'module' },
  { delay: 2900, text: '  ├─ syncing shadow...', type: 'module' },
  { delay: 3100, text: '  └─ anchor locked.', type: 'module' },
  { delay: 3500, text: '> ACTIVATING WOLF PROTOCOL...', type: 'critical' },
  { delay: 3900, text: '  ✓ WOLF_CORE ONLINE', type: 'success' },
  { delay: 4200, text: '> SYNC COMPLETE. WELCOME TO THE SYNDICATE.', type: 'success' },
  { delay: 4600, text: '> ENGAGING COMMAND INTERFACE...', type: 'system' }
]

export function IngressTerminal({ onBootComplete }: IngressTerminalProps) {
  const [logs, setLogs] = useState<BootLog[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    bootSequence.forEach(({ delay, text, type }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, { delay, text, type } as BootLog])
      }, delay)
    })

    setTimeout(() => {
      setIsComplete(true)
      setTimeout(onBootComplete, 800)
    }, 5000)
  }, [onBootComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      style={{ pointerEvents: isComplete ? 'none' : 'auto' }}
    >
      <div className="w-full max-w-3xl px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div className="text-xs uppercase tracking-[0.3em] text-primary font-light">
            Syndicate Ingress Terminal
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="space-y-2 font-mono text-sm">
          {logs.map((log, index) => {
            const colorClass = 
              log.type === 'success' ? 'text-[var(--matrix-green)]' :
              log.type === 'critical' ? 'text-primary' :
              log.type === 'auth' ? 'text-[var(--neon-cyan)]' :
              log.type === 'module' ? 'text-muted-foreground' :
              'text-foreground/90'
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={colorClass}
              >
                {log.text}
              </motion.div>
            )
          })}
          {logs.length > 0 && !isComplete && (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary"
            >
              ▊
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
