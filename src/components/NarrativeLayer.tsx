import { motion } from 'framer-motion'

const narrativeSections = [
  {
    query: '→ what is frisky',
    response: [
      'BOUTIQUE_DEVELOPMENT_STUDIO',
      'Controlled. Minimal. Confident.',
      'Building internal tools that feel like million-dollar operations.'
    ]
  },
  {
    query: '→ current systems',
    response: [
      'THE_INTAKE :: Video remuxing pipeline. Sub-6s delivery.',
      'THE_VOID_LINE :: Node 1132 signal relay. Live ingress.',
      'THE_ENGINE :: Wolf protocol core. Always active.',
      'THE_SHADOW :: Ghost authority verification.',
      'THE_ANCHOR :: Flat-file ledger. Immutable audit trail.'
    ]
  },
  {
    query: '→ approach',
    response: [
      'No generic SaaS.',
      'No loud marketing.',
      'Command-driven. System-first.',
      'Every interface feels like accessing proprietary infrastructure.'
    ]
  },
  {
    query: '→ projects',
    response: [
      'ClipsFLOW :: iPhone-optimized video delivery',
      'LORE :: Visual system & studio identity',
      'Core-Wolf :: Authentication & signal protocols',
      'Frisky-Ghost :: Identity masking via HMAC-SHA256'
    ]
  }
]

export function NarrativeLayer() {
  return (
    <div className="relative py-32 px-8">
      <div className="max-w-5xl mx-auto space-y-24">
        {narrativeSections.map((section, index) => (
          <motion.div
            key={section.query}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="space-y-6"
          >
            <div className="font-mono text-sm text-accent tracking-wider">
              {section.query}
            </div>

            <div className="space-y-3 pl-8 border-l border-border/30">
              {section.response.map((line, lineIndex) => (
                <motion.div
                  key={`${section.query}-${lineIndex}`}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + lineIndex * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={
                    line.includes('::')
                      ? 'font-mono text-foreground text-sm leading-relaxed'
                      : line === line.toUpperCase() && line.includes('_')
                      ? 'font-mono text-primary text-base tracking-wide'
                      : 'text-muted-foreground text-sm leading-relaxed'
                  }
                >
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-32 text-center"
      >
        <div className="inline-block px-6 py-2 border border-border/50 rounded-lg bg-card/20 backdrop-blur-sm">
          <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
            Scroll to enter system layer
          </p>
        </div>
      </motion.div>
    </div>
  )
}
