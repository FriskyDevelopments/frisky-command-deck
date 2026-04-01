import { motion, AnimatePresence } from 'framer-motion'

interface SystemPulseProps {
  trigger: boolean
  color?: string
}

export function SystemPulse({ trigger, color = 'rgba(139, 92, 246, 0.15)' }: SystemPulseProps) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [1, 1.02, 1]
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            opacity: {
              times: [0, 0.3, 1]
            }
          }}
          className="fixed inset-0 pointer-events-none z-[60]"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            mixBlendMode: 'screen'
          }}
        />
      )}
    </AnimatePresence>
  )
}
