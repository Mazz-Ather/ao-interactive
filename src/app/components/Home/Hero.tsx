'use client'
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../ui/video-player';
import Link from 'next/link';
import ExpertiseRotator, { EnhancedExpertiseSection } from './ExpertiseRotator';
import Image from 'next/image';
import BookingModal from './BookingModal';

  const expertiseItems = [
    { label: "AI Innovation", slug: "ai-innovation" },
    { label: "Metaverse & Virtual Ecosystems", slug: "metaverse-virtual-ecosystems" },
    { label: "Spatial Computing & Digital Twins", slug: "spatial-computing-digital-twins" },
    { label: "AR/VR Mixed Reality Solutions", slug: "ar-vr-mixed-reality" },
    { label: "Gamification", slug: "gamification" }
  ];
 
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
const HeroHome = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
 
  const [currentService, setCurrentService] = useState(0);
  
  const services = [
    "AI Innovation",
    "Metaverse & Virtual Ecosystems", 
    "Spatial Computing & Digital Twins",
    "AR/VR Mixed Reality Solutions",
    "Gamification"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] px-6  flex items-center justify-center">
      {/* Main Container - Single Unified Hero Section */}
      <div className="max-w-9xl w-full  bg-[#141414]/80  backdrop-blur-sm border border-blue-500/20 rounded-3xl p-11 shadow-2xl relative overflow-hidden">
        
        {/* Enhanced Glowing Background Effects */}
        {/* <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/12 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-400/8 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-cyan-400/8 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-600/8 via-cyan-600/6 to-blue-600/8 rounded-full blur-3xl"></div>
        </div> */}

        {/* Single Unified Horizontal Layout */}
        <div className="relative z-10 flex items-center gap-16 min-h-[600px]">
          
          {/* Left Side - Main Content */}
          <div className="flex-1 space-y-8 relative">
            {/* Enhanced Left Side Gradient Overlay */}
            {/* <div className="absolute -inset-6 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-transparent rounded-2xl blur-sm"></div>
            <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/10 via-cyan-400/8 to-transparent rounded-xl"></div> */}
            
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Variant B: H1 with large accent bar */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-12 bg-[#40ED70] rounded-full mt-2"></div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                 AO <br /> &nbsp;INTERACTIVE
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
                  className="inline-flex items-center gap-3 rounded-lg px-5 py-3 font-semibold shadow-lg transform transition ease-out duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#40ED70]/30 bg-gradient-to-r from-[#40ED70] to-emerald-500 text-black"
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
                  className="inline-flex items-center gap-3 rounded-lg px-5 py-3 font-semibold transition ease-out duration-200 hover:bg-white/5 focus:outline-none focus:ring-4 focus:ring-white/20 border border-white/20 text-white backdrop-blur-sm"
                  aria-label="View our work and portfolio"
                >
                  View Our Work
                </Link>
                
              </div>
            </div>
             <div className="lg:col-span- w-[40vw] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <div className="relative">
             <VideoPlayer src={'/videos/DG.mp4'}/>
            </div>
          </div>
          </div>

          {/* Vertical Divider with Enhanced Glow */}
          {/* <div className="w-px h-full bg-gradient-to-b from-transparent via-green-400 to-[#141414] relative self-stretch">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/20 to-transparent blur-md"></div>
          </div> */}

          {/* Right Side - Services Panel */}
          <div className="flex-1 flex flex-col justify-center relative min-h-[600px]">
            {/* Enhanced Right Side Gradient Overlay */}
            {/* <div className="absolute -inset-6 bg-gradient-to-bl from-cyan-600/15 via-blue-500/10 to-transparent rounded-2xl blur-sm"></div>
            <div className="absolute -inset-3 bg-gradient-to-bl from-cyan-500/10 via-blue-400/8 to-transparent rounded-xl"></div> */}
            
             
<EnhancedExpertiseSection 
  items={expertiseItems} 
  onItemClick={handleExpertiseClick} 
/><div className="pt-6 max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
  <div className="">
   <div className="group relative flex items-center gap-5 p-5 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-xl 0 transition-all duration-700 ease-out hover:bg-gradient-to-br hover:from-[#40ED70]/[0.03] hover:via-transparent hover:to-transparent overflow-hidden">
  
  {/* Animated background glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#40ED70]/10 via-transparent to-[#40ED70]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl"></div>
  
  {/* Floating particles effect */}
  <div className="absolute inset-0 overflow-hidden rounded-3xl">
    <div className="absolute w-32 h-32 bg-[#40ED70]/20 rounded-full blur-3xl -top-16 -left-16 group-hover:scale-150 transition-transform duration-1000"></div>
    <div className="absolute w-20 h-20 bg-[#40ED70]/10 rounded-full blur-2xl top-1/2 right-0 group-hover:translate-x-4 transition-transform duration-700 delay-300"></div>
  </div>

  {/* Avatar section */}
  <div className="relative z-10 flex-shrink-0">
    <div className="relative w-14 h-14">
      {/* Outer rotating ring */}
      {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#40ED70] via-[#40ED70]/60 to-[#40ED70] opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-1000 p-[2px]">
        <div className="w-full h-full rounded-full bg-black/80"></div>
      </div> */}
      
      {/* Avatar container */}
      <div className="absolute inset-[2px] rounded-full overflow-hidden bg-gradient-to-br from-[#40ED70]/20 to-transparent group-hover:scale-105 transition-transform duration-500">
        <Image 
          src="/images/image.png" 
          alt="Ahmed - Solutions Specialist" 
          fill 
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Avatar overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#40ED70]/20 to-[#40ED70]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Pulsing status indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#40ED70] rounded-full border-2 border-black shadow-lg">
        {/* <div className="absolute inset-0 bg-[#40ED70] rounded-full animate-pulse"></div> */}
        <div className="absolute inset-0 bg-[#40ED70] rounded-full animate-ping opacity-75"></div>
      </div>
    </div>
  </div>

  {/* Content section */}
  <div className="relative z-10 flex-grow min-w-0">
    <div className="space-y-1">
      <h4 className="text-white font-semibold text-base tracking-wide group-hover:text-[#40ED70] transition-all duration-500 group-hover:translate-x-1 drop-shadow-sm">
        Ahmed
      </h4>
      <p className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-all duration-500 group-hover:translate-x-1 delay-75">
        Solutions Specialist
      </p>
      
      {/* Animated underline */}
      <div className="relative overflow-hidden">
        <div className="h-0.5 w-16 bg-gradient-to-r from-[#40ED70] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:w-20"></div>
      </div>
    </div>
  </div>

  {/* CTA Button */}
  <div className="relative z-10">
    <button 
      onClick={() => setIsModalOpen(true)}
      className="relative px-5 py-2.5 bg-gradient-to-r from-[#40ED70] to-[#2DD55B] hover:from-[#4AFF7A] hover:to-[#40ED70] text-black text-sm font-bold rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-0.5 focus:outline-none  shadow-lg shadow-[#40ED70]/25 hover:shadow-2xl hover:shadow-[#40ED70]/40 group/btn overflow-hidden"
      data-analytics="book-call"
      aria-label="Book a 15 minute call with Ahmed"
    >
      {/* Button background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
      
      {/* Button text */}
      <span className="relative z-10 flex items-center gap-2">
        Book a 15min Call
        <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
      
      {/* Button outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#40ED70] to-[#2DD55B] opacity-0 group-hover/btn:opacity-30 blur-lg transition-all duration-500 -z-10"></div>
    </button>
  </div>
  
  {/* Subtle border highlight */}
  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-[#40ED70]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
</div>
  </div>
</div>
      </div>
  
        </div>

        {/* Bottom Enhanced Glow Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-blue-500/15 to-transparent blur-xl"></div>
      
      </div>
        
            
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        specialist="Ahmed"
      />
    </div>
  );
};

export default HeroHome;