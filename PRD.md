# Frisky Dev — Boutique Studio Interface

A clean, focused boutique development studio interface with a command-driven hero and system monitoring dashboard. The interface is intentionally simplified while maintaining the distinctive Frisky visual identity.

**Experience Qualities**:
1. **Focused** - Single-page experience with command input and vessel monitoring, nothing unnecessary.
2. **Elegant** - Dark obsidian aesthetic with signal-frequency accents, premium typography, and controlled motion.
3. **Immediate** - No boot sequences or authentication gates—everything visible and accessible from the start.

**Complexity Level**: Micro Tool (single-purpose application)
A boutique studio showcase with simple command interface and status dashboard. Clean, focused, and immediately accessible.

## Essential Features

**Command Hero Interface**
- Functionality: Simple terminal-style command prompt accepting basic commands (help, status, about, contact, clear)
- Purpose: Establishes boutique studio identity through command-driven interaction without complexity
- Trigger: Always visible and accessible on page load
- Progression: User types command → presses enter → response appears above → history builds up → can clear anytime
- Success criteria: Typing feels responsive, responses are clear and brief, commands work reliably, interface stays focused

**Vessel Dashboard**
- Functionality: Five status cards showing system components (VOID_LINE, THE ENGINE, SHADOW, INTAKE, ANCHOR)
- Purpose: Displays studio "systems" as an aesthetic and identity element—not functional monitoring
- Trigger: Visible below command interface on page load
- Progression: Cards display static status → user can view at a glance → hover provides subtle visual feedback
- Success criteria: Cards feel premium with glassmorphic styling, arrangement works on mobile, visual hierarchy is clear

**Vortex Background**
- Functionality: Animated background with cryptographic data strings creating atmospheric depth
- Purpose: Provides unified visual atmosphere that connects all interface elements
- Trigger: Loads on mount, runs continuously
- Progression: Renders behind all content → Creates subtle depth and motion → Maintains consistent presence
- Success criteria: Background feels alive but not distracting, performs well across devices, enhances rather than competes with content

## Edge Case Handling

**Empty Command Input** - Pressing enter without typing does nothing, no error shown
**Unknown Commands** - Shows brief error message with suggestion to type "help"
**Long Command History** - History container scrolls, older commands remain accessible
**Canvas Performance** - If frame rate drops, vortex animation degrades gracefully
**Mobile/Tablet** - Vessels stack vertically, command input remains full-width and functional
**Reduced Motion** - Respects prefers-reduced-motion with static background

## Design Direction

The interface should feel like a focused, premium boutique studio showcase—dark, elegant, and confident. The command terminal establishes the studio's technical identity without overwhelming the user. Information is delivered briefly and clearly through simple command responses. The vortex background suggests constant processing depth without demanding attention. The vessel cards provide visual interest and reinforce the studio's system-oriented approach. Everything maintains consistent glassmorphic styling, specular highlights, and controlled motion. The tone is boutique, confident, and minimal—avoiding generic layouts or over-explanation. The experience should feel immediately accessible yet distinctly premium.

## Color Selection

The palette is built around **pure Obsidian-Noir `oklch(0.02 0 0)`** as the Deep Void surface—creating focused, boutique workspace aesthetic. Signal frequencies punctuate the darkness for command feedback and system responses.

- **Surface Foundation**: Pure Obsidian-Noir `oklch(0.02 0 0)` - The Deep Void, eliminates distraction and creates controlled workspace
- **Primary Color**: Signal Violet `oklch(0.59 0.24 293)` - Command prompts, active states, system authority
- **Secondary Colors**: 
  - Oxygen Blue `oklch(0.61 0.18 254)` - System responses, verified states
  - Matrix Green `oklch(0.72 0.19 142)` - Success confirmations, active processing
  - Ghost Grey `oklch(0.50 0.01 264)` - Muted system output, secondary data
- **Accent Color**: Neon Cyan `oklch(0.77 0.14 195)` - Critical status, authentication confirmations
- **Foreground/Background Pairings**:
  - Deep Void `oklch(0.02 0 0)`: Pure White `oklch(0.98 0 0)` - Ratio 21.0:1 ✓
  - Command Input BG `oklch(0.08 0 0 / 0.3)`: Pure White - Ratio 15.8:1 ✓
  - Signal Violet: White - Ratio 5.2:1 ✓
  - Neon Cyan: Deep Void - Ratio 8.4:1 ✓

## Font Selection

Typography communicates boutique studio precision and technical clarity with ultra-light display weights creating refined, confident aesthetic against dark background.

- **Typographic Hierarchy**:
  - H1 (Hero Title "Frisky"): Inter Extra Light / 96px desktop, 64px mobile / 0.4em letter-spacing / uppercase
  - H2 (Layer Headers): Inter Extra Light / 32px / 0.3em letter-spacing / uppercase
  - Command Prompt: JetBrains Mono Regular / 14px / normal letter-spacing / monospace
  - Body (Narrative Content): Inter Light / 14px / normal letter-spacing / comfortable line-height
  - Technical Data Labels: JetBrains Mono Light / 12px / 0.1em letter-spacing / uppercase
  - System Output: JetBrains Mono Light / 14px / normal letter-spacing / 0.9 line-height

## Animations

Animations serve two key purposes: provide atmospheric depth (vortex background) and subtle interaction feedback (card hovers, typing cursor). The vortex creates unified depth behind all content without hard transitions or distractions. The command input uses a blinking cursor that feels terminal-authentic. Vessel cards use gentle hover effects with the existing specular glint and lift on interaction. All motions use controlled 0.8s inertial curves (cubic-bezier(0.16, 1, 0.3, 1)) that feel premium and intentional. Every animation must feel synchronized with the boutique, minimal tone—nothing arbitrary or excessive.

## Component Selection

- **Components**: 
  - Simple command form with text input and history display
  - VortexBackground (existing canvas animation)
  - Inline VesselCard components with status badges
  - WolfIcon SVG for ENGINE module
  - Phosphor icons for other vessels
- **Customizations**: 
  - Command input styled as terminal with blinking cursor
  - Response history with glassmorphic containers
  - Vessel cards with same glassmorphic/backdrop-filter aesthetic
  - Consistent visual language throughout
- **States**: 
  - Command input: idle (blinking cursor), active (user typing), submitted (response appears)
  - Vessel cards: default and hover (subtle lift with specular glint)
- **Icon Selection**: 
  - Phosphor icons for vessels (Radio, Lightning, Ghost, Database)
  - Custom wolf SVG for ENGINE module
- **Spacing**: 
  - Centered layout with max-w-4xl for command hero
  - max-w-6xl for vessel grid
  - Generous vertical spacing (py-6, mt-24)
  - 6-unit gaps in vessel grid
- **Mobile**: 
  - Command input remains full-width and functional
  - Vessels stack to single column
  - Vortex simplifies gracefully
  - All text remains readable
