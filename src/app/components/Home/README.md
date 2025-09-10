# Enhanced Hero Component

## Overview

This premium Hero component for Next.js + Tailwind projects features a two-column layout with video on the left and content on the right. It includes several enhancements:

- Brand color integration with the navbar
- Premium green gradient overlay
- Enhanced typography with gradient text treatment
- Accessible expertise rotator with pagination
- Book a call CTA with modal
- Microinteractions and animations
- Full accessibility support
- Performance optimizations

## Components

### Main Components

1. **EnhancedHero.tsx**
   - Main hero component with gradient text H1 (Variant A)
   - Integrates all sub-components and features

2. **EnhancedHeroVariantB.tsx**
   - Alternative hero design with accent bar instead of gradient text
   - Identical functionality to Variant A

### Helper Components

1. **ExpertiseRotator.tsx**
   - Animated, accessible rotator for expertise items
   - Features pagination dots, hover/focus pause, and keyboard navigation
   - Links to service pages

2. **BookingModal.tsx**
   - Modal for booking a call
   - Includes time selection grid and Calendly integration
   - Fully accessible with keyboard trap and escape key support

### CSS

- **hero-animations.css**
   - Contains keyframe animations and effects
   - Includes reduced motion support

## Features

### Visual Enhancements

- Premium green gradient overlay
- Subtle radial highlight
- Gradient text treatment (Variant A)
- Accent bar (Variant B)
- Glassmorphism for CTA card
- Microinteractions on hover/focus

### Accessibility

- Semantic HTML structure
- Keyboard navigation
- Focus management
- ARIA attributes
- Reduced motion support

### Performance

- Lazy-loaded video with poster
- Optimized animations
- Next.js Image component

### Analytics

- Built-in event tracking
- A/B testing support

## A/B Testing Notes

### Variant A (Gradient Text)

Strengths:
- More visually striking and modern
- Creates stronger brand association with the gradient colors
- May attract more attention to the headline

Potential conversion impact:
- May perform better for creative/innovative services
- Could appeal more to design-focused audiences

### Variant B (Accent Bar)

Strengths:
- Cleaner, more corporate appearance
- Improved readability for longer headlines
- Creates visual hierarchy through structural elements

Potential conversion impact:
- May perform better for professional/enterprise services
- Could appeal more to corporate/business audiences

## Usage

```tsx
import EnhancedHero from '@/app/components/Home/EnhancedHero';

export default function HomePage() {
  return (
    <main>
      <EnhancedHero />
      {/* Other page content */}
    </main>
  );
}
```

For A/B testing between variants:

```tsx
import EnhancedHero, { EnhancedHeroVariantB } from '@/app/components/Home/EnhancedHero';

export default function HomePage() {
  // Implement your A/B testing logic here
  const showVariantB = Math.random() > 0.5; // 50/50 split
  
  return (
    <main>
      {showVariantB ? <EnhancedHeroVariantB /> : <EnhancedHero />}
      {/* Other page content */}
    </main>
  );
}
```

See the HERO-MIGRATION-GUIDE.md for detailed implementation instructions and acceptance criteria.