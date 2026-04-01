# Frisky Dev — Command-Driven Studio Interface

A boutique development studio interface that prioritizes command-driven interaction and narrative system output over traditional dashboard presentation. The product is the command hero experience and narrative system, with the dashboard serving as supporting depth that appears after interaction.

**Experience Qualities**:
1. **Controlled** - Minimal, confident interactions with no loud marketing or over-explanation. Every element serves a clear purpose in the command-driven hierarchy.
2. **Narrative** - Information is presented as structured system output, not traditional marketing sections. Users navigate through command responses and terminal-style formatting.
3. **Layered** - The interface reveals depth progressively: hero command → narrative content → system dashboard. Everything exists in one continuous visual language.

**Complexity Level**: Light Application (multiple features with basic state)
A command-driven interface with authentication, narrative content presentation, and real-time monitoring dashboard. While visually sophisticated with layered reveal mechanics, the core functionality remains focused and minimal.

## Essential Features

**Ingress Terminal Boot Sequence**
- Functionality: Full-screen terminal overlay displaying Forge command sequence before revealing main interface
- Purpose: Establishes technical authority through command-line ritual that sets the tone for the entire experience
- Trigger: Plays automatically on application load
- Progression: Blinking cursor → `frisky@forge:~$ boot_syndicate` → Authority sync → Void line connection → `enter_forge` command → Fade to hero
- Success criteria: Smooth command typing effect, responses appear with Signal Violet and Neon Cyan accents, seamless transition to hero layer

**Command Hero (Primary Layer)**
- Functionality: Persistent command prompt accepting user input with authentication capability and Ghost ID generation
- Purpose: Serves as the main identity and entry point of Frisky—the product IS this command-driven interaction, not the dashboard
- Trigger: Appears after boot sequence completes
- Progression: User sees prompt → Types "auth" → System verifies and generates Ghost_ID → Narrative layer becomes accessible → System layer appears
- Success criteria: Input is responsive and terminal-accurate, Ghost ID feels generated (not preset), authentication unlocks deeper layers, all commands provide clear feedback

**Narrative Layer (Secondary Content)**
- Functionality: Structured system output presenting studio information as command responses, not marketing copy
- Purpose: Communicates what Frisky is, what it does, who it works with—all within command-driven world without breaking character
- Trigger: Appears after authentication, directly below hero
- Progression: User scrolls → Each section appears as formatted system output → Content reveals progressively → Terminal-style formatting throughout
- Success criteria: Sections feel like command responses (→ query format), content is precise and minimal, no traditional headings or SaaS language, maintains boutique studio tone

**System Layer (Dashboard - Tertiary Depth)**
- Functionality: Five glassmorphic vessel modules arranged in pentad topology displaying live telemetry (THE ENGINE at center, surrounded by VOID_LINE, INTAKE, SHADOW, ANCHOR)
- Purpose: Provides supporting technical depth showing operational status—acts as deeper system access, not primary focus
- Trigger: Appears after narrative layer, either on scroll or automatic reveal
- Progression: User enters system layer → Vessels appear with staggered timing → Live telemetry updates → Hover interactions respond → System terminal shows activity
- Success criteria: Dashboard feels like entering deeper into the system, not like a separate page, maintains same visual language as hero and narrative layers

**The Vortex Background (Continuous Atmosphere)**
- Functionality: Animated background with cryptographic data strings creating depth and movement
- Purpose: Provides unified atmospheric layer that connects all three interface layers into one continuous system
- Trigger: Loads on mount, runs continuously across all layers
- Progression: Renders behind all content → Creates depth perception → Maintains consistent visual presence → No hard transitions between layers
- Success criteria: Background feels alive but not distracting, connects hero → narrative → dashboard seamlessly

**Live Telemetry System (System Layer Only)**
- Functionality: Simulated real-time data updates for bandwidth, signal strength, temperature, load, and other operational metrics
- Purpose: Makes the system layer feel operational and alive when user reaches that depth
- Trigger: Starts updating when system layer becomes visible
- Progression: Initialize baseline values → Update every 2 seconds → Display in vessel cards → Continue while visible
- Success criteria: Values change realistically, updates are smooth, data reinforces operational nature

**Inertial Physics**
- Functionality: Premium motion system using cubic-bezier(0.16, 1, 0.3, 1) with 0.8s duration on interactive elements
- Purpose: Creates boutique, controlled feel across all interactions—everything should feel intentional and premium
- Trigger: Any interaction, especially hover states and scroll reveals
- Progression: Detect interaction → Apply transform with inertial curve → Return with matching physics
- Success criteria: All animations feel weighty and controlled, no jarring transitions, interactions feel intentional not reactive

## Edge Case Handling

**No Authentication** - Hero remains visible and functional, narrative layer accessible but system layer stays hidden
**Canvas Performance** - If frame rate drops below 30fps, reduce particle count or simplify animation
**Mobile/Tablet** - Single column layout, simplified vortex animation, command prompt remains functional
**Browser Compatibility** - Fallback to static gradient if Canvas unavailable, all text content remains accessible
**Reduced Motion** - Respect prefers-reduced-motion with static background and instant transitions
**Long Command Input** - Truncate with ellipsis if input exceeds container width

## Design Direction

The interface should evoke boutique studio confidence—controlled, minimal, never loud. The experience centers on command-driven interaction, establishing that Frisky is accessed through terminal-style engagement, not clicked through like a website. The dark obsidian base creates focused workspace where luminous data and system responses float. Information is presented as structured system output with terminal-style formatting, short precise statements, and clear hierarchy. The vortex background suggests constant processing without demanding attention. As users progress from hero → narrative → system, they should feel they're entering deeper into a unified system, not navigating between pages. Everything maintains the same visual language: glassmorphic elements, specular highlights, controlled motion, and technical precision. The tone is boutique, confident, and minimal—avoiding generic SaaS layouts, marketing copy, or over-explanation.

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

Animations serve three key purposes: establish continuous atmosphere (vortex background), provide subtle interaction feedback (command input, scroll reveals), and maintain boutique controlled feel (inertial physics on all interactions). The vortex creates unified depth across all layers—hero, narrative, and system—without hard transitions. Command input uses blinking cursor and typing effects that feel terminal-authentic. Narrative sections reveal on scroll with staggered timing that feels intentional, not automatic. System layer entrance uses same staggered approach as original dashboard but feels like descending deeper into the system. All interactive elements use heavy 0.8s inertial curves (cubic-bezier(0.16, 1, 0.3, 1)) that feel controlled and premium—never snappy or web-like. Vessel cards in system layer maintain specular glint and hover physics. Every animation must feel synchronized with the boutique, minimal, confident tone—nothing arbitrary or distracting.

## Component Selection

- **Components**: 
  - Custom CommandHero with text input and response display
  - Custom NarrativeLayer with scroll-triggered reveals
  - Custom SystemLayer wrapper for existing dashboard vessels
  - Existing VortexBackground (maintains continuous atmosphere)
  - Existing VesselCard glassmorphic containers (system layer only)
  - Existing SystemTerminal (system layer only)
- **Customizations**: 
  - Command input styled as terminal with blinking cursor
  - Narrative sections formatted as system output with left border
  - All three layers share same glassmorphic/backdrop-filter aesthetic
  - Seamless visual language across hero → narrative → system
- **States**: 
  - Command input: idle (blinking cursor), active (user typing), response (system feedback with color coding)
  - Narrative sections: hidden (below viewport), revealing (scroll trigger), visible (in viewport)
  - System layer: hidden (pre-authentication), appearing (staggered vessel entrance), visible (full interaction)
  - Vessel cards in system layer: maintain existing hover physics with specular glint
- **Icon Selection**: 
  - Phosphor icons for system layer modules (Radio, Lightning, Ghost, Database)
  - Custom wolf SVG for ENGINE module
  - Minimal icon use in hero and narrative layers (text-focused)
- **Spacing**: 
  - Hero: centered, max-w-4xl, generous vertical padding
  - Narrative: py-32, max-w-5xl, 24-unit gaps between sections
  - System layer: py-32, max-w-6xl, existing pentad grid spacing
  - Consistent 8px base padding throughout
- **Mobile**: 
  - Command input remains full-width and functional
  - Narrative collapses to single column with maintained spacing
  - System layer vessels stack vertically (existing mobile behavior)
  - Vortex simplifies to gradient (existing mobile behavior)
  - All text remains readable with adjusted letter-spacing
