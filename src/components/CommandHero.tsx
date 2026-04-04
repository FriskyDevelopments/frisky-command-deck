import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandHeroProps {
  onAuthenticated?: (ghostId: string) => void
}

interface CommandHistory {
  command: string
  response: string
  type: 'success' | 'info' | 'error'
}

export function CommandHero({ onAuthenticated }: CommandHeroProps) {
  const [input, setInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ghostId, setGhostId] = useState('')
  const [history, setHistory] = useState<CommandHistory[]>([])

  const projects = [
    { name: 'CLIPFLOW', status: 'ACTIVE', desc: 'Sub-6s media remux pipeline' },
    { name: 'VOID_LINE', status: 'MONITORING', desc: 'Node 1132 signal ingress' },
    { name: 'GHOST_AUTH', status: 'SECURED', desc: 'HMAC-SHA256 identity layer' },
    { name: 'FLAT_LEDGER', status: 'SYNCED', desc: 'Immutable audit trail' }
  ]

  const vessels = [
    { 
      id: 'THE_ENGINE', 
      status: 'CORE_ACTIVE', 
      frequency: 'Signal Violet',
      role: 'Central orchestration and Wolf-core authority',
      telemetry: 'PULSE_NOMINAL'
    },
    { 
      id: 'THE_INTAKE', 
      status: 'OPERATIONAL', 
      frequency: 'Matrix Green',
      role: 'Media ingress and yt-dlp remux telemetry',
      telemetry: 'STREAM_READY'
    },
    { 
      id: 'THE_VOID_LINE', 
      status: 'MONITORING', 
      frequency: 'Oxygen Blue',
      role: 'Node 1132 signal reception and relay',
      telemetry: 'SIGNAL_CLEAR'
    },
    { 
      id: 'THE_SHADOW', 
      status: 'SECURED', 
      frequency: 'Signal Violet',
      role: 'Ghost ID authority and authentication layer',
      telemetry: 'AUTH_LOCKED'
    },
    { 
      id: 'THE_ANCHOR', 
      status: 'SYNCED', 
      frequency: 'Ghost Grey',
      role: 'Flat-file ledger and immutable audit trail',
      telemetry: 'LEDGER_SYNC'
    }
  ]

  const getSystemStatus = () => {
    const uptime = Math.floor(Math.random() * 72) + 12
    return [
      `CORE_STATUS :: OPERATIONAL`,
      `WOLF_ENGINE :: ACTIVE`,
      `UPTIME :: ${uptime}h ${Math.floor(Math.random() * 60)}m`,
      `GHOST_AUTH :: ${isAuthenticated ? 'VERIFIED' : 'STANDBY'}`,
      `VESSELS :: 5/5 ONLINE`,
      `SYNC_STATE :: NOMINAL`
    ].join('\n')
  }

  const getHelpText = () => {
    return [
      `FRISKY COMMAND INTERFACE v2.1.0`,
      ``,
      `AVAILABLE COMMANDS:`,
      `  auth       :: Initialize Ghost Authority`,
      `               (aliases: authenticate, login)`,
      `  about      :: Studio manifesto and philosophy`,
      `               (aliases: info, manifesto)`,
      `  contact    :: Communication channels`,
      `               (aliases: reach, connect, signal)`,
      `  vessels    :: Detailed vessel diagnostics`,
      `               (aliases: diagnostics, fleet)`,
      `  help       :: Display this message`,
      `               (aliases: ?)`,
      `  status     :: System diagnostics`,
      `               (aliases: sys, health)`,
      `  projects   :: List active vessels`,
      `               (aliases: list, work)`,
      `  clear      :: Clear command history`,
      `               (aliases: cls, reset)`,
      ``,
      `TYPE ANY COMMAND AND PRESS ENTER`
    ].join('\n')
  }

  const getProjectsList = () => {
    return [
      `ACTIVE VESSELS :: FRISKY SYNDICATE`,
      ``,
      ...projects.map(p => `[${p.status}] ${p.name}\n  └─ ${p.desc}`),
      ``,
      `TOTAL :: ${projects.length} systems online`
    ].join('\n')
  }

  const getAboutText = () => {
    return [
      `FRISKY DEVELOPMENTS :: BOUTIQUE STUDIO`,
      ``,
      `PHILOSOPHY`,
      `  Premium mischievous intelligence`,
      `  Elegant systems with occult precision`,
      `  Myth-tech architecture`,
      ``,
      `APPROACH`,
      `  Command-driven interfaces`,
      `  Cinematic user experiences`,
      `  Stateless Ghost ID protocol`,
      `  Sub-6s delivery pipelines`,
      `  Immutable audit trails`,
      ``,
      `DOCTRINE`,
      `  Build systems that feel alive`,
      `  Create tools for internal authority`,
      `  Design with narrative weight`,
      `  Engineer with premium restraint`,
      ``,
      `STATUS :: SYNDICATE_STANDARD`
    ].join('\n')
  }

  const getContactText = () => {
    return [
      `COMMUNICATION CHANNELS :: FRISKY SYNDICATE`,
      ``,
      `SIGNAL_CHANNELS`,
      `  → GitHub      :: github.com/friskydevelopments`,
      `  → Signal      :: Secure channel only`,
      `  → Terminal    :: Direct command interface`,
      ``,
      `PROTOCOL`,
      `  All communications encrypted`,
      `  Ghost ID authentication required`,
      `  Response time: Sub-6h standard`,
      ``,
      `ENGAGEMENT_TERMS`,
      `  Boutique projects only`,
      `  Premium clients`,
      `  Syndicate-level authority`,
      ``,
      `STATUS :: SIGNALS_MONITORED`
    ].join('\n')
  }

  const getVesselsText = () => {
    return [
      `VESSEL DIAGNOSTICS :: PENTAD ARCHITECTURE`,
      ``,
      ...vessels.map(v => 
        `╭─ ${v.id}\n` +
        `│  STATUS      :: ${v.status}\n` +
        `│  FREQUENCY   :: ${v.frequency}\n` +
        `│  ROLE        :: ${v.role}\n` +
        `│  TELEMETRY   :: ${v.telemetry}\n` +
        `╰─────────────────────────────────────────`
      ),
      ``,
      `TOPOLOGY :: PENTAD_CONSTELLATION`,
      `SYNC_STATE :: ALL_VESSELS_NOMINAL`
    ].join('\n')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const rawCommand = input.toLowerCase().trim()
    let response = ''
    let type: 'success' | 'info' | 'error' = 'info'

    const commandAliases: Record<string, string> = {
      'authenticate': 'auth',
      'login': 'auth',
      '?': 'help',
      'sys': 'status',
      'health': 'status',
      'list': 'projects',
      'work': 'projects',
      'info': 'about',
      'manifesto': 'about',
      'reach': 'contact',
      'connect': 'contact',
      'signal': 'contact',
      'diagnostics': 'vessels',
      'fleet': 'vessels',
      'cls': 'clear',
      'reset': 'clear'
    }

    const command = commandAliases[rawCommand] || rawCommand

    if (command === 'auth') {
      const id = `GX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      response = `[OK] GHOST_AUTHORITY_SYNCED\n[OK] GHOST_ID :: ${id}\n[OK] ACCESS_GRANTED`
      setIsAuthenticated(true)
      setGhostId(id)
      type = 'success'
      setTimeout(() => {
        onAuthenticated?.(id)
      }, 1200)
    } else if (command === 'help') {
      response = getHelpText()
    } else if (command === 'status') {
      response = getSystemStatus()
      type = 'success'
    } else if (command === 'projects') {
      response = getProjectsList()
      type = 'info'
    } else if (command === 'about') {
      response = getAboutText()
      type = 'info'
    } else if (command === 'contact') {
      response = getContactText()
      type = 'info'
    } else if (command === 'vessels') {
      response = getVesselsText()
      type = 'info'
    } else if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    } else {
      response = `[ERROR] UNKNOWN_COMMAND :: "${input}"\n\nType "help" for available commands`
      type = 'error'
    }

    setHistory(prev => [...prev, { command: input, response, type }])
    setInput('')
  }

  const getResponseColor = (type: 'success' | 'info' | 'error') => {
    switch (type) {
      case 'success':
        return 'rgba(6, 182, 212, 0.9)'
      case 'error':
        return 'rgba(239, 68, 68, 0.8)'
      default:
        return 'rgba(156, 163, 175, 0.9)'
    }
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
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-light">
            Boutique Development Studio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {history.map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2 px-2">
                    <span className="font-mono text-primary text-sm">
                      frisky@forge:~$
                    </span>
                    <span className="font-mono text-sm text-foreground/70">
                      {entry.command}
                    </span>
                  </div>
                  
                  <div className="px-6 py-3 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg">
                    <pre
                      className="font-mono text-xs whitespace-pre-wrap"
                      style={{
                        color: getResponseColor(entry.type),
                        textShadow: entry.type === 'success' 
                          ? '0 0 10px rgba(6, 182, 212, 0.3)'
                          : 'none'
                      }}
                    >
                      {entry.response}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-md border border-border/50 rounded-lg px-6 py-4">
              <span className="font-mono text-primary text-sm shrink-0">
                frisky@forge:~$
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isAuthenticated ? 'enter command...' : 'type "help" to begin'}
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
        </motion.div>
      </div>
    </div>
  )
}
