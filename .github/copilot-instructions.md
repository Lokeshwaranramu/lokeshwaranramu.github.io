# Google Antigravity Portfolio Transformation - Copilot Instructions

Transform the portfolio website at https://lokeshwaranramu.com/ (index.html) to match the Google Antigravity website design with all animations and mouse tracking features.

## Design System - Color Palette

Implement these exact colors from the Antigravity site:

### Primary Colors
- **Background**: `#FFFFFF` (white)
- **Primary Blue**: `#3186FF` 
- **Text Dark**: `#202124`
- **Surface Gray**: `#EFF0F3`

### Accent Colors
- **Yellow**: `#FFE432` / `#FFEE48` / `#FBBC04`
- **Red**: `#FC413D`
- **Green**: `#00B95C`
- **Light Blue**: `#749BFF`

### Semantic Colors
- **Button Primary**: `#3186FF`
- **Button Primary Hover**: Slightly darker blue
- **Button Secondary**: `#F8F9FA`
- **Button Secondary Hover**: `#EFF0F3`
- **Border/Outline**: `#DADCE0`

## Typography

### Font Stack
```css
font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
```

### Font Sizes
- **Hero Title**: 64px (mobile: 40px)
- **Section Headings (h2)**: 48px (mobile: 32px)
- **Subheadings (h3)**: 28px (mobile: 24px)
- **Body Text**: 16px
- **Small Text**: 14px

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Bold: 700

## Layout Structure

### 1. Header/Navigation
- Fixed position with glassmorphism effect
- Logo on left (Google Antigravity logo)
- Navigation menu center: Product, Use Cases, Pricing, Blog, Resources
- Download button on right
- Mobile: Hamburger menu with slide-in overlay
- Implement "hidey bar" - header slides up when scrolling down, returns when scrolling up

### 2. Hero Section (Welcome)
**Key Features:**
- Full viewport height
- Centered content vertically and horizontally
- Animated particle ring background using Canvas or CSS Houdini Paint API
- Logo animation with color-shifting blur effects
- Typewriter effect for tagline
- Two CTA buttons (primary and secondary)

**Particle Ring Animation:**
- Create circular ring of animated particles around center
- 80+ particles of varying sizes (2-4px)
- Particles use colors: navy, yellow (#FFE432), red (#FC413D), green (#00B95C), blue (#3186FF)
- Particles fade in/out (opacity 0.1 to 1.0)
- Ring radius pulses from 150 to 250 (6s ease-in-out)
- Ring follows mouse cursor with 3s ease-out transition
- Continuous ripple animation

### 3. Video Section
- Full-width embedded video (YouTube)
- Aspect ratio maintained
- Subtle fade-in on scroll

### 4. Product Features Section
**Layout:**
- Large typewriter-animated heading
- Horizontal scrolling icon strip (24 Material Icons)
- Icons slide in from right, then wobble vertically
- 5 feature cards in vertical layout

**Feature Cards:**
- Image on left (or top on mobile)
- Content on right with heading and description
- Scroll-triggered animations:
  - Text fades in and slides up
  - Images fade in progressively
  - Opacity transitions create depth

### 5. Developer Carousel
**Carousel Features:**
- Horizontal scroll with snap points
- 3 developer persona cards
- Each card has:
  - Large image (16:9 aspect ratio)
  - Typewriter animated caption overlay
  - Heading and description below
  - "View case" link
- Custom scroll buttons (left/right arrows)
- Scroll buttons use Material Icons
- Snapped item has full opacity, others 25% opacity
- Smooth momentum scrolling

### 6. CTA Section ("Who")
- Two side-by-side cards
- Dark card styling with noise texture background
- Bold headings with gradient text
- Primary and secondary buttons

### 7. Before You Go Section
- Dark card with noise texture
- Typewriter effect for text
- Two download buttons (Apple Silicon, Intel)
- Scale-up animation on scroll (0.85 to 1.0)

## Animations & Interactions

### 1. Mouse Tracking
```javascript
// Track mouse position and update CSS custom properties
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.documentElement.style.setProperty('--mouse-x', x);
  document.documentElement.style.setProperty('--mouse-y', y);
});
```

### 2. Particle Ring Implementation
Use HTML5 Canvas or CSS Houdini Paint Worklet:
```javascript
// Particle system with:
- Ring radius: 100-250px (animated)
- Particle count: 80
- Particle rows: 25
- Particle size: 2px
- Colors: navy, #FFE432, #FC413D, #00B95C, #3186FF
- Alpha range: 0.1 to 1.0
- Seed: 200 (for reproducible randomness)
- Follow mouse position with smooth transition
```

### 3. Typewriter Effect
**Implementation:**
```css
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typewriter 2s steps(40) 1s forwards;
}

.typewriter::after {
  content: '|';
  animation: blink 0.7s infinite;
}
```

**Triggers:**
- Product section heading: when element is 30% in viewport
- Carousel captions: when card is snapped
- Before You Go section: when 30% in viewport

### 4. Scroll-Triggered Animations

**Intersection Observer Setup:**
```javascript
const observerOptions = {
  threshold: [0, 0.3, 0.5, 1],
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);
```

**Animation Classes:**
- Fade in: opacity 0 → 1
- Slide up: translateY(50px) → 0
- Scale up: scale(0.85) → 1
- Slide in (icons): translateX(100%) → 0

### 5. Icon Strip Animation
```css
.icons {
  display: flex;
  gap: 2rem;
  overflow-x: hidden;
  animation: slide-in 1s ease-out;
}

.icon {
  animation: wobble 4s ease-in-out infinite alternate;
  animation-delay: calc(var(--index) * -1s);
}

@keyframes wobble {
  from { transform: translateY(-75%); }
  to { transform: translateY(75%); }
}
```

### 6. Carousel Scroll Behavior
```css
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.carousel > * {
  scroll-snap-align: start;
  flex: 0 0 60%;
  transition: opacity 0.5s;
}

.carousel > *:not(.snapped) {
  opacity: 0.25;
}
```

### 7. Hidey Bar (Header)
```javascript
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});
```

### 8. Noise Texture Backgrounds
Use CSS `filter` or canvas-generated noise:
```css
.dark {
  background: #202124;
  position: relative;
}

.dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* Noise pattern */
  opacity: 0.05;
  mix-blend-mode: overlay;
}
```

## Component Specifications

### Button Styles
```css
button {
  border-radius: 999px;
  padding: 0.6em 1.5em;
  font-size: 0.9em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: background 0.15s ease-out;
  border: none;
}

button.primary {
  background: #3186FF;
  color: white;
}

button.secondary {
  background: #F8F9FA;
  color: #202124;
  border: 1px solid #DADCE0;
}
```

### Card Styles
```css
.card {
  border-radius: 24px;
  padding: 3rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card.dark {
  background: #202124;
  color: white;
}
```

### Feature Card Layout
```css
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4rem;
}

@media (max-width: 930px) {
  .feature {
    grid-template-columns: 1fr;
  }
}
```

## Responsive Breakpoints
- Mobile: < 930px
- Tablet: 930px - 1200px
- Desktop: > 1200px

## Material Icons Integration
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
```

Icons to use:
- keyboard_command_key
- download
- arrow_back
- arrow_forward
- keyboard_return
- keyboard_tab
- merge
- folder
- deployed_code
- dashboard_customize
- commit
- chat_add_on
- device_hub
- refresh
- code
- file_copy
- code_blocks
- upload
- terminal
- swap_horiz
- etc.

## Performance Optimizations
1. Use `will-change` for animated elements
2. Implement lazy loading for images
3. Use `transform` and `opacity` for animations (GPU-accelerated)
4. Debounce scroll and mouse move events
5. Use `IntersectionObserver` instead of scroll listeners where possible

## Progressive Enhancement
1. Base layout works without JavaScript
2. CSS animations work without JS
3. Particle effects degrade gracefully
4. Carousel works with native scroll without JS buttons

## Content Adaptation
- Replace "Google Antigravity" branding with your portfolio name
- Adapt feature sections to showcase your projects/skills
- Replace developer personas with your work examples
- Customize CTA sections for your portfolio goals

## Implementation Checklist
- [ ] Set up color system with CSS custom properties
- [ ] Implement particle ring animation
- [ ] Create navigation with hidey bar
- [ ] Build hero section with animations
- [ ] Add typewriter effects with scroll triggers
- [ ] Implement icon strip with wobble animation
- [ ] Create feature cards with scroll animations
- [ ] Build carousel with snap scrolling
- [ ] Add noise textures to dark cards
- [ ] Implement mouse tracking system
- [ ] Add all scroll-triggered animations
- [ ] Make fully responsive
- [ ] Test all animations and interactions
- [ ] Optimize performance

## Testing Requirements
1. Test on Chrome, Firefox, Safari
2. Test on mobile devices (iOS, Android)
3. Verify animations perform at 60fps
4. Check accessibility (keyboard navigation, screen readers)
5. Validate responsive behavior at all breakpoints
6. Test with reduced motion preferences

---

**Note:** This design is visually impressive and modern. Focus on smooth animations, proper easing functions, and performance optimization to achieve the "wow factor" of the original Antigravity website.