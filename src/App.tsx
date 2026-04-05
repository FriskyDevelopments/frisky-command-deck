import { useState } from 'react'
import { motion } from 'framer-motion'
import { VortexBackground } from '@/components/VortexBackground'
import { WolfIcon } from '@/components/WolfIcon'
import { Radio, Lightning, Ghost, Database } from '@phosphor-icons/react'

function App() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<Array<{ command: string; response: string }>>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.toLowerCase().trim()
    let response = ''

    if (cmd === 'help' || cmd === '?') {
      response = 'AVAILABLE COMMANDS:\n  help, status, about, contact, clear'
    } else if (cmd === 'status') {
      response = 'CORE :: OPERATIONAL\nVESSELS :: 5/5 ONLINE\nSTATUS :: NOMINAL'
    } else if (cmd === 'about') {
      response = 'FRISKY DEVELOPMENTS\nBoutique development studio\nCommand-driven interfaces\nMischievous intelligence'
    } else if (cmd === 'contact') {
      response = 'GitHub :: github.com/friskydevelopments\nStatus :: Accepting boutique projects'
    } else if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    } else {
      response = `Unknown command: "${input}"\nType "help" for available commands`
    }

    setHistory(prev => [...prev, { command: input, response }])
    setInput('')
  }

  return (
    <div className="relative min-h-screen">
      <VortexBackground focusColor="#8B5CF6" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.4em] uppercase mb-6 text-center">
            Frisky
          </h1>
          <p className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-12">
            Boutique Development Studio
          </p>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {history.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 px-2">
                  <span className="font-mono text-primary text-sm">frisky@forge:~$</span>
                  <span className="font-mono text-sm text-foreground/70">{entry.command}</span>
                </div>
                <div className="px-4 py-3 bg-card/20 backdrop-blur-sm border border-border/30 rounded-lg">
                  <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                    {entry.response}
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 bg-card/30 backdrop-blur-md border border-border/50 rounded-lg px-6 py-4">
              <span className="font-mono text-primary text-sm shrink-0">frisky@forge:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='type "help" to begin'
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground/50"
                autoFocus
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-2 h-5 bg-primary"
              />
            </div>
          </form>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 w-full max-w-6xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VesselCard
              title="VOID_LINE"
              status="MONITORING"
              icon={<Radio size={32} />}
              color="oklch(0.61 0.18 254)"
              data={["NODE_1132", "SIGNAL_CLEAR"]}
            />
            
            <VesselCard
              title="THE ENGINE"
              status="CORE_ACTIVE"
              icon={<WolfIcon className="w-12 h-12" />}
              color="oklch(0.59 0.24 293)"
              data={["LOAD_NOMINAL", "WOLF_PULSE_ON"]}
              isCenter
            />
            
            <VesselCard
              title="SHADOW"
              status="SECURED"
              icon={<Ghost size={32} />}
              color="oklch(0.77 0.14 195)"
              data={["AUTH_SYNCED", "GHOST_ID_READY"]}
            />
            
            <VesselCard
              title="INTAKE"
              status="OPERATIONAL"
              icon={<Lightning size={32} />}
              color="oklch(0.72 0.19 142)"
              data={["STREAM_READY", "BUFFER_CLEAR"]}
            />
            
            <VesselCard
              title="ANCHOR"
              status="SYNCED"
              icon={<Database size={32} />}
              color="oklch(0.50 0.01 264)"
              data={["CHAIN_LOCKED", "LEDGER_SYNC"]}
            />
          </div>
        </motion.section>
      </div>
    </div>
  )
}

interface VesselCardProps {
  title: string
  status: string
  icon: React.ReactNode
  color: string
  data: string[]
  isCenter?: boolean
}

function VesselCard({ title, status, icon, color, data, isCenter }: VesselCardProps) {
  return (
    <div
      className={`vessel-card rounded-lg p-6 relative overflow-hidden ${isCenter ? 'md:col-span-3' : ''}`}
      style={{ borderColor: `${color}20` }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extralight tracking-[0.3em] uppercase text-2xl" style={{ color }}>
            {title}
          </h2>
          <div style={{ color }}>{icon}</div>
        </div>
        <div className="mb-4">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-[0.1em] font-light border"
            style={{ borderColor: color, color, backgroundColor: `${color}15` }}
          >
            {status}
          </div>
        </div>
        <div className="space-y-2">
          {data.map((line, i) => (
            <div key={i} className="font-light text-sm tracking-wide opacity-80">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App