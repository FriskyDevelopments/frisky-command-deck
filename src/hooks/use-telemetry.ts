import { useEffect, useState } from 'react'

interface TelemetryData {
  bandwidth: number
  queueSize: number
  signal: number
  latency: number
  load: number
  uptime: number
  temperature: number
  sessions: number
  entries: number
}

export function useTelemetry() {
  const [data, setData] = useState<TelemetryData>({
    bandwidth: 125,
    queueSize: 3,
    signal: 98,
    latency: 12,
    load: 47,
    uptime: 99.8,
    temperature: 72,
    sessions: 47,
    entries: 12847
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        bandwidth: Math.max(100, Math.min(200, prev.bandwidth + (Math.random() - 0.5) * 10)),
        queueSize: Math.max(0, Math.min(10, prev.queueSize + Math.floor(Math.random() * 3 - 1))),
        signal: Math.max(90, Math.min(100, prev.signal + (Math.random() - 0.5) * 2)),
        latency: Math.max(5, Math.min(30, prev.latency + (Math.random() - 0.5) * 4)),
        load: Math.max(30, Math.min(80, prev.load + (Math.random() - 0.5) * 5)),
        uptime: Math.min(100, prev.uptime + 0.01),
        temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3)),
        sessions: Math.max(20, Math.min(100, prev.sessions + Math.floor(Math.random() * 5 - 2))),
        entries: prev.entries + Math.floor(Math.random() * 3)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return data
}
