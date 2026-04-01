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
- Functionality: Full-screen terminal overlay displaying boot logs before revealing the main dashboard
- Purpose: Creates cinematic "wow" moment and reinforces the high-tech, exclusive nature of the system
- Trigger: Plays automatically on application load
- Progression: Display terminal → Show connection logs → Authenticate Ghost_ID → Load modules sequentially → Dissolve into dashboard
- Success criteria: Terminal text types smoothly, logs appear in sequence, fade-out is seamless, total duration ~4.5 seconds

**The Vortex Background**
- Functionality: 3D canvas rendering cryptographic data strings flying from center toward viewer with motion blur
- Purpose: Creates atmospheric depth and reinforces the "data stream" metaphor of active operations
- Trigger: Loads on mount, runs continuously behind boot sequence
- Progression: Initialize canvas → Generate crypto strings → Animate toward viewer in 3D space → Apply motion blur → Respond to module hover states
- Success criteria: Smooth 60fps animation, strings are readable but blurred, color shifts based on active module

**The Pentad Architecture (5 Vessel Modules)**
- Functionality: Five glassmorphic cards displaying live telemetry data with unique accent colors and staggered entrance animations
- Purpose: Provides at-a-glance status of all syndicate operations in organized, scannable format
- Trigger: Renders after boot sequence with 150ms stagger between each card
- Progression: Boot complete → Cards slam in sequentially with inertial motion → Display live telemetry → Hover triggers physics response and vortex focus → Return to idle state
- Success criteria: Each module displays live updating data, stagger timing feels intentional, hover effects are smooth with cubic-bezier curves, specular borders are visible

**The Engine Module (Center)**
- Functionality: Central command module with animated wolf-head SVG and core system status
- Purpose: Serves as the visual anchor and primary status indicator for the entire system
- Trigger: Pulsing animation starts on load
- Progression: Render wolf SVG → Apply pulse animation → Display CORE_ACTIVE status → Respond to interactions
- Success criteria: SVG pulses smoothly at 2-second intervals, status text is crisp

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
- Functionality: Heavy easing curves on all interactions using cubic-bezier(0.16, 1, 0.3, 1)
- Purpose: Creates premium, intentional feel that distinguishes interface from standard web interactions
- Trigger: Any hover state on interactive elements
- Progression: Detect hover → Apply transform with inertial curve → Sync vortex color shift → Return with matching curve
- Success criteria: All animations feel weighty and smooth, no janky transitions

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
  - H1 (Main Title "FRISKY DEV SYNDICATE"): Inter Extra Light / 48px / 0.4em letter-spacing / uppercase
  - H2 (Module Headers): Inter Extra Light / 24px / 0.3em letter-spacing / uppercase
  - H3 (Status Labels): JetBrains Mono Regular / 14px / 0.1em letter-spacing / uppercase
  - Body (Technical Data): JetBrains Mono Light / 13px / normal letter-spacing / monospace
  - Caption (Terminal Logs): JetBrains Mono Light / 11px / normal letter-spacing / 0.9 line-height

## Animations

Animations serve three purposes: establish spatial depth (vortex), provide interaction feedback (hover physics), and communicate system activity (pulsing, scrolling). The vortex creates constant ambient motion that grounds the interface in a living data environment. Hover interactions use heavy inertial curves (cubic-bezier(0.16, 1, 0.3, 1)) that feel intentional and premium—not snappy or cheap. The wolf pulse in THE ENGINE provides a visual heartbeat. Terminal scrolling creates ambient "liveness." All animations must feel synchronized and purposeful, never arbitrary or distracting.

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
  - Cards: idle (subtle border), hover (specular glint animation, lift transform, vortex color shift), active (sustained glow)
  - Status badges: pulsing glow for active states, static for idle
  - Terminal: new log entries fade in, old entries fade to 50% opacity
- **Icon Selection**: 
  - Custom wolf-head SVG for ENGINE module
  - Phosphor icons for module states: Lightning (INTAKE), Radio (VOID_LINE), Ghost (SHADOW), Database (ANCHOR)
- **Spacing**: 
  - Container padding: 8 (32px) for main layout
  - Card padding: 6 (24px) internal
  - Gap between cards: 6 (24px)
  - Terminal padding: 4 (16px)
  - Module grid: CSS Grid with minmax(300px, 1fr) for responsive behavior
- **Mobile**: 
  - Vortex simplifies to animated gradient (no canvas on <768px)
  - Pentad grid collapses to single column
  - Terminal height reduces from 120px to 80px
  - Letter-spacing reduces to 0.2em for readability
  - Card transforms reduce to translateY(-3px) on hover
