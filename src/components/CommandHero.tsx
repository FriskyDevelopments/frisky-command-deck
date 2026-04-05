import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useHaptic } from '@/hooks/use-haptic'
import { useTypingSound } from '@/hooks/use-typing-sound'
import { PreferencesDialog } from '@/components/PreferencesDialog'
import { TypedResponse } from '@/components/TypedResponse'

interface CommandHeroProps {
  onAuthenticated?: (ghostId: string) => void
}

const createAudioContext = () => {
  if (typeof window === 'undefined') return null
  return new (window.AudioContext || (window as any).webkitAudioContext)()
}

const playNavigationSound = (direction: 'up' | 'down') => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(
    direction === 'down' ? 440 : 550,
    audioContext.currentTime
  )
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.08
  )
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.08)
}

const playSelectSound = () => {
  const audioContext = createAudioContext()
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(660, audioContext.currentTime)
  oscillator.frequency.exponentialRampToValueAtTime(
    880,
    audioContext.currentTime + 0.1
  )
  
  gainNode.gain.setValueAtTime(0.12, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.15
  )
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.15)
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
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const prevIndexRef = useRef(0)
  const { haptic } = useHaptic()
  const { playEnterSound } = useTypingSound()

  const allCommands = [
    'auth', 'authenticate', 'login',
    'help', '?',
    'status', 'sys', 'health',
    'projects', 'list', 'work',
    'about', 'info', 'manifesto',
    'contact', 'reach', 'connect', 'signal',
    'vessels', 'diagnostics', 'fleet',
    'settings', 'preferences', 'config',
    'clear', 'cls', 'reset'
  ]

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
      `  settings   :: Configure system preferences`,
      `               (aliases: preferences, config)`,
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

  const suggestions = useMemo(() => {
    if (!input.trim()) return []
    const inputLower = input.toLowerCase().trim()
    const uniqueSuggestions = new Set<string>()
    
    allCommands.forEach(cmd => {
      if (cmd.startsWith(inputLower) && cmd !== inputLower) {
        uniqueSuggestions.add(cmd)
      }
    })
    
    return Array.from(uniqueSuggestions).slice(0, 5)
  }, [input])

  useEffect(() => {
    setSelectedSuggestionIndex(0)
    prevIndexRef.current = 0
  }, [suggestions])

  useEffect(() => {
    if (suggestions.length === 0) return
    
    if (selectedSuggestionIndex !== prevIndexRef.current) {
      const direction = selectedSuggestionIndex > prevIndexRef.current ? 'down' : 'up'
      playNavigationSound(direction)
      prevIndexRef.current = selectedSuggestionIndex
    }
  }, [selectedSuggestionIndex, suggestions.length])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      haptic('selection')
      setSelectedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      haptic('selection')
      setSelectedSuggestionIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      )
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestions.length > 0) {
        haptic('light')
        playSelectSound()
        setInput(suggestions[selectedSuggestionIndex])
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    playEnterSound()
    
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
      'preferences': 'settings',
      'config': 'settings',
      'cls': 'clear',
      'reset': 'clear'
    }

    const command = commandAliases[rawCommand] || rawCommand

    if (command === 'auth') {
      haptic('impact')
      const id = `GX-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
      response = `[OK] GHOST_AUTHORITY_SYNCED\n[OK] GHOST_ID :: ${id}\n[OK] ACCESS_GRANTED`
      setIsAuthenticated(true)
      setGhostId(id)
      type = 'success'
      setTimeout(() => {
        onAuthenticated?.(id)
      }, 1200)
    } else if (command === 'help') {
      haptic('light')
      response = getHelpText()
    } else if (command === 'status') {
      haptic('medium')
      response = getSystemStatus()
      type = 'success'
    } else if (command === 'projects') {
      haptic('light')
      response = getProjectsList()
      type = 'info'
    } else if (command === 'about') {
      haptic('light')
      response = getAboutText()
      type = 'info'
    } else if (command === 'contact') {
      haptic('light')
      response = getContactText()
      type = 'info'
    } else if (command === 'vessels') {
      haptic('medium')
      response = getVesselsText()
      type = 'info'
    } else if (command === 'settings') {
      haptic('medium')
      setPreferencesOpen(true)
      response = `[OK] OPENING_PREFERENCES_PANEL\n\nConfigure haptic feedback intensity and other system settings.`
      type = 'success'
    } else if (command === 'clear') {
      haptic('light')
      setHistory([])
      setInput('')
      return
    } else {
      haptic('notification')
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
      <AnimatePresence>
        {preferencesOpen && (
          <PreferencesDialog
            isOpen={preferencesOpen}
            onClose={() => {
              setPreferencesOpen(false)
              haptic('light')
            }}
          />
        )}
      </AnimatePresence>

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
                      <TypedResponse 
                        text={entry.response}
                        speed={15}
                      />
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
              <div className="flex-1 relative">
                {suggestions.length > 0 && input && (
                  <div className="absolute inset-0 pointer-events-none font-mono text-sm text-muted-foreground/30">
                    <span className="invisible">{input}</span>
                    <span>{suggestions[selectedSuggestionIndex].slice(input.length)}</span>
                  </div>
                )}
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isAuthenticated ? 'enter command...' : 'type "help" to begin'}
                  className="w-full bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </div>
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="w-2 h-5 bg-primary"
              />
            </div>

            <AnimatePresence>
              {suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-card/90 backdrop-blur-md border border-border/50 rounded-lg overflow-hidden"
                >
                  <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/30 flex items-center justify-between">
                    <span>SUGGESTIONS</span>
                    <span className="text-[10px]">↑↓ navigate • TAB autocomplete</span>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {suggestions.map((suggestion, idx) => (
                      <motion.button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          haptic('light')
                          playSelectSound()
                          setInput(suggestion)
                        }}
                        onMouseEnter={() => {
                          if (idx !== selectedSuggestionIndex) {
                            haptic('selection')
                            const direction = idx > selectedSuggestionIndex ? 'down' : 'up'
                            playNavigationSound(direction)
                            setSelectedSuggestionIndex(idx)
                          }
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          backgroundColor: idx === selectedSuggestionIndex 
                            ? 'rgba(139, 92, 246, 0.2)' 
                            : 'rgba(0, 0, 0, 0)'
                        }}
                        transition={{ delay: idx * 0.03, duration: 0.2 }}
                        className={`w-full px-6 py-3 text-left font-mono text-sm transition-all relative ${
                          idx === selectedSuggestionIndex
                            ? 'text-primary border-l-2 border-primary'
                            : 'text-foreground/70 hover:bg-muted/20 border-l-2 border-transparent'
                        }`}
                        style={idx === selectedSuggestionIndex ? {
                          textShadow: '0 0 12px rgba(139, 92, 246, 0.4)',
                          boxShadow: 'inset 0 0 20px rgba(139, 92, 246, 0.1)'
                        } : {}}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`text-xs transition-all ${
                            idx === selectedSuggestionIndex 
                              ? 'text-accent scale-125' 
                              : 'text-accent/60'
                          }`}>
                            {idx === selectedSuggestionIndex ? '▶' : '→'}
                          </span>
                          {suggestion}
                        </span>
                        {idx === selectedSuggestionIndex && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <motion.span 
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <span className="text-[10px] text-primary/70 uppercase tracking-wider">
                              selected
                            </span>
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
