import { useCallback } from 'react'

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
  const triggerVibration = useCallback((pattern: number | number[]) => {
    if (!isHapticSupported()) return false

    try {
      const patternArray = Array.isArray(pattern) ? pattern : [pattern]
      
      if (navigator.vibrate) {
        return navigator.vibrate(patternArray)
      }
      
      if ((navigator as any).webkitVibrate) {
        return (navigator as any).webkitVibrate(patternArray)
      }
      
      if ((navigator as any).mozVibrate) {
        return (navigator as any).mozVibrate(patternArray)
      }
      
      if ((navigator as any).msVibrate) {
        return (navigator as any).msVibrate(patternArray)
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
      return false
    }
    
    return false
  }, [])

  const triggerIOSHaptic = useCallback((style: 'light' | 'medium' | 'heavy') => {
    if (typeof window === 'undefined') return false

    try {
      if ((window as any).webkit?.messageHandlers?.haptic) {
        (window as any).webkit.messageHandlers.haptic.postMessage({ style })
        return true
      }

      if ((window as any).TapticEngine) {
        const tapticMap = {
          light: 1,
          medium: 2,
          heavy: 3
        }
        ;(window as any).TapticEngine.impact(tapticMap[style])
        return true
      }
    } catch (error) {
      console.warn('iOS haptic feedback failed:', error)
    }
    
    return false
  }, [])

  const haptic = useCallback((style: HapticStyle = 'medium') => {
    const pattern = vibrationPatterns[style]
    
    if (!pattern) {
      console.warn(`Unknown haptic style: ${style}`)
      return
    }

    const iosStyle = style === 'light' || style === 'selection' ? 'light' 
      : style === 'heavy' || style === 'impact' ? 'heavy' 
      : 'medium'
    
    const iosSuccess = hasIOSHapticSupport() && triggerIOSHaptic(iosStyle)
    
    if (!iosSuccess) {
      triggerVibration(pattern.pattern)
    }
  }, [triggerVibration, triggerIOSHaptic])

  const cancel = useCallback(() => {
    if (isHapticSupported() && navigator.vibrate) {
      navigator.vibrate(0)
    }
  }, [])

  return {
    haptic,
    cancel,
    isSupported: isHapticSupported(),
    hasIOSSupport: hasIOSHapticSupport()
  }
}
