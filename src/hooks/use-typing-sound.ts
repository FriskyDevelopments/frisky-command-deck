import { useCallback, useRef, useEffect } from 'react'
import { usePreferences } from '@/hooks/use-preferences'

export function useTypingSound() {
  const { preferences } = usePreferences()
  const audioContextRef = useRef<AudioContext | null>(null)
  const lastPlayTimeRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new AudioContext()
    }

    return () => {
      audioContextRef.current?.close()
    }
  }, [])

  const playTypingSound = useCallback(() => {
    if (!preferences.soundEnabled || !audioContextRef.current) return

    const now = Date.now()
    if (now - lastPlayTimeRef.current < 20) return
    lastPlayTimeRef.current = now

    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    const frequencies = [800, 900, 850, 920, 880]
    const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)]
    
    oscillator.frequency.setValueAtTime(randomFreq, ctx.currentTime)
    oscillator.type = 'sine'

    const baseVolume = 0.03 * preferences.soundVolume
    const volumeVariation = Math.random() * 0.02 * preferences.soundVolume
    gainNode.gain.setValueAtTime(baseVolume + volumeVariation, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }, [preferences.soundEnabled, preferences.soundVolume])

  const playEnterSound = useCallback(() => {
    if (!preferences.soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.setValueAtTime(600, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
    oscillator.type = 'triangle'

    gainNode.gain.setValueAtTime(0.08 * preferences.soundVolume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  }, [preferences.soundEnabled, preferences.soundVolume])

  const playCompleteSound = useCallback(() => {
    if (!preferences.soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator1 = ctx.createOscillator()
    const oscillator2 = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator1.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator2.frequency.setValueAtTime(1200, ctx.currentTime)
    oscillator1.type = 'sine'
    oscillator2.type = 'sine'

    gainNode.gain.setValueAtTime(0.06 * preferences.soundVolume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)

    oscillator1.start(ctx.currentTime)
    oscillator2.start(ctx.currentTime)
    oscillator1.stop(ctx.currentTime + 0.2)
    oscillator2.stop(ctx.currentTime + 0.2)
  }, [preferences.soundEnabled, preferences.soundVolume])

  return {
    playTypingSound,
    playEnterSound,
    playCompleteSound
  }
}
