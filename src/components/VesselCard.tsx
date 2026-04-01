import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VesselCardProps {
  title: string
  status: string
  accentColor: string
  icon: ReactNode
  data: string[]
  onHover?: () => void
  onLeave?: () => void
  isCenter?: boolean
}

export function VesselCard({
  title,
  status,
  accentColor,
  icon,
  data,
  onHover,
  onLeave,
  isCenter = false
}: VesselCardProps) {
  return (
    <div
      className={cn(
        'vessel-card rounded-lg p-6 relative overflow-hidden',
        isCenter && 'md:col-span-2'
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        borderColor: `${accentColor}20`
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-2xl font-extralight tracking-[0.3em] uppercase"
            style={{ color: accentColor }}
          >
            {title}
          </h2>
          <div style={{ color: accentColor }}>{icon}</div>
        </div>

        <div className="mb-4">
          <div
            className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-[0.1em] font-light border"
            style={{
              borderColor: accentColor,
              color: accentColor,
              backgroundColor: `${accentColor}15`
            }}
          >
            {status}
          </div>
        </div>

        <div className="space-y-2">
          {data.map((line, index) => (
            <div key={index} className="font-light text-sm tracking-wide opacity-80">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
