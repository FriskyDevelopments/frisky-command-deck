import { useCallback } from 'react'
import { usePreferences, type HapticIntensity } from './use-preferences'

type HapticStyle = 'light' | 'medium' | 'heavy' | 'selection' | 'impact' | 'notification'

interface VibrationPattern {
  pattern: number[]
  description: string
}

const vibrationPatterns: Record<HapticStyle, VibrationPattern> = {
  light: {
    pattern: [10],
    description: 'Subtle tap for minor interactions'
  },
  medium: {
    pattern: [20],
    description: 'Standard tap for common interactions'
  },
  heavy: {
    pattern: [40],
    description: 'Strong tap for important interactions'
  },
  selection: {
    pattern: [5],
    description: 'Quick tick for selection changes'
  },
  impact: {
    pattern: [15, 10, 25],
    description: 'Multi-stage feedback for impactful actions'
  },
  notification: {
    pattern: [10, 20, 10, 20],
    description: 'Attention-grabbing pattern for notifications'
  }
}

const intensityMultipliers: Record<HapticIntensity, number> = {
  off: 0,
  low: 0.5,
  medium: 1.0,
  high: 1.5
}

const applyIntensity = (pattern: number[], intensity: HapticIntensity): number[] => {
  const multiplier = intensityMultipliers[intensity]
  if (multiplier === 0) return [0]
  return pattern.map(duration => Math.round(duration * multiplier))
}

const isHapticSupported = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return !!(
    navigator.vibrate ||
    (navigator as any).webkitVibrate ||
    (navigator as any).mozVibrate ||
    (navigator as any).msVibrate
  )
}

const hasIOSHapticSupport = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return !!(
    (window as any).webkit?.messageHandlers?.haptic ||
    'ontouchstart' in window
  )
}

export function useHaptic() {
  const { preferences } = usePreferences()
  
  const triggerVibration = useCallback((pattern: number | number[], intensity: HapticIntensity) => {
    if (!isHapticSupported() || intensity === 'off') return false

    try {
      const patternArray = Array.isArray(pattern) ? pattern : [pattern]
      const adjustedPattern = applyIntensity(patternArray, intensity)
      
      if (navigator.vibrate) {
        return navigator.vibrate(adjustedPattern)
      }
      
      if ((navigator as any).webkitVibrate) {
        return (navigator as any).webkitVibrate(adjustedPattern)
      }
      
      if ((navigator as any).mozVibrate) {
        return (navigator as any).mozVibrate(adjustedPattern)
      }
      
      if ((navigator as any).msVibrate) {
        return (navigator as any).msVibrate(adjustedPattern)
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
      return false
    }
    
    return false
  }, [])

  const triggerIOSHaptic = useCallback((style: 'light' | 'medium' | 'heavy', intensity: HapticIntensity) => {
    if (typeof window === 'undefined' || intensity === 'off') return false

    try {
      let adjustedStyle = style
      if (intensity === 'low') {
        adjustedStyle = style === 'heavy' ? 'medium' : 'light'
      } else if (intensity === 'high') {
        adjustedStyle = style === 'light' ? 'medium' : 'heavy'
      }

      if ((window as any).webkit?.messageHandlers?.haptic) {
        (window as any).webkit.messageHandlers.haptic.postMessage({ style: adjustedStyle })
        return true
      }

      if ((window as any).TapticEngine) {
        const tapticMap = {
          light: 1,
          medium: 2,
          heavy: 3
        }
        ;(window as any).TapticEngine.impact(tapticMap[adjustedStyle])
        return true
      }
    } catch (error) {
      console.warn('iOS haptic feedback failed:', error)
    }
    
    return false
  }, [])

  const haptic = useCallback((style: HapticStyle = 'medium') => {
    const intensity = preferences.hapticIntensity
    
    if (intensity === 'off') return
    
    const pattern = vibrationPatterns[style]
    
    if (!pattern) {
      console.warn(`Unknown haptic style: ${style}`)
      return
    }

    const iosStyle = style === 'light' || style === 'selection' ? 'light' 
      : style === 'heavy' || style === 'impact' ? 'heavy' 
      : 'medium'
    
    const iosSuccess = hasIOSHapticSupport() && triggerIOSHaptic(iosStyle, intensity)
    
    if (!iosSuccess) {
      triggerVibration(pattern.pattern, intensity)
    }
  }, [preferences.hapticIntensity, triggerVibration, triggerIOSHaptic])

  const cancel = useCallback(() => {
    if (isHapticSupported() && navigator.vibrate) {
      navigator.vibrate(0)
    }
  }, [])

  return {
    haptic,
    cancel,
    isSupported: isHapticSupported(),
    hasIOSSupport: hasIOSHapticSupport(),
    intensity: preferences.hapticIntensity
  }
}
