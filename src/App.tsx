import { useState } from 'react'
import { motion } from 'framer-motion'
import { VortexBackground } from '@/components/VortexBackground'
import { VesselCard } from '@/components/VesselCard'
import { SystemTerminal } from '@/components/SystemTerminal'
import { IngressTerminal } from '@/components/IngressTerminal'
import { WolfIcon } from '@/components/WolfIcon'
import { Lightning, Radio, Ghost, Database } from '@phosphor-icons/react'
import { useTelemetry } from '@/hooks/use-telemetry'

const COLORS = {
  signalViolet: '#8B5CF6',
  oxygenBlue: '#3B82F6',
  matrixGreen: '#10B981',
  ghostGrey: '#71717A',
  neonCyan: '#06B6D4'
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1
  }
}

function App() {
  const [focusColor, setFocusColor] = useState<string>(COLORS.signalViolet)
  const [bootComplete, setBootComplete] = useState(false)
  const telemetry = useTelemetry()

  return (
    <>
      {!bootComplete && <IngressTerminal onBootComplete={() => setBootComplete(true)} />}
      
      <div className="min-h-screen relative pb-32">
        <VortexBackground focusColor={focusColor} />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: bootComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 container mx-auto px-8 py-12 max-w-7xl"
        >
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: bootComplete ? 1 : 0, y: bootComplete ? 0 : -20 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.4em] uppercase mb-4 text-foreground">
              Frisky Dev Syndicate
            </h1>
            <div className="h-px w-80 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate={bootComplete ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-start-2"
            >
              <VesselCard
                title="THE VOID_LINE"
                status="NODE_1132_ACTIVE"
                accentColor={COLORS.oxygenBlue}
                icon={<Radio size={32} weight="duotone" />}
                data={[
                  'Node: 1132',
                  `Signal: ${Math.round(telemetry.signal)}% strength`,
                  `Latency: ${Math.round(telemetry.latency)}ms`,
                  'Ingress: OK',
                  'Status: Synchronized'
                ]}
                onHover={() => setFocusColor(COLORS.oxygenBlue)}
                onLeave={() => setFocusColor(COLORS.signalViolet)}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={bootComplete ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <VesselCard
                title="THE INTAKE"
                status="REMUX_ACTIVE"
                accentColor={COLORS.matrixGreen}
                icon={<Lightning size={32} weight="duotone" />}
                data={[
                  'yt-dlp: v2024.1.15',
                  `Queue: ${telemetry.queueSize} pending`,
                  'Format: mp4/webm',
                  `Bandwidth: ${Math.round(telemetry.bandwidth)} Mbps`,
                  'Status: Processing'
                ]}
                onHover={() => setFocusColor(COLORS.matrixGreen)}
                onLeave={() => setFocusColor(COLORS.signalViolet)}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={bootComplete ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-start-2 md:row-start-2"
            >
              <div className="scale-110 origin-center">
                <VesselCard
                  title="THE ENGINE"
                  status="CORE_ACTIVE"
                  accentColor={COLORS.signalViolet}
                  icon={<WolfIcon className="w-10 h-10 wolf-pulse" />}
                  data={[
                    'Core: ONLINE',
                    `Temp: ${Math.round(telemetry.temperature)}°C`,
                    `Load: ${Math.round(telemetry.load)}%`,
                    `Uptime: ${telemetry.uptime.toFixed(1)}%`,
                    'Protocol: Wolf Active'
                  ]}
                  onHover={() => setFocusColor(COLORS.signalViolet)}
                  onLeave={() => setFocusColor(COLORS.signalViolet)}
                  isEngine
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={bootComplete ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-start-3 md:row-start-2"
            >
              <VesselCard
                title="THE SHADOW"
                status="GHOST_AUTH_VERIFIED"
                accentColor={COLORS.signalViolet}
                icon={<Ghost size={32} weight="duotone" />}
                data={[
                  'Ghost_ID: GX-7A2B',
                  'Authority: Verified',
                  'Stealth: Engaged',
                  `Sessions: ${telemetry.sessions} active`,
                  'Status: Authenticated'
                ]}
                onHover={() => setFocusColor(COLORS.signalViolet)}
                onLeave={() => setFocusColor(COLORS.signalViolet)}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={bootComplete ? "visible" : "hidden"}
              variants={cardVariants}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-start-2 md:row-start-3"
            >
              <VesselCard
                title="THE ANCHOR"
                status="LEDGER_SYNCED"
                accentColor={COLORS.ghostGrey}
                icon={<Database size={32} weight="duotone" />}
                data={[
                  'Type: FLAT_FILE_LEDGER',
                  `Entries: ${telemetry.entries.toLocaleString()}`,
                  'Last Sync: 2m ago',
                  'Integrity: 100%',
                  'Status: Synchronized'
                ]}
                onHover={() => setFocusColor(COLORS.ghostGrey)}
                onLeave={() => setFocusColor(COLORS.signalViolet)}
              />
            </motion.div>
          </div>
        </motion.div>

        {bootComplete && <SystemTerminal />}
      </div>
    </>
  )
}

export default App