import { useEffect, useState } from 'react'
import { useTypingSound } from '@/hooks/use-typing-sound'

export function useTypingEffect(text: string, speed: number = 30, enableSound: boolean = true) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const { playTypingSound, playCompleteSound } = useTypingSound()

  useEffect(() => {
    setDisplayedText('')
    setIsComplete(false)
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        if (enableSound && text[currentIndex] !== ' ') {
          playTypingSound()
        }
        currentIndex++
      } else {
        setIsComplete(true)
        if (enableSound) {
          playCompleteSound()
        }
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enableSound, playTypingSound, playCompleteSound])

  return { displayedText, isComplete }
}
