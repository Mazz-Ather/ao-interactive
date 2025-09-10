'use client';

import React, { useState, useEffect, useRef } from 'react';

// Types
export interface ExpertiseItem {
  label: string;
  slug: string;
}

const ExpertiseRotator: React.FC<{
  items: ExpertiseItem[];
  onItemClick: (slug: string) => void;
}> = ({ items, onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Staggered entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [items.length, isPaused, prefersReducedMotion]);

  const handleItemClick = (item: ExpertiseItem, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Add click ripple effect
    const button = e.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(64, 237, 112, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 10;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    setActiveIndex(index);
    onItemClick(item.slug);
  };

  const handleKeyDown = (item: ExpertiseItem, index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveIndex(index);
      onItemClick(item.slug);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative space-y-2"
      onMouseEnter={() => !prefersReducedMotion && setIsPaused(true)}
      onMouseLeave={() => !prefersReducedMotion && setIsPaused(false)}
      onFocus={() => !prefersReducedMotion && setIsPaused(true)}
      onBlur={() => !prefersReducedMotion && setIsPaused(false)}
      role="list"
      aria-label="Our expertise areas"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isNextActive = (index === (activeIndex + 1) % items.length);
        const isPrevActive = (index === (activeIndex - 1 + items.length) % items.length);
        
        return (
          <button
            key={item.slug}
            className={`group relative w-full text-left px-6 py-4 rounded-xl
                       transform transition-all duration-700 ease-out overflow-hidden
                       focus:outline-none 
                       ${isActive 
                         ? 'bg-gradient-to-r from-[#40ED70]/20 via-[#40ED70]/10 to-transparent scale-105 shadow-lg shadow-[#40ED70]/20' 
                         : isNextActive || isPrevActive
                         ? 'bg-gradient-to-r from-slate-800/40 via-slate-700/20 to-transparent hover:border-[#40ED70]/30 hover:bg-slate-700/30'
                         : 'bg-gradient-to-r from-slate-800/20 via-slate-700/10 to-transparent hover:border-white/20 hover:bg-slate-700/20'
                       }
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
            style={{
              transitionDelay: `${index * 100}ms`,
              backdropFilter: 'blur(8px)'
            }}
            onClick={(e) => handleItemClick(item, index, e)}
            onKeyDown={(e) => handleKeyDown(item, index, e)}
            role="listitem"
            tabIndex={0}
            aria-label={`${item.label} - ${isActive ? 'currently selected' : 'click to select'}`}
            aria-current={isActive ? 'true' : 'false'}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r transition-all duration-700
                           ${isActive 
                             ? 'from-[#40ED70]/10 via-emerald-500/5 to-transparent opacity-100' 
                             : 'from-slate-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                           }`}></div>
            
            {/* Glowing edge effect for active item */}
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#40ED70] via-emerald-400 to-[#40ED70] rounded-full shadow-lg shadow-[#40ED70]/50"></div>
            )}
            
            {/* Glassmorphism overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-xl
                           transition-opacity duration-500
                           ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-between">
              <span className={`font-semibold transition-all duration-500 tracking-wide
                             ${isActive 
                               ? 'text-[#40ED70] text-xl lg:text-2xl drop-shadow-sm' 
                               : 'text-white/70 text-lg lg:text-xl group-hover:text-white/90'
                             }`}>
                {item.label}
              </span>
              
              {/* Interactive arrow indicator */}
              <div className={`flex items-center transition-all duration-500
                             ${isActive 
                               ? 'opacity-100 translate-x-0' 
                               : 'opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
                             }`}>
                <svg 
                  className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-[#40ED70]' : 'text-white/40'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Subtle particle effect for active item */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 right-4 w-1 h-1 bg-[#40ED70]/60 rounded-full animate-ping"></div>
                <div className="absolute bottom-3 right-8 w-0.5 h-0.5 bg-emerald-400/40 rounded-full animate-pulse"></div>
              </div>
            )}
          </button>
        );
      })}

      {/* Progress indicator */}
      {/* <div className="flex justify-center mt-6 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#40ED70]/50
                       ${index === activeIndex 
                         ? 'bg-[#40ED70] shadow-lg shadow-[#40ED70]/50 scale-125' 
                         : 'bg-white/20 hover:bg-white/40'
                       }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${items[index].label}`}
          />
        ))}
      </div> */}

      {/* CSS Animation Styles */}
      
    </div>
  );
};

// Enhanced container div with modern entrance animation
export const EnhancedExpertiseSection: React.FC<{
  items: ExpertiseItem[];
  onItemClick: (slug: string) => void;
}> = ({ items, onItemClick }) => {
  return (
    <div className="pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ease-out relative">
      {/* Section header */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide flex items-center gap-3">
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#40ED70] to-emerald-400 rounded-full"></div>
          Our Expertise
        </h3>
        <p className="text-white/60 text-sm">Discover how we can transform your business</p>
      </div>
      
      <ExpertiseRotator 
        items={items} 
        onItemClick={onItemClick} 
      />
      
      {/* Ambient background glow */}
      {/* <div className="absolute -inset-4 bg-gradient-to-br from-[#40ED70]/5 via-transparent to-emerald-500/5 
                    opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-2xl blur-2xl"></div> */}
    </div>
  );
};

export default ExpertiseRotator;