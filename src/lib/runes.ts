export const FRISKY_RUNES = {
  CORE: ['ᚠRISK', '⟡', '◬', 'ᚱᚢᚾᛖ'],
  SIGNAL: ['SIGIL', 'CIPHER', 'VEIL', 'FRACTURE'],
  WOLF: ['WOLF', 'FANG', 'PACK', 'HUNT'],
  SYSTEM: ['SYN', 'VOID', 'GLYPH', 'ANCHOR'],
  STATUS: ['SHADOW', 'GLASS', 'STREAM', 'NODE'],
  GLYPHS: ['△', '▽', '◇', '⬡', '⬢', '⬣', '◭', '◮', '◯', '⌬', '⌭', '⌮', '⟢', '⟣']
} as const

export const RUNE_DOCTRINE = [
  'ᚠRISK // SIGIL_ACTIVE',
  'WOLF_CORE :: AWAKENING',
  'RUNE_STREAM // UNSEALED',
  'VOID_LINE :: BREATHING',
  'GLYPH_SYNC // TRUE',
  'SHADOW_MARK // ACCEPTED',
  'ANCHOR_SEAL // LOCKED',
  'GLASS_SIGIL // LIVE',
  'ᚱᚢᚾᛖ // SIGNAL // FRACTURE',
  'SYN // WOLF // VEIL'
] as const

export function getRandomRune(category?: keyof typeof FRISKY_RUNES): string {
  if (category) {
    const runes = FRISKY_RUNES[category]
    return runes[Math.floor(Math.random() * runes.length)]
  }
  const allRunes = Object.values(FRISKY_RUNES).flat()
  return allRunes[Math.floor(Math.random() * allRunes.length)]
}
