import { useState } from 'react'
import { VortexBackground } from '@/components/VortexBackground'
import { VesselCard } from '@/components/VesselCard'
import { SystemTerminal } from '@/components/SystemTerminal'
import { WolfIcon } from '@/components/WolfIcon'
import { Lightning, Radio, Ghost, Database } from '@phosphor-icons/react'

const COLORS = {
  signalViolet: '#8B5CF6',
  oxygenBlue: '#3B82F6',
  matrixGreen: '#10B981',
  ghostGrey: '#71717A',
  neonCyan: '#06B6D4'
}

function App() {
  const [focusColor, setFocusColor] = useState<string>(COLORS.signalViolet)

  return (
    <div className="min-h-screen relative pb-32">
      <VortexBackground focusColor={focusColor} />

      <div className="relative z-10 container mx-auto px-8 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-extralight tracking-[0.4em] uppercase mb-4 text-foreground">
            Frisky Dev Syndicate
          </h1>
          <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <VesselCard
            title="THE INTAKE"
            status="REMUX_ACTIVE"
            accentColor={COLORS.matrixGreen}
            icon={<Lightning size={32} weight="duotone" />}
            data={[
              'yt-dlp: v2024.1.15',
              'Queue: 3 pending',
              'Format: mp4/webm',
              'Bandwidth: 125 Mbps',
              'Status: Processing'
            ]}
            onHover={() => setFocusColor(COLORS.matrixGreen)}
            onLeave={() => setFocusColor(COLORS.signalViolet)}
          />

          <VesselCard
            title="THE VOID_LINE"
            status="NODE_1132_ACTIVE"
            accentColor={COLORS.oxygenBlue}
            icon={<Radio size={32} weight="duotone" />}
            data={[
              'Node: 1132',
              'Signal: 98% strength',
              'Latency: 12ms',
              'Ingress: OK',
              'Status: Synchronized'
            ]}
            onHover={() => setFocusColor(COLORS.oxygenBlue)}
            onLeave={() => setFocusColor(COLORS.signalViolet)}
          />

          <VesselCard
            title="THE ENGINE"
            status="CORE_ACTIVE"
            accentColor={COLORS.signalViolet}
            icon={<WolfIcon className="w-8 h-8 wolf-pulse" />}
            data={[
              'Core: ONLINE',
              'Temp: Nominal',
              'Load: 47%',
              'Uptime: 99.8%',
              'Protocol: Wolf Active'
            ]}
            onHover={() => setFocusColor(COLORS.signalViolet)}
            onLeave={() => setFocusColor(COLORS.signalViolet)}
            isCenter
          />

          <VesselCard
            title="THE SHADOW"
            status="GHOST_AUTH_VERIFIED"
            accentColor={COLORS.signalViolet}
            icon={<Ghost size={32} weight="duotone" />}
            data={[
              'Ghost_ID: GX-7A2B',
              'Authority: Verified',
              'Stealth: Engaged',
              'Sessions: 47 active',
              'Status: Authenticated'
            ]}
            onHover={() => setFocusColor(COLORS.signalViolet)}
            onLeave={() => setFocusColor(COLORS.signalViolet)}
          />

          <VesselCard
            title="THE ANCHOR"
            status="LEDGER_SYNCED"
            accentColor={COLORS.ghostGrey}
            icon={<Database size={32} weight="duotone" />}
            data={[
              'Type: FLAT_FILE_LEDGER',
              'Entries: 12,847',
              'Last Sync: 2m ago',
              'Integrity: 100%',
              'Status: Synchronized'
            ]}
            onHover={() => setFocusColor(COLORS.ghostGrey)}
            onLeave={() => setFocusColor(COLORS.signalViolet)}
          />
        </div>
      </div>

      <SystemTerminal />
    </div>
  )
}

export default App