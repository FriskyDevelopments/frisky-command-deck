# Frisky Dev Syndicate Hub

A high-fidelity, million-dollar command interface that showcases enterprise-grade technical operations through a cinematic, physics-driven glassmorphic experience.

**Experience Qualities**:
1. **Cinematic** - Every visual element feels like it belongs in a high-budget sci-fi interface, with smooth inertial physics and atmospheric depth
2. **Authoritative** - The interface communicates technical mastery and operational control through precise typography and structured information architecture
3. **Hypnotic** - The animated vortex background and synchronized interactions create a mesmerizing, focused experience that draws users into the system

**Complexity Level**: Light Application (multiple features with basic state)
This is a real-time status dashboard with animated visualizations and interactive modules. While visually sophisticated, the core functionality is straightforward monitoring and display.

## Essential Features

**Ingress Terminal Boot Sequence**
- Functionality: Full-screen terminal overlay displaying color-coded boot logs with semantic type indicators before revealing the main dashboard
- Purpose: Creates enhanced cinematic "wow" moment with sophisticated visual hierarchy and reinforces the high-tech, exclusive nature of the system
- Trigger: Plays automatically on application load
- Progression: Display terminal → Show connection logs (white) → Authenticate Ghost_ID (cyan) → Success verification (green) → Load modules sequentially (muted) → Activate Wolf Protocol (violet/critical) → Sync complete (green) → Dissolve into dashboard
- Success criteria: Terminal text types smoothly with color-coded semantics, logs appear with proper timing, module load sequence explicitly lists each vessel, fade-out is seamless, total duration ~5 seconds with refined pacing

**The Vortex Background**
- Functionality: 3D canvas rendering 80 cryptographic data strings flying from center toward viewer with motion blur and depth-based blur effects
- Purpose: Creates atmospheric depth and reinforces the "data stream" metaphor of active operations with significantly increased visual presence
- Trigger: Loads on mount, runs continuously behind boot sequence
- Progression: Initialize canvas → Generate 80 crypto strings → Animate toward viewer in 3D space with increased speed → Apply progressive blur → Enhanced glow and shadow effects → Respond to module hover states
- Success criteria: Smooth 60fps animation, strings are readable with depth blur, color shifts based on active module, 2x particle density creates immersive tunnel effect

**The Pentad Architecture (5 Vessel Modules)**
- Functionality: Five glassmorphic cards arranged in true pentad topology (cross pattern) displaying live telemetry data with unique accent colors and staggered entrance animations
- Purpose: Provides at-a-glance status of all syndicate operations in organized, spatially-logical topology that emphasizes THE ENGINE as central command authority
- Trigger: Renders after enhanced boot sequence with staggered delays: VOID_LINE (0.5s) → INTAKE (0.6s) → ENGINE (0.7s) → SHADOW (0.8s) → ANCHOR (0.9s)
- Progression: Boot complete → Cards appear in pentad layout → ENGINE scales 110% with dominant violet glow → Display live telemetry → Hover triggers physics response and vortex focus → Return to idle state
- Success criteria: Pentad layout is visually clear (top-middle-sides-bottom arrangement), ENGINE dominates as visual anchor with enhanced glow, stagger timing reinforces spatial relationships, hover effects use cubic-bezier inertial curves

**The Engine Module (Center)**
- Functionality: Central command module with 110% scale, animated wolf-head SVG, enhanced glow aura, and core system status—serves as the dominant visual and operational authority of the entire interface
- Purpose: Serves as the PRIMARY visual anchor and authority indicator for the entire system, establishing clear hierarchy and command structure
- Trigger: Pulsing animation starts on load, enhanced glow is constant
- Progression: Render wolf SVG at larger scale → Apply continuous pulse animation → Display CORE_ACTIVE status with larger typography → Apply 40px glow with 80px diffuse shadow → Respond to interactions
- Success criteria: SVG pulses smoothly at 2-second intervals, module is noticeably larger than surrounding vessels, violet glow creates visible aura, status text uses 30px font vs 24px for other modules

**The System Hum Terminal**
- Functionality: Fixed footer displaying scrolling real-time system logs with timestamps
- Purpose: Creates ambient "liveness" and reinforces the operational nature of the interface
- Trigger: Auto-scrolls continuously with new log entries every 3-8 seconds, appears after boot sequence
- Progression: Boot complete → Terminal appears → Generate log entry → Append to terminal → Auto-scroll → Fade old entries → Loop
- Success criteria: Logs scroll smoothly, messages are contextually relevant, no performance impact

**Live Telemetry System**
- Functionality: Simulated real-time data updates for bandwidth, signal strength, temperature, load, and other operational metrics
- Purpose: Creates sense of living, active system with dynamic operational data
- Trigger: Starts updating after boot sequence completes
- Progression: Initialize baseline values → Update every 2 seconds with realistic variance → Display in vessel cards → Continue indefinitely
- Success criteria: Values change smoothly, ranges stay realistic, updates don't cause visual jank

**Inertial Hover Physics**
- Functionality: Premium inertial motion system using cubic-bezier(0.16, 1, 0.3, 1) with 0.8s duration on all interactive elements
- Purpose: Creates high-end, intentional feel that distinguishes interface from standard web interactions—every motion should feel like operating million-dollar equipment
- Trigger: Any hover state on interactive elements, especially vessel cards
- Progression: Detect hover → Apply translateY(-5px) + scale(1.02) transform with inertial curve → Sync vortex color shift → Intensify card border and glow → Return with matching curve on leave
- Success criteria: All animations feel weighty and premium with visible momentum, no janky transitions, hover feels like moving physical objects with real mass

## Edge Case Handling

**Canvas Performance** - If frame rate drops below 30fps, reduce particle count dynamically
**Mobile/Tablet** - Simplify vortex to 2D gradient animation, maintain module functionality
**Browser Compatibility** - Fallback to static gradient if Canvas/WebGL unavailable
**Reduced Motion** - Respect prefers-reduced-motion with static background and instant transitions
**Long Log Messages** - Truncate with ellipsis, ensure terminal doesn't overflow container

## Design Direction

The interface should evoke the feeling of commanding a sophisticated technical operation—like standing in a high-tech war room or NOC (Network Operations Center). Every element should communicate precision, power, and intentionality. The dark obsidian base creates a void for luminous technical data to float within, while the animated vortex suggests constant data flow and processing. The glassmorphic vessels feel like they're carved from light and shadow, with specular highlights that catch the eye like polished metal or obsidian glass.

## Color Selection

The palette is built around deep space and signal frequencies—obsidian void punctuated by vibrant technical accent colors.

- **Primary Color**: Signal Violet `oklch(0.59 0.24 293)` (#8B5CF6) - Represents cryptographic authority and the SHADOW module, communicates exclusivity and technical depth
- **Secondary Colors**: 
  - Oxygen Blue `oklch(0.61 0.18 254)` (#3B82F6) - Technical precision, used for VOID_LINE signals
  - Matrix Green `oklch(0.72 0.19 142)` (#10B981) - Active processing, used for INTAKE telemetry
  - Ghost Grey `oklch(0.55 0.01 264)` (#71717A) - Neutral technical data, used for ANCHOR logs
- **Accent Color**: Neon Cyan `oklch(0.77 0.14 195)` (#06B6D4) - Attention-grabbing for critical status indicators and interactive states
- **Foreground/Background Pairings**:
  - Obsidian Base `oklch(0.10 0 0)` (#050505): Pure White `oklch(0.98 0 0)` (#FAFAFA) - Ratio 18.3:1 ✓
  - Glassmorphic Cards `oklch(0.15 0 0 / 0.4)`: Pure White - Ratio 12.1:1 ✓
  - Signal Violet: White - Ratio 5.2:1 ✓
  - Oxygen Blue: White - Ratio 4.9:1 ✓
  - Matrix Green: Obsidian - Ratio 6.8:1 ✓

## Font Selection

Typography must communicate technical precision and operational clarity, with ultra-light display weights creating an expensive, refined aesthetic against the dark background.

- **Typographic Hierarchy**:
  - H1 (Main Title "FRISKY DEV SYNDICATE"): Inter Extra Light / 56px desktop, 48px mobile / 0.4em letter-spacing / uppercase
  - H2 (Module Headers): Inter Extra Light / 24px / 0.3em letter-spacing / uppercase
  - H2 (ENGINE Module Header): Inter Extra Light / 30px / 0.3em letter-spacing / uppercase (larger for dominance)
  - H3 (Status Labels): JetBrains Mono Regular / 12px / 0.1em letter-spacing / uppercase
  - Body (Technical Data): JetBrains Mono Light / 14px / normal letter-spacing / monospace
  - Caption (Terminal Logs): JetBrains Mono Light / 14px with color coding / normal letter-spacing / 0.9 line-height

## Animations

Animations serve four key purposes: establish spatial depth (enhanced vortex tunnel), provide interaction feedback (inertial hover physics), communicate system hierarchy (ENGINE dominance), and indicate system activity (pulsing, scrolling). The vortex creates an immersive data tunnel with 2x particle density that makes users feel like they're inside the data flow. Hover interactions use heavy 0.8s inertial curves (cubic-bezier(0.16, 1, 0.3, 1)) that feel like operating physical, high-value equipment—not snappy or cheap web buttons. THE ENGINE pulse provides the system's visual heartbeat at 2s intervals. Terminal scrolling with color-coded logs creates sophisticated ambient activity. The pentad layout entrance uses staggered timing (0.5s to 0.9s delays) that draws the eye from top → center → periphery, establishing spatial relationships. All animations must feel synchronized and purposeful, never arbitrary or distracting.

## Component Selection

- **Components**: 
  - Custom Canvas component for vortex background (Three.js or raw Canvas API)
  - Custom VesselCard glassmorphic containers with hover states
  - ScrollArea from Shadcn for terminal logs
  - Badge for status indicators (modified with glow effects)
- **Customizations**: 
  - Glassmorphic cards with backdrop-filter blur, 1px borders, and animated specular highlights
  - Custom wolf SVG with CSS pulse animation
  - Terminal component with auto-scroll and fade gradient
  - Vortex canvas that responds to React state for color shifts
- **States**: 
  - Cards: idle (subtle border), hover (specular glint animation + translateY(-5px) + scale(1.02) with 0.8s inertial curve, vortex color shift), active (sustained glow)
  - ENGINE card: idle includes 40px + 80px layered glow, 60% stronger border (rgba opacity), 110% scale, hover amplifies glow further
  - Status badges: pulsing glow for active states, static for idle
  - Terminal: new log entries fade in with color coding (cyan for auth, green for success, violet for critical, white for system, muted for modules), old entries maintain color but reduce opacity
- **Icon Selection**: 
  - Custom wolf-head SVG for ENGINE module
  - Phosphor icons for module states: Lightning (INTAKE), Radio (VOID_LINE), Ghost (SHADOW), Database (ANCHOR)
- **Spacing**: 
  - Container padding: 8 (32px) for main layout
  - Card padding: 6 (24px) internal
  - Gap between cards in pentad grid: 6 (24px)
  - Pentad grid: CSS Grid 3 columns, explicit row placement for cross/pentad topology
  - ENGINE module: positioned at row 2, column 2 (center) with 110% scale applied via transform
  - Terminal padding: 4 (16px)
  - Maximum content width: 1280px (7xl) for optimal pentad spacing
- **Mobile**: 
  - Vortex simplifies to animated gradient (no canvas on <768px)
  - Pentad grid collapses to single column with order: VOID_LINE → INTAKE → ENGINE (maintains visual prominence) → SHADOW → ANCHOR
  - ENGINE scale reduces to 100% on mobile but maintains enhanced glow
  - Terminal height reduces from 120px to 80px
  - Letter-spacing reduces to 0.2em for readability
  - Card transforms reduce to translateY(-3px) on hover (no scale)
  - Header font size reduces to 48px
