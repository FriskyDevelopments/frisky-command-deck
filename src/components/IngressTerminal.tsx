import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IngressTerminalProps {
  onComplete: () => void
}

type LogEntry = {
  text: string
  delay: number
  type: 'cursor' | 'command' | 'response'
}

const BOOT_SEQUENCE: LogEntry[] = [
  { text: '_', delay: 0, type: 'cursor' },
  { text: 'frisky@forge:~$ boot_syndicate', delay: 1200, type: 'command' },
  { text: '[OK] GHOST_AUTHORITY_SYNCED', delay: 2400, type: 'response' },
  { text: '[OK] VOID_LINE_CONNECTED_NODE_1132', delay: 3000, type: 'response' },
  { text: 'frisky@forge:~$ enter_forge', delay: 3800, type: 'command' }
]

export function IngressTerminal({ onComplete }: IngressTerminalProps) {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([])
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    BOOT_SEQUENCE.forEach((log) => {
      setTimeout(() => {
        setVisibleLogs((prev) => [...prev, log])
      }, log.delay)
    })

    setTimeout(() => {
      setFadeOut(true)
      setTimeout(onComplete, 800)
    }, 4500)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#050505' }}
        >
          <div className="w-full max-w-3xl px-8">
            <div className="space-y-3">
              {visibleLogs.map((log, index) => {
                const isCursor = log.type === 'cursor'
                const isCommand = log.type === 'command'
                const isResponse = log.type === 'response'

                return (
                  <motion.div
                    key={`${log.text}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: isCursor ? 0 : 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-mono tracking-wide"
                    style={{
                      fontSize: isCommand ? '18px' : '16px',
                      color: isCursor
                        ? 'rgba(139, 92, 246, 0.9)'
                        : isCommand
                        ? 'rgba(139, 92, 246, 0.8)'
                        : 'rgba(6, 182, 212, 0.9)',
                      textShadow: isCursor
                        ? '0 0 15px rgba(139, 92, 246, 0.6)'
                        : isResponse
                        ? '0 0 10px rgba(6, 182, 212, 0.4)'
                        : 'none',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {isCursor && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      >
                        {log.text}
                      </motion.span>
                    )}
                    {!isCursor && log.text}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
