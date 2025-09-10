'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroHome from "./components/Home/Hero";
import { sampleData } from "./data/featured-data";
import ServicesSection from "./components/Home/servicesSection";
import { StickyFeatureSection } from "./components/Home/StickyFeatureSection";
import FeaturedProjects from "./components/Home/FeaturedProjects";
import { WhyChooseUs } from "./components/Home/whyChooseUs";
import { GooeyMarquee } from "./components/ui/gooeyMarquee";
import Heading from "./components/Home/Heading";
import ContactForm from "./components/layout/ContactForm";
import { Blog } from "./components/layout/Blog";
import VideoPlayer from "./components/ui/video-player";
import FeaturedSection from "./components/Home/FeaturedSection";
import Testimonials from "./components/layout/Testimonials";
import Loader from "./components/layout/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add a slight delay before showing content for smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  // Prevent any flash of content by ensuring loader shows first
  useEffect(() => {
    // Hide body scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Loader Component - Always renders first with highest z-index */}
      {isLoading && (
        <Loader 
          onComplete={handleLoadingComplete}
          duration={1500} // Now this actually controls the duration! 16.5 seconds
        />
      )}

      {/* Main Page Content - Only shows after loader completes */}
      {showContent && (
        <div 
          className="animate-fadeIn"
          style={{
            animationDelay: '0.2s',
            animationFillMode: 'both'
          }}
        >
          <HeroHome/>
          <FeaturedSection/>
          <ServicesSection />
          <StickyFeatureSection/>
          <FeaturedProjects/>
          <Testimonials />
          {/* <WhyChooseUs /> */}
          <ContactForm/>
          <Blog/>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}