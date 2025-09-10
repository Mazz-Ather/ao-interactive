'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ExpertiseRotator from './ExpertiseRotator';

// Brand color from Navbar.tsx
const BRAND_COLOR = '#40ED70'; // Green color used in navbar

// Types
interface BookingOption {
  time: string;
  date: string;
};

// Helper Components
const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  specialist: string;
}> = ({ isOpen, onClose, specialist }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [bookingOptions, setBookingOptions] = useState<BookingOption[]>([
    { time: '9:00 AM', date: 'Mon, Jun 10' },
    { time: '11:30 AM', date: 'Mon, Jun 10' },
    { time: '2:00 PM', date: 'Tue, Jun 11' },
    { time: '4:30 PM', date: 'Wed, Jun 12' },
  ]);

  // Handle click outside to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle keyboard trap for accessibility
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70  bg-[#141414] px-6  flex items-center justify-center backdrop-blur-sm flex items-center justify-center z-50 min-h-screen p-11"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
        <div className="max-w-9xl w-full bg-gradient-to-br from-black via-black to-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-11 shadow-2xl relative overflow-hidden">
    
      <div 
        ref={modalRef}
        className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 max-w-md w-full shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 id="booking-modal-title" className="text-xl font-semibold text-white">Book a call with {specialist}</h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 my-4">
          <p className="text-white/70">Select a time that works for you:</p>
          <div className="grid grid-cols-2 gap-3">
            {bookingOptions.map((option, index) => (
              <button
                key={index}
                className="flex flex-col items-center justify-center p-3 border border-white/10 rounded-lg hover:border-[#40ED70] hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
              >
                <span className="text-[#40ED70] font-medium">{option.time}</span>
                <span className="text-white/70 text-sm">{option.date}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-white/20 rounded-lg text-white/80 hover:text-white hover:border-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            Cancel
          </button>
          <a 
            href="https://calendly.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#40ED70] hover:bg-[#40ED70]/90 text-black rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50"
          >
            Open Calendly
          </a>
        </div>
      </div>
    </div>
    </div>
  );
};

// Main Hero Component - Variant B with Accent Bar
const EnhancedHeroVariantB: React.FC = () => {
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
  const expertiseItems = [
    { label: "AI Innovation", slug: "ai-innovation" },
    { label: "Metaverse & Virtual Ecosystems", slug: "metaverse-virtual-ecosystems" },
    { label: "Spatial Computing & Digital Twins", slug: "spatial-computing-digital-twins" },
    { label: "AR/VR Mixed Reality Solutions", slug: "ar-vr-mixed-reality" },
    { label: "Gamification", slug: "gamification" }
  ];

  return (
    <div className="min-h-screen bg-[#] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-">
      {/* Premium green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-600/20 via-emerald-500/12 to-emerald-900/14 pointer-events-none"></div>
         <div className="max-w-9xl w-full bg-gradient-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-11 shadow-2xl relative overflow-hidden">
    
      {/* Subtle radial highlight */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial-gradient from-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Video (55% width on desktop) */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="relative">
              <video 
                className="w-full h-[240px] md:h-[300px] object-cover rounded-lg border border-white/10 shadow-xl" 
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/images/video-poster.jpg"
                // loading="lazy"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-5 space-y-8 relative">
            {/* Heading with animation */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Variant B: H1 with large accent bar */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-12 bg-[#40ED70] rounded-full mt-1"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  Immersive Experiences
                </h1>
              </div>
              
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
                      src="/images/avatar.jpg" 
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

export default EnhancedHeroVariantB;