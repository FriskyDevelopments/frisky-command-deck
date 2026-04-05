import { useKV } from '@github/spark/hooks'

export type HapticIntensity = 'off' | 'low' | 'medium' | 'high'

export interface UserPreferences {
  hapticIntensity: HapticIntensity
  soundEnabled: boolean
  animationsEnabled: boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
  hapticIntensity: 'medium',
  soundEnabled: true,
  animationsEnabled: true
}

export function usePreferences() {
  const [preferences, setPreferences] = useKV<UserPreferences>(
    'user-preferences',
    DEFAULT_PREFERENCES
  )

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((current) => ({
      ...(current || DEFAULT_PREFERENCES),
      ...updates
    }))
  }

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES)
  }

  return {
    preferences: preferences || DEFAULT_PREFERENCES,
    updatePreferences,
    resetPreferences
  }
}
