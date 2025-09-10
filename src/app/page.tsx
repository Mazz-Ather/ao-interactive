'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroHome from "./components/Home/Hero";
import { sampleData } from "./data/featured-data";
import ServicesSection from "./components/Home/servicesSection";
import { StickyFeatureSection } from "./components/Home/StickyFeatureSection";
import FeaturedProjects from "./components/Home/FeaturedProjects";
import { GooeyMarquee } from "./components/ui/gooeyMarquee";
import Heading from "./components/Home/Heading";
import ContactForm from "./components/layout/ContactForm";
import { Blog } from "./components/layout/Blog";
import VideoPlayer from "./components/ui/video-player";
import FeaturedSection from "./components/Home/FeaturedSection";
import Testimonials from "./components/layout/Testimonials";
import Loader from "./components/layout/Loader";
import FeaturesCards from "./components/ui/feature-shader";
import { BlogPosts } from "./components/ui/blog-posts";

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
          <FeaturesCards />
          {/* <WhyChooseUs /> */}
          <ContactForm/>
          {/* <Blog/> */}
          <BlogPosts  title="Our Most Popular Articles of 2024!"
        description="Discover the most engaging content from our amazing community of developers and designers"
        backgroundLabel="BLOG"
        backgroundPosition="left"
        posts={[
        {
          id: 1,
          href:'/blog/1',
          
      title: "Immersive Technology for Business & Industry",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3_9k5EinZeCzzZgV_kbd0Obhfz3p-5b7LLw&s",
      category: "Web Development",
          views: 2180,
          readTime: 8,
          rating: 5
        },
        {
          id: 2,
          href:'/blog/2',
          title: "Architectural & Product Visualization",
          category: "Programming",
          imageUrl: "https://ao-interactive.com/wp/wp-content/themes/yootheme/cache/thumb5-117cbaab.webp",
          views: 1456,
          readTime: 12,
          rating: 4
        },
        {
          id: 3,
          href:'/blog/3',
          title: " Creative Content & Digital Storytelling",
          category: "UI/UX Design",
          imageUrl: "https://ao-interactive.com/wp/wp-content/themes/yootheme/cache/thumb6-e0a905cf.webp",
          views: 987,
          readTime: 6,
          rating: 4
        }
      ]}
        className="mb-16"
      />
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