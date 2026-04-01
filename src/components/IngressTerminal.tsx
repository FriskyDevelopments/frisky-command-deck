import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface IngressTerminalProps {
  onBootComplete: () => void
}

const bootSequence = [
  { delay: 0, text: '> INITIALIZING SYNDICATE HUB...' },
  { delay: 400, text: '> ESTABLISHING SECURE CONNECTION...' },
  { delay: 800, text: '> CONNECTING TO SYNDICATE REPOSITORIES...' },
  { delay: 1400, text: '> AUTHENTICATING GHOST_ID GX-7A2B...' },
  { delay: 1800, text: '> LOADING CORE MODULES...' },
  { delay: 2200, text: '  ├─ THE INTAKE: LOADED' },
  { delay: 2400, text: '  ├─ THE VOID_LINE: LOADED' },
  { delay: 2600, text: '  ├─ THE ENGINE: LOADED' },
  { delay: 2800, text: '  ├─ THE SHADOW: LOADED' },
  { delay: 3000, text: '  └─ THE ANCHOR: LOADED' },
  { delay: 3400, text: '> ACTIVATING WOLF PROTOCOL...' },
  { delay: 3800, text: '> SYNC COMPLETE. WELCOME TO THE SYNDICATE.' },
  { delay: 4200, text: '> ENGAGING COMMAND INTERFACE...' }
]

export function IngressTerminal({ onBootComplete }: IngressTerminalProps) {
  const [logs, setLogs] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    bootSequence.forEach(({ delay, text }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text])
      }, delay)
    })

    setTimeout(() => {
      setIsComplete(true)
      setTimeout(onBootComplete, 800)
    }, 4600)
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
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-foreground/90"
            >
              {log}
            </motion.div>
          ))}
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
