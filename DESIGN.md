# UI/UX Design Specification

## 🎨 Design Philosophy

**Dark Mode Only** - A meticulously crafted dark theme optimized for extended browsing sessions. No light mode toggle exists; the interface is permanently set to a high-contrast, eye-friendly dark palette.

### Core Principles
1. **Focus First**: Minimize visual noise, maximize content visibility
2. **Hierarchy Through Light**: Use brightness and saturation to establish importance
3. **Subtle Depth**: Layered surfaces with subtle shadows and borders
4. **Accent Restraint**: Vibrant colors used sparingly for active states and feedback

---

## 🌈 Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| `bg-primary` | `#09090b` (zinc-950) | Main background |
| `bg-secondary` | `#18181b` (zinc-900) | Panels, sidebars |
| `bg-tertiary` | `#27272a` (zinc-800) | Cards, inputs |
| `bg-accent` | `#6366f1` (indigo-500) | Primary actions, active states |
| `bg-accent-hover` | `#4f46e5` (indigo-600) | Hover states |
| `text-primary` | `#fafafa` (zinc-50) | Main text |
| `text-secondary` | `#a1a1aa` (zinc-400) | Secondary text |
| `text-muted` | `#71717a` (zinc-500) | Disabled/muted text |
| `border-subtle` | `#3f3f46` (zinc-700) | Subtle borders |
| `border-strong` | `#52525b` (zinc-600) | Strong borders |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| `success` | `#10b981` (emerald-400) | Success states, completions |
| `warning` | `#f59e0b` (amber-400) | Warnings, pending states |
| `error` | `#ef4444` (red-400) | Errors, alerts |
| `info` | `#3b82f6` (blue-400) | Informational messages |

### Gradient Accents
- **Voice Active**: `linear-gradient(135deg, #6366f1 0%, #10b981 100%)`
- **AI Thinking**: `linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%)`

---

## 🖥 Layout Architecture

### Main Window Structure
```
┌─────────────────────────────────────────────────────────────┐
│  Title Bar (Draggable)                                      │
├─────────────────────────────────────────────────────────────┤
│  Tab Bar                                                    │
│  [Tab 1] [Tab 2] [+]                                        │
├─────────────────────────────────────────────────────────────┤
│  Navigation Chrome                                          │
│  [←] [→] [↻] [🏠]  [━━━━━━━━━━━━━━━━━━━━━━]  [🔒] [⋮]      │
│                      Address Bar                            │
├──────────────────────────────────────┬──────────────────────┤
│                                      │                      │
│                                      │   Agent Sidebar      │
│                                      │   (Collapsible)      │
│         WebView                      │                      │
│     (Content Area)                   │  ┌────────────────┐  │
│                                      │  │ Chat History   │  │
│                                      │  │                │  │
│                                      │  │ ○ User         │  │
│                                      │  │ ● AI           │  │
│                                      │  │ ○ User         │  │
│                                      │  │                │  │
│                                      │  ├────────────────┤  │
│                                      │  │ Task Status    │  │
│                                      │  │ "Searching..." │  │
│                                      │  ├────────────────┤  │
│                                      │  │ Waveform Viz   │  │
│                                      │  │ ▂▃▅▆▇▆▅▃▂      │  │
│                                      │  └────────────────┘  │
│                                      │                      │
└──────────────────────────────────────┴──────────────────────┘
```

### Responsive Breakpoints
- **Full Layout**: ≥1200px (Sidebar visible by default)
- **Collapsed Sidebar**: 900px - 1199px (Sidebar collapsed, toggle button visible)
- **Compact Mode**: <900px (Sidebar overlay on toggle)

---

## 🧩 Component Specifications

### 1. Browser Chrome

#### Address Bar
- **Background**: `bg-tertiary` (#27272a)
- **Border**: `border-subtle` (1px solid #3f3f46)
- **Border Radius**: 8px
- **Text**: `text-primary`, monospace font for URL
- **Focus State**: Border changes to `bg-accent`, subtle glow shadow
- **Height**: 40px

#### Navigation Buttons
- **Size**: 32×32px clickable area
- **Icon Color**: `text-secondary` (#a1a1aa)
- **Hover**: Background `bg-tertiary`, icon color `text-primary`
- **Active/Disabled**: Icon color `text-muted` (#71717a)
- **Spacing**: 4px between buttons

#### Tab System
- **Tab Height**: 36px
- **Inactive Tab**: 
  - Background: transparent
  - Text: `text-secondary`
  - Border-bottom: 2px transparent
- **Active Tab**:
  - Background: `bg-secondary`
  - Text: `text-primary`
  - Border-bottom: 2px `bg-accent`
- **New Tab Button**: 
  - Size: 28×28px
  - Icon: `+` in `text-secondary`
  - Hover: Background `bg-tertiary`
- **Tab Close**: 
  - Appears on hover
  - Size: 16×16px
  - Icon: `×`
  - Hover: Background `error`

### 2. Agent Sidebar

#### Container
- **Width**: 320px (expandable to 400px)
- **Background**: `bg-secondary` (#18181b)
- **Border-Left**: 1px solid `border-subtle`
- **Transition**: 300ms ease-in-out for collapse/expand
- **Header**: 
  - Text: "AI Assistant"
  - Font: Semi-bold, `text-primary`
  - Collapse Toggle: Chevron icon, right-aligned

#### Chat History
- **Container**: Flex column, scrollable
- **Message Bubble - User**:
  - Background: `bg-tertiary`
  - Text: `text-primary`
  - Border-radius: 12px (top-left: 4px)
  - Padding: 12px 16px
  - Max-width: 85%
  - Align: Right
- **Message Bubble - AI**:
  - Background: `bg-accent` (10% opacity)
  - Border: 1px solid `bg-accent` (30% opacity)
  - Text: `text-primary`
  - Border-radius: 12px (top-right: 4px)
  - Padding: 12px 16px
  - Max-width: 85%
  - Align: Left
- **Timestamp**: 
  - Font-size: 10px
  - Color: `text-muted`
  - Position: Below bubble, right-aligned (user) / left-aligned (AI)
- **Spacing**: 12px between messages

#### Task Status Panel
- **Background**: `bg-tertiary`
- **Border-radius**: 8px
- **Padding**: 12px
- **Margin**: 12px horizontal
- **Status Indicator**:
  - **Idle**: Gray dot (#71717a)
  - **Listening**: Pulsing green dot (#10b981)
  - **Thinking**: Pulsing indigo dot (#6366f1)
  - **Acting**: Pulsing amber dot (#f59e0b)
- **Status Text**: 
  - Font-size: 13px
  - Color: `text-secondary`
  - Examples: "Ready", "Listening...", "Processing...", "Clicking button...", "Navigating..."
- **Progress Bar** (optional):
  - Height: 3px
  - Background: `bg-secondary`
  - Fill: `bg-accent`
  - Animation: Indeterminate shimmer when active

#### Voice Waveform Visualization
- **Container Height**: 60px
- **Background**: `bg-primary` (inset shadow for depth)
- **Bars**: 20 vertical bars
- **Bar Width**: 4px
- **Bar Gap**: 2px
- **Bar Colors**: Gradient from `bg-accent` to `success`
- **Animation**: 
  - Idle: Subtle low-amplitude oscillation
  - Listening: Dynamic amplitude based on voice input
  - Speaking: Sync with TTS output
- **Border-radius**: 4px on bars
- **Glow Effect**: Subtle drop-shadow when active

### 3. Input Components

#### Chat Input
- **Container**: Fixed at bottom of sidebar
- **Background**: `bg-tertiary`
- **Border**: 1px solid `border-subtle`
- **Border-radius**: 8px
- **Padding**: 8px 12px
- **Placeholder**: "Ask me anything..." (`text-muted`)
- **Send Button**:
  - Icon: Paper plane
  - Background: `bg-accent`
  - Hover: `bg-accent-hover`
  - Disabled: `bg-tertiary`, icon `text-muted`
  - Size: 32×32px
  - Border-radius: 6px
- **Voice Button**:
  - Icon: Microphone
  - Default: `text-secondary`
  - Listening: `success` with pulse animation
  - Size: 32×32px
  - Border-radius: 6px

#### Context Menu
- **Background**: `bg-secondary`
- **Border**: 1px solid `border-strong`
- **Border-radius**: 8px
- **Shadow**: `0 10px 40px rgba(0,0,0,0.5)`
- **Item Height**: 36px
- **Item Padding**: 0 12px
- **Hover**: Background `bg-tertiary`
- **Separator**: 1px solid `border-subtle`
- **Icon**: 16×16px, `text-secondary`
- **Text**: `text-primary`, 13px

### 4. Overlays & Modals

#### Confirmation Dialog
- **Backdrop**: `rgba(0,0,0,0.75)` with blur (8px)
- **Container**:
  - Background: `bg-secondary`
  - Border: 1px solid `border-strong`
  - Border-radius: 12px
  - Max-width: 400px
  - Shadow: `0 20px 60px rgba(0,0,0,0.6)`
- **Header**: 
  - Font-size: 16px, semi-bold
  - Color: `text-primary`
  - Padding: 20px 24px 0
- **Body**: 
  - Color: `text-secondary`
  - Padding: 16px 24px
- **Footer**: 
  - Flex row, justify-end
  - Gap: 12px
  - Padding: 0 24px 20px
- **Buttons**:
  - **Cancel**: Background `bg-tertiary`, text `text-primary`
  - **Confirm**: Background `bg-accent`, text white

#### Loading Overlay
- **Backdrop**: `rgba(9,9,11,0.9)`
- **Spinner**:
  - Size: 48px
  - Color: `bg-accent`
  - Animation: 1s linear infinite rotation
- **Text**: 
  - Below spinner
  - Color: `text-secondary`
  - Font-size: 14px

---

## 🎭 Interaction States

### Hover Effects
- **Buttons**: Background lighten by 10%, transition 150ms
- **Links**: Underline appears, color shifts to `bg-accent`
- **Cards**: Subtle lift (translateY -2px), shadow increase
- **Inputs**: Border color shifts to `bg-accent`

### Active/Pressed States
- **Buttons**: Scale down to 95%, background darken by 10%
- **Tabs**: Immediate background change, no delay
- **Toggle Switches**: Smooth slide animation (200ms)

### Focus States
- **Visible Outline**: 2px solid `bg-accent` with 2px offset
- **Inputs**: Border glow (box-shadow: 0 0 0 3px rgba(99,102,241,0.3))
- **Skip Links**: Appear on Tab key press only

### Disabled States
- **Opacity**: 50%
- **Cursor**: not-allowed
- **Interactions**: All pointer events disabled
- **Color**: Shift to `text-muted`

---

## 🎬 Animations & Transitions

### Timing Functions
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)` (300ms)
- **Enter**: `cubic-bezier(0, 0, 0.2, 1)` (250ms)
- **Exit**: `cubic-bezier(0.4, 0, 1, 1)` (200ms)
- **Bounce**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (400ms)

### Key Animations

#### Sidebar Collapse
```css
transform: translateX(0) → translateX(100%)
opacity: 1 → 0 (last 20%)
duration: 300ms
```

#### Message Enter
```css
opacity: 0 → 1
transform: translateY(10px) → translateY(0)
scale: 0.95 → 1
duration: 250ms
stagger: 50ms per message
```

#### Pulse (Status Indicators)
```css
scale: 1 → 1.2 → 1
opacity: 1 → 0.5 → 1
duration: 1.5s
iteration: infinite
```

#### Waveform Bars
```css
height: random(10%-100%)
duration: random(0.3s-0.8s)
iteration: infinite
ease: sine-in-out
```

#### Button Ripple
```css
scale: 0 → 1
opacity: 0.5 → 0
duration: 600ms
position: click coordinates
```

---

## 🔤 Typography

### Font Stack
- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Monospace**: JetBrains Mono, Fira Code, monospace (for URLs, code)
- **Fallback**: Segoe UI, Roboto, Helvetica Neue, Arial

### Type Scale
| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 24px | 700 | 1.2 | Page titles |
| H2 | 20px | 600 | 1.3 | Section headers |
| H3 | 18px | 600 | 1.4 | Subsections |
| Body | 14px | 400 | 1.5 | Main content |
| Small | 12px | 400 | 1.4 | Captions, metadata |
| Tiny | 10px | 400 | 1.3 | Timestamps, labels |
| URL | 13px | 400 | 1.4 | Address bar (mono) |

### Text Treatments
- **Primary Text**: `text-primary` (#fafafa)
- **Secondary Text**: `text-secondary` (#a1a1aa)
- **Muted Text**: `text-muted` (#71717a)
- **Links**: `bg-accent`, underline on hover
- **Code**: Background `bg-primary`, padding 2px 6px, radius 4px

---

## 📐 Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Icon gaps |
| `space-3` | 12px | Component padding |
| `space-4` | 16px | Standard spacing |
| `space-5` | 20px | Section spacing |
| `space-6` | 24px | Large gaps |
| `space-8` | 32px | Major sections |
| `space-10` | 40px | Page margins |
| `space-12` | 48px | Hero spacing |

### Layout Spacing
- **Container Padding**: 16px (mobile), 24px (desktop)
- **Card Padding**: 16px or 20px
- **Button Padding**: 8px 16px (horizontal), 10px 20px (large)
- **Input Padding**: 10px 14px
- **Modal Padding**: 24px

---

## 🎯 Accessibility

### Contrast Ratios
- **Primary Text on Background**: 16.5:1 ✓ (AAA)
- **Secondary Text on Background**: 7.2:1 ✓ (AA)
- **Accent on Background**: 4.5:1 ✓ (AA)
- **Focus Indicators**: 4.8:1 ✓ (AA)

### Keyboard Navigation
- **Tab Order**: Logical flow (left→right, top→bottom)
- **Focus Visible**: Always visible, never removed
- **Skip Links**: "Skip to content", "Skip to sidebar"
- **Shortcuts**:
  - `Ctrl+L`: Focus address bar
  - `Ctrl+K`: Open command palette
  - `Ctrl+M`: Toggle sidebar
  - `Escape`: Close overlays, blur inputs

### Screen Reader Support
- **ARIA Labels**: All interactive elements labeled
- **Live Regions**: Chat updates announced politely
- **Status Changes**: Task status announced on change
- **Icons**: Decorative icons hidden, functional icons labeled

### Motion Sensitivity
- **Respects prefers-reduced-motion**: Disables non-essential animations
- **Critical Animations Only**: Status indicators remain (subtle)
- **Instant Transitions**: No fade/slide when reduced motion enabled

---

## 📱 Responsive Adaptations

### Desktop (≥1200px)
- Sidebar: Always visible, 320px width
- Tabs: Full width, scrollable if needed
- Waveform: Full 60px height
- Chat: Multi-column layout supported

### Tablet (900px - 1199px)
- Sidebar: Collapsed by default, toggle button visible
- Tabs: Compressed, smaller favicons
- Waveform: 48px height
- Address bar: Slightly reduced padding

### Compact (<900px)
- Sidebar: Overlay mode, full width on toggle
- Tabs: Single row, horizontal scroll
- Navigation: Some buttons move to overflow menu
- Waveform: 40px height, fewer bars (12 instead of 20)

---

## 🎨 Dark Mode Enforcement

### CSS Variables (Forced)
```css
:root {
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --bg-tertiary: #27272a;
  --bg-accent: #6366f1;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --border-subtle: #3f3f46;
  /* ... all variables forced to dark values */
}

/* No light mode overrides exist */
/* No data-theme or class-based toggles */
```

### Tailwind Configuration
```js
module.exports = {
  darkMode: 'class', // But class is always present
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        // ... all colors mapped to dark palette
      }
    }
  }
}
```

### HTML Enforcement
```html
<html class="dark" data-theme="dark">
<!-- No toggle button rendered anywhere -->
```

---

## 🖼 Visual Assets

### Icons
- **Library**: Lucide React (consistent stroke width: 1.5px)
- **Color**: Inherit from text color by default
- **Size**: 16px, 20px, 24px standard sizes
- **Style**: Outlined, rounded caps and joins

### Favicons
- **Default Fallback**: Globe icon in `text-muted`
- **Size**: 16×16px in tabs, 32×32px in bookmarks
- **Masking**: Circular mask with subtle shadow

### Logos
- **App Logo**: Gradient wordmark (indigo→emerald)
- **Placement**: Top-left of title bar (small), splash screen (large)
- **Monochrome Version**: For small sizes (<24px)

---

## 🧪 UX Validation Checklist

- [ ] All text meets WCAG AA contrast minimum
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation completes all tasks
- [ ] Animations respect reduced-motion preference
- [ ] Error states clearly communicated
- [ ] Loading states provide feedback within 100ms
- [ ] Voice waveform responds in real-time (<50ms latency)
- [ ] Sidebar collapse/expand smooth at 60fps
- [ ] No pure black (#000000) backgrounds (use zinc-950)
- [ ] Accent colors used consistently for actions only
- [ ] No light mode code paths exist
- [ ] Scrollbars styled to match dark theme
- [ ] Selection color customized (indigo with 30% opacity)

---

## 📝 Design Tokens Export

Available in `src/styles/tokens.ts` for programmatic access:
- Colors (hex, rgb, hsl)
- Spacing scale
- Typography scale
- Border radius values
- Shadow definitions
- Animation timings
- Z-index layers

---

*Last Updated: 2024*
*Version: 1.0.0*
*Maintained by: Design Systems Team*
