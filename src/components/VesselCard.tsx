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
  isEngine?: boolean
}

export function VesselCard({
  title,
  status,
  accentColor,
  icon,
  data,
  onHover,
  onLeave,
  isCenter = false,
  isEngine = false
}: VesselCardProps) {
  return (
    <div
      className={cn(
        'vessel-card rounded-lg p-6 relative overflow-hidden',
        isCenter && 'md:col-span-2',
        isEngine && 'shadow-2xl'
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        borderColor: isEngine ? `${accentColor}60` : `${accentColor}20`,
        boxShadow: isEngine ? `0 0 40px ${accentColor}30, 0 0 80px ${accentColor}15` : undefined
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2
            className={cn(
              "font-extralight tracking-[0.3em] uppercase",
              isEngine ? "text-3xl" : "text-2xl"
            )}
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
