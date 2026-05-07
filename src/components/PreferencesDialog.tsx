import { motion } from 'framer-motion'
import { usePreferences, type HapticIntensity } from '@/hooks/use-preferences'
import { useHaptic } from '@/hooks/use-haptic'
import { useTypingSound } from '@/hooks/use-typing-sound'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { X, SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'

interface PreferencesDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function PreferencesDialog({ isOpen, onClose }: PreferencesDialogProps) {
  const { preferences, updatePreferences, resetPreferences } = usePreferences()
  const { haptic, isSupported } = useHaptic()
  const { playTypingSound } = useTypingSound()

  if (!isOpen) return null

  const intensityOptions: { value: HapticIntensity; label: string; desc: string }[] = [
    { value: 'off', label: 'OFF', desc: 'Disable all haptic feedback' },
    { value: 'low', label: 'LOW', desc: 'Subtle vibration patterns' },
    { value: 'medium', label: 'MEDIUM', desc: 'Standard feedback intensity' },
    { value: 'high', label: 'HIGH', desc: 'Strong tactile response' }
  ]

  const handleIntensityChange = (intensity: HapticIntensity) => {
    updatePreferences({ hapticIntensity: intensity })
    if (intensity !== 'off') {
      setTimeout(() => haptic('impact'), 50)
    }
  }

  const handleReset = () => {
    resetPreferences()
    haptic('notification')
  }

  const handleTest = () => {
    haptic('impact')
  }

  const handleSoundToggle = (enabled: boolean) => {
    updatePreferences({ soundEnabled: enabled })
    if (enabled) {
      playTypingSound()
    }
  }

  const handleVolumeChange = (value: number[]) => {
    updatePreferences({ soundVolume: value[0] })
  }

  const handleVolumeTest = () => {
    playTypingSound()
  }

  const volumePresets = [
    { label: 'MUTED', value: 0 },
    { label: 'LOW', value: 0.25 },
    { label: 'MEDIUM', value: 0.5 },
    { label: 'HIGH', value: 1 }
  ]

  const handleVolumePreset = (value: number) => {
    updatePreferences({ soundVolume: value })
    if (value > 0) {
      setTimeout(() => playTypingSound(), 50)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-4"
      >
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-border/30">
            <div>
              <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-foreground">
                Preferences
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                System Configuration
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="px-8 py-6 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-foreground mb-1">
                    Haptic Feedback Intensity
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    {isSupported ? 'Configure vibration strength for interactions' : 'Haptic feedback not supported on this device'}
                  </p>
                </div>
                {isSupported && preferences.hapticIntensity !== 'off' && (
                  <Button
                    onClick={handleTest}
                    variant="outline"
                    size="sm"
                    className="font-mono text-xs"
                  >
                    TEST
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {intensityOptions.map((option) => {
                  const isActive = preferences.hapticIntensity === option.value
                  const isDisabled = !isSupported && option.value !== 'off'

                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => !isDisabled && handleIntensityChange(option.value)}
                      disabled={isDisabled}
                      whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!isDisabled ? { scale: 0.98 } : {}}
                      className={`
                        relative p-4 rounded-lg border transition-all
                        ${isActive 
                          ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20' 
                          : 'bg-card/20 border-border/30 hover:border-border/50'
                        }
                        ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                      style={isActive ? {
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)'
                      } : {}}
                    >
                      <div className="text-center">
                        <div className={`
                          text-lg font-mono font-bold tracking-wider mb-2
                          ${isActive ? 'text-primary' : 'text-foreground/70'}
                        `}>
                          {option.label}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground leading-tight">
                          {option.desc}
                        </div>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeIntensity"
                          className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {isActive && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-4 p-4 bg-muted/10 border border-border/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-accent text-xs">ℹ</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono text-muted-foreground">
                    <p><span className="text-foreground/80">CURRENT:</span> {preferences.hapticIntensity.toUpperCase()}</p>
                    <p className="leading-relaxed">
                      Haptic intensity affects vibration strength across all interactions including boot sequences, 
                      command execution, suggestion navigation, and system responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-wider text-foreground mb-1">
                    Terminal Sound Effects
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground">
                    Configure typing sound effects volume
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {preferences.soundEnabled && (
                    <Button
                      onClick={handleVolumeTest}
                      variant="outline"
                      size="sm"
                      className="font-mono text-xs"
                    >
                      TEST
                    </Button>
                  )}
                  <Switch
                    checked={preferences.soundEnabled}
                    onCheckedChange={handleSoundToggle}
                  />
                </div>
              </div>

              {preferences.soundEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {volumePresets.map((preset) => {
                      const isActive = Math.abs(preferences.soundVolume - preset.value) < 0.01
                      
                      return (
                        <motion.button
                          key={preset.label}
                          onClick={() => handleVolumePreset(preset.value)}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative px-3 py-2 rounded-lg border transition-all text-center
                            ${isActive 
                              ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20' 
                              : 'bg-card/20 border-border/30 hover:border-border/50'
                            }
                          `}
                          style={isActive ? {
                            boxShadow: '0 0 15px rgba(139, 92, 246, 0.15), inset 0 0 15px rgba(139, 92, 246, 0.08)'
                          } : {}}
                        >
                          <div className={`
                            text-xs font-mono font-bold tracking-wider
                            ${isActive ? 'text-primary' : 'text-foreground/70'}
                          `}>
                            {preset.label}
                          </div>

                          {isActive && (
                            <motion.div
                              layoutId="activeVolume"
                              className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}

                          {isActive && (
                            <motion.div
                              className="absolute top-1 right-1"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-muted-foreground">
                      {preferences.soundVolume === 0 ? (
                        <SpeakerSlash size={20} />
                      ) : (
                        <SpeakerHigh size={20} />
                      )}
                    </div>
                    <Slider
                      value={[preferences.soundVolume]}
                      onValueChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.01}
                      className="flex-1"
                    />
                    <div className="w-12 text-right">
                      <span className="text-xs font-mono text-foreground">
                        {Math.round(preferences.soundVolume * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/10 border border-border/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-accent text-xs">ℹ</span>
                      </div>
                      <div className="space-y-2 text-xs font-mono text-muted-foreground">
                        <p><span className="text-foreground/80">VOLUME:</span> {Math.round(preferences.soundVolume * 100)}%</p>
                        <p className="leading-relaxed">
                          Terminal sound effects play during typing, command execution, and system responses. 
                          Use preset buttons for quick selection or fine-tune with the slider.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="pt-4 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-muted-foreground space-y-1">
                  <p><span className="text-foreground/80">HAPTICS:</span> {preferences.hapticIntensity === 'off' ? 'DISABLED' : 'ENABLED'}</p>
                  <p><span className="text-foreground/80">SOUND:</span> {preferences.soundEnabled ? `ENABLED (${Math.round(preferences.soundVolume * 100)}%)` : 'DISABLED'}</p>
                </div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="font-mono text-xs"
                >
                  RESET TO DEFAULTS
                </Button>
              </div>
            </div>
          </div>

          <div className="px-8 py-4 bg-muted/5 border-t border-border/20">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                Frisky System Preferences v1.0.0
              </p>
              <button
                onClick={onClose}
                className="text-xs font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
              >
                Close [ESC]
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
