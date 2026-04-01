import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CommandHeroProps {
  onAuthenticated?: (ghostId: string) => void
}

export function CommandHero({ onAuthenticated }: CommandHeroProps) {
  const [input, setInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ghostId, setGhostId] = useState('')
  const [response, setResponse] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim()) return

    const command = input.toLowerCase().trim()

    if (command === 'auth' || command === 'authenticate') {
      const id = `GX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      setGhostId(id)
      setIsAuthenticated(true)
      setResponse(`GHOST_AUTHORITY_VERIFIED :: ${id}`)
      setTimeout(() => {
        onAuthenticated?.(id)
      }, 1200)
    } else if (command === 'help' || command === '?') {
      setResponse('AVAILABLE_COMMANDS :: auth | help | status | clear')
    } else if (command === 'status') {
      setResponse('SYSTEM_STATUS :: OPERATIONAL')
    } else if (command === 'clear') {
      setResponse(null)
      setInput('')
      return
    } else {
      setResponse(`UNKNOWN_COMMAND :: ${input}`)
    }

    setInput('')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.4em] uppercase mb-6 text-foreground">
            Frisky
          </h1>
          <div className="h-px w-96 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-8" />
          <p className="font-mono text-sm text-muted-foreground tracking-wider uppercase">
            Boutique Development Studio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-md border border-border/50 rounded-lg px-6 py-4">
              <span className="font-mono text-primary text-sm shrink-0">
                frisky@forge:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isAuthenticated ? 'enter command...' : 'type "auth" to begin'}
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground/50"
                autoFocus
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-2 h-5 bg-primary"
              />
            </div>
          </form>

          {response && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 px-6 py-3 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg"
            >
              <p
                className="font-mono text-sm"
                style={{
                  color: response.includes('VERIFIED') || response.includes('OPERATIONAL')
                    ? 'rgba(6, 182, 212, 0.9)'
                    : response.includes('UNKNOWN')
                    ? 'rgba(239, 68, 68, 0.8)'
                    : 'rgba(156, 163, 175, 0.9)',
                  textShadow: response.includes('VERIFIED')
                    ? '0 0 10px rgba(6, 182, 212, 0.3)'
                    : 'none'
                }}
              >
                {response}
              </p>
            </motion.div>
          )}

          {isAuthenticated && ghostId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-2">
                Ghost ID Active
              </p>
              <p className="font-mono text-primary text-lg tracking-widest">
                {ghostId}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
