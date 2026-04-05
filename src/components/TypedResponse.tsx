import { useTypingEffect } from '@/hooks/use-typing-effect'

interface TypedResponseProps {
  text: string
  className?: string
  style?: React.CSSProperties
  speed?: number
}

export function TypedResponse({ text, className, style, speed = 15 }: TypedResponseProps) {
  const { displayedText, isComplete } = useTypingEffect(text, speed)
  
  return (
    <span className={className} style={style}>
      {displayedText}
      {!isComplete && (
        <span className="inline-block w-1 h-3 ml-0.5 bg-current animate-pulse" />
      )}
    </span>
  )
}
