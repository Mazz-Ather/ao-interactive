# Enhanced Hero Component Migration Guide

## Migration Steps

1. **Replace the existing Hero component with EnhancedHero**
   - Import the new component: `import EnhancedHero from '@/app/components/Home/EnhancedHero';`
   - Replace `<Hero />` with `<EnhancedHero />` in your page layout

2. **Add required CSS**
   - Import the hero animations CSS in your globals.css:
     ```css
     @import './components/Home/hero-animations.css';
     ```
   - Or copy the contents directly into your globals.css file

3. **Add required assets**
   - Ensure you have the following assets in your public directory:
     - `/images/avatar.jpg` - Specialist avatar image
     - `/images/video-poster.jpg` - Video poster image
     - `/videos/hero-video.mp4` - Hero background video

4. **A/B Testing Setup (Optional)**
   - To implement A/B testing between variants:
     ```tsx
     import EnhancedHero, { EnhancedHeroVariantB } from '@/app/components/Home/EnhancedHero';
     
     // Then in your component:
     const showVariantB = Math.random() > 0.5; // 50/50 split
     return showVariantB ? <EnhancedHeroVariantB /> : <EnhancedHero />;
     ```

## Analytics Implementation

1. **Add analytics tracking**
   - The component already includes data attributes and event tracking
   - Connect the `trackEvent` function in EnhancedHero.tsx to your analytics provider
   - Example events tracked:
     - `hero_cta_primary_click` - When user clicks the primary CTA
     - `expertise_click` - When user clicks on an expertise item

2. **Example analytics payload**
   ```javascript
   // Primary CTA click
   {
     event: 'hero_cta_primary_click',
     location: 'hero',
     button: 'start_project'
   }
   
   // Expertise click
   {
     event: 'expertise_click',
     slug: 'ai-innovation',
     section: 'hero'
   }
   ```

## Acceptance Checklist

### Visual Checks
- [ ] Hero component renders with correct layout (video left, content right)
- [ ] Premium green gradient overlay is visible but subtle
- [ ] H1 heading has proper gradient text treatment (Variant A) or accent bar (Variant B)
- [ ] Buttons have correct styling and hover effects
- [ ] Expertise rotator animates smoothly
- [ ] Book a call CTA has glassmorphism effect and hover animation
- [ ] Modal appears with correct styling and booking options
- [ ] All elements are responsive across different screen sizes

### Accessibility Checks
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible on all interactive elements
- [ ] Expertise rotator pauses on hover/focus
- [ ] Modal traps focus when open and can be closed with Escape key
- [ ] ARIA attributes are correctly implemented
- [ ] Component respects prefers-reduced-motion setting
- [ ] Color contrast meets WCAG standards

### Interaction Checks
- [ ] Primary and secondary CTAs are clickable and navigate correctly
- [ ] Expertise items rotate automatically and can be clicked to navigate
- [ ] Pagination dots work to jump to specific expertise items
- [ ] Book a call button opens modal
- [ ] Modal can be closed by clicking outside, the X button, or pressing Escape
- [ ] Time selection in modal works correctly

### Performance Checks
- [ ] Video loads with lazy loading and has a poster image
- [ ] Animations don't cause layout shifts
- [ ] Component loads quickly without blocking rendering

## Keyboard-Only Interaction Checklist

1. **Tab Navigation**
   - [ ] Tab focus moves through all interactive elements in a logical order
   - [ ] Tab focus is trapped within modal when open

2. **Keyboard Controls**
   - [ ] Enter/Space activates buttons and links
   - [ ] Escape closes the modal
   - [ ] Arrow keys can navigate between time selection options in modal

## Screen Reader Checklist

1. **Semantic Structure**
   - [ ] H1 heading is properly announced
   - [ ] Expertise rotator announces changes with aria-live="polite"
   - [ ] List items in expertise rotator are properly announced

2. **Interactive Elements**
   - [ ] Buttons and links have descriptive accessible names
   - [ ] Modal is announced properly with role="dialog"
   - [ ] Modal title is linked to the dialog with aria-labelledby

3. **State Changes**
   - [ ] Modal open/close state is properly announced
   - [ ] Current expertise item is indicated with aria-current