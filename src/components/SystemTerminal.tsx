import { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTypingEffect } from '@/hooks/use-typing-effect'

const logMessages = [
  '[SYSTEM] ☕ Coffee: Critical',
  '[VAULT] Ghost_ID GX-7A2B Authenticated',
  '[VOID_LINE] Ingress from Node 1132: OK',
  '[ENGINE] Core status: ACTIVE',
  '[INTAKE] yt-dlp remux: Processing',
  '[SHADOW] Ghost authority verified',
  '[ANCHOR] Ledger sync: Complete',
  '[SYSTEM] Security scan: Pass',
  '[VAULT] Encryption key rotated',
  '[VOID_LINE] Signal strength: 98%',
  '[ENGINE] Temperature: Nominal',
  '[INTAKE] Buffer: 47% capacity',
  '[SHADOW] Stealth mode: Engaged',
  '[ANCHOR] Backup complete',
  '[SYSTEM] 🐺 Wolf protocol active',
  '[VAULT] Access granted: GX-9F3C',
  '[VOID_LINE] Node 1132: Synchronized',
  '[ENGINE] Performance: Optimal',
  '[INTAKE] Queue: 3 pending tasks',
  '[SHADOW] Ghost_ID GX-4D8E logged'
]

interface LogEntry {
  id: string
  timestamp: string
  message: string
  isTyping: boolean
}

export function SystemTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs([{
      id: `${Date.now()}-0`,
      timestamp,
      message: logMessages[0],
      isTyping: false
    }])

    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString()
      const nextMessage = logMessages[Math.floor(Math.random() * logMessages.length)]
      
      setLogs((prev) => {
        const newLog: LogEntry = {
          id: `${Date.now()}-${Math.random()}`,
          timestamp,
          message: nextMessage,
          isTyping: true
        }
        const newLogs = [...prev, newLog]
        return newLogs.slice(-8)
      })

      setTimeout(() => {
        setLogs(prev => prev.map(log => ({ ...log, isTyping: false })))
      }, nextMessage.length * 30 + 100)
    }, Math.random() * 3000 + 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [logs])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 border-t border-border/30 bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-8 py-3 h-full">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-light">
            System Hum
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
        </div>
        <ScrollArea className="h-14" ref={scrollRef}>
          <div className="space-y-1">
            {logs.map((log, index) => (
              <TerminalLine
                key={log.id}
                timestamp={log.timestamp}
                message={log.message}
                isTyping={log.isTyping}
                isOld={index < logs.length - 3}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

interface TerminalLineProps {
  timestamp: string
  message: string
  isTyping: boolean
  isOld: boolean
}

function TerminalLine({ timestamp, message, isTyping, isOld }: TerminalLineProps) {
  const { displayedText } = useTypingEffect(message, 30)
  const text = isTyping ? displayedText : message

  return (
    <div className={`terminal-log ${isOld ? 'old' : ''}`}>
      <span className="text-accent">[{timestamp}]</span>{' '}
      <span className="text-foreground/80">
        {text}
        {isTyping && text.length < message.length && (
          <span className="inline-block w-1 h-3 ml-0.5 bg-accent animate-pulse" />
        )}
      </span>
    </div>
  )
}
