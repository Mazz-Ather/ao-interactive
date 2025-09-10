'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExpertiseRotator, { ExpertiseItem } from './ExpertiseRotator';
import BookingModal from './BookingModal';
import VideoPlayer from '../ui/video-player';

// Brand color from Navbar.tsx
const BRAND_COLOR = '#40ED70'; // Green color used in navbar

// Types

// Helper Components

// Main Hero Component
const EnhancedHero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Analytics tracking
  const trackEvent = (eventName: string, payload: Record<string, any>) => {
    // This would connect to your analytics system
    console.log(`[Analytics] ${eventName}`, payload);
  };

  const handleExpertiseClick = (slug: string) => {
    trackEvent('expertise_click', { slug, section: 'hero' });
  };

  const handleCtaClick = () => {
    trackEvent('hero_cta_primary_click', { location: 'hero', button: 'start_project' });
  };

  // Expertise items with slugs
  const expertiseItems: ExpertiseItem[] = [
    { label: "AI Innovation", slug: "ai-innovation" },
    { label: "Metaverse & Virtual Ecosystems", slug: "metaverse-virtual-ecosystems" },
    { label: "Spatial Computing & Digital Twins", slug: "spatial-computing-digital-twins" },
    { label: "AR/VR Mixed Reality Solutions", slug: "ar-vr-mixed-reality" },
    { label: "Gamification", slug: "gamification" }
  ];

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Premium green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-600/20 via-emerald-500/12 to-emerald-900/14 pointer-events-none"></div>
      
      {/* Subtle radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial-gradient from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Video (55% width on desktop) */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="relative">
              <div 
                className="w-full h-[240px] md:h-[300px] bg-[#1A1A1A] rounded-lg border border-white/10 shadow-xl flex items-center justify-center"
              >
                <Image 
                  src="/images/video-poster.svg" 
                  alt="Video placeholder" 
                  width={1280} 
                  height={720}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-5 space-y-8 relative">
            {/* Heading with animation */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Variant A: Gradient text H1 */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#40ED70]/90 to-emerald-300 leading-tight tracking-tight">
                Immersive Experiences
              </h1>
              
              {/* Paragraph */}
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                We create cutting-edge digital solutions that transform businesses across Saudi Arabia and beyond.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 font-semibold shadow-lg transform transition ease-out duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#40ED70]/30 bg-gradient-to-r from-[#40ED70] to-emerald-500 text-black"
                  data-analytics="book-call"
                  aria-label="Start your project with us"
                >
                  Start Your Project
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <Link 
                  href="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 font-semibold transition ease-out duration-200 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-white/20 border border-white/20 text-white backdrop-blur-sm"
                  aria-label="View our work and portfolio"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            
            {/* Expertise Rotator */}
            <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <h3 className="text-lg text-white/70 font-medium mb-4">Our Expertise</h3>
              <ExpertiseRotator 
                items={expertiseItems} 
                onItemClick={handleExpertiseClick} 
              />
            </div>
            
            {/* Book a Call CTA */}
            <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#40ED70]/50 flex-shrink-0">
                    <Image 
                      src="/images/avatar.svg" 
                      alt="Specialist avatar" 
                      fill 
                      className="object-cover"
                    />
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 bg-[#40ED70]/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Lauren Sanders</h4>
                    <p className="text-white/60 text-sm">Solutions Specialist</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="ml-auto bg-[#40ED70] hover:bg-[#40ED70]/90 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
                    data-analytics="book-call"
                    aria-label="Book a 15 minute call with Lauren"
                  >
                    Book a 15min Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        specialist="Lauren Sanders"
      />
    </div>
  );
};

// Variant B Component (with accent bar instead of gradient text)
export const EnhancedHeroVariantB: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Analytics tracking
  const trackEvent = (eventName: string, payload: Record<string, any>) => {
    // This would connect to your analytics system
    console.log(`[Analytics] ${eventName}`, payload);
  };

  const handleExpertiseClick = (slug: string) => {
    trackEvent('expertise_click', { slug, section: 'hero' });
  };

  const handleCtaClick = () => {
    trackEvent('hero_cta_primary_click', { location: 'hero', button: 'start_project' });
  };

  // Expertise items with slugs
  const expertiseItems: ExpertiseItem[] = [
    { label: "AI Innovation", slug: "ai-innovation" },
    { label: "Metaverse & Virtual Ecosystems", slug: "metaverse-virtual-ecosystems" },
    { label: "Spatial Computing & Digital Twins", slug: "spatial-computing-digital-twins" },
    { label: "AR/VR Mixed Reality Solutions", slug: "ar-vr-mixed-reality" },
    { label: "Gamification", slug: "gamification" }
  ];

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Premium green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-600/20 via-emerald-500/12 to-emerald-900/14 pointer-events-none"></div>
      
      {/* Subtle radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial-gradient from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Content and Video (55% width on desktop) */}
          <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {/* Heading with animation */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Variant B: H1 with accent bar */}
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight pl-4 border-l-4 border-[#40ED70]">
                Immersive Experiences
              </h1>
              
              {/* Paragraph */}
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                We create cutting-edge digital solutions that transform businesses across Saudi Arabia and beyond.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 font-semibold shadow-lg transform transition ease-out duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#40ED70]/30 bg-gradient-to-r from-[#40ED70] to-emerald-500 text-black"
                  data-analytics="book-call"
                  aria-label="Start your project with us"
                >
                  Start Your Project
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <Link 
                  href="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full px-5 py-3 font-semibold transition ease-out duration-200 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-white/20 border border-white/20 text-white backdrop-blur-sm"
                  aria-label="View our work and portfolio"
                >
                  View Our Work
                </Link>
              </div>
            </div>
            
            {/* Video Component */}
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <div className="relative w-full">
                {/* Using the VideoPlayer component from Hero.tsx */}
                <div className="w-full max-w-full mx-auto">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-video">
                      <div className="w-full h-full">
                        <VideoPlayer src="https://videos.pexels.com/video-files/30333849/13003128_2560_1440_25fps.mp4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Expertise and Book Call */}
          <div className="lg:col-span-5 space-y-8 relative">
            {/* Expertise Vertical List */}
            <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <h3 className="text-lg text-white/70 font-medium mb-6 border-b border-white/10 pb-2">Our Expertise</h3>
              <ExpertiseRotator 
                items={expertiseItems} 
                onItemClick={handleExpertiseClick} 
              />
            </div>
            
            {/* Book a Call CTA */}
            <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#40ED70]/50 flex-shrink-0">
                    <Image 
                      src="/images/avatar.svg" 
                      alt="Specialist avatar" 
                      fill 
                      className="object-cover"
                    />
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 bg-[#40ED70]/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Lauren Sanders</h4>
                    <p className="text-white/60 text-sm">Solutions Specialist</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="ml-auto bg-[#40ED70] hover:bg-[#40ED70]/90 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
                    data-analytics="book-call"
                    aria-label="Book a 15 minute call with Lauren"
                  >
                    Book a 15min Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        specialist="Lauren Sanders"
      />
    </div>
  );
};

export default EnhancedHero;

// CSS for radial gradient (to be added to globals.css)
/*
.bg-radial-gradient {
  background-image: radial-gradient(circle, var(--tw-gradient-stops));
}

@keyframes slide-up-fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up-fade-in {
  animation: slide-up-fade-in 0.5s ease-out forwards;
}
*/