'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Type definitions
interface MegaMenuItem {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

interface SubNavItem {
  name: string;
  items: MegaMenuItem[];
}

interface NavItem {
  name: string;
  href?: string;
  hasMegaMenu?: boolean;
  subItems?: SubNavItem[];
}

// Data for mega menus
const navigationData: NavItem[] = [
  {
    name: 'Services 08',
    hasMegaMenu: true,
    subItems: [
      {
        name: 'Digital Transformation',
        items: [
          { 
            title: 'Custom VR/AR Solutions',
            description: 'We build powerful, end-to-end solutions that modernize your business. From complex VR training simulators to comprehensive AR applications, we handle every step of the process.',
            image: '/images/nav1.webp',
            link: '/services/digital-transformation'
          }
        ]
      },
      {
        name: 'Events & Exhibitions',
        items: [
          { 
            title: 'Interactive Event Experiences',
            description: 'Create unforgettable event experiences with our cutting-edge interactive solutions. From virtual exhibitions to hybrid event platforms, we help you engage audiences in innovative ways.',
            image: 'events.png',
            link: '/services/events-exhibitions'
          }
        ]
      },
      {
        name: '3D Animation & Visualisation',
        items: [
          { 
            title: 'Immersive 3D Experiences',
            description: 'Transform your ideas into stunning visual experiences with our advanced 3D animation and visualization services. Perfect for product demonstrations, architectural visualization, and educational content.',
            image: '3d-animation.png',
            link: '/services/3d-animation'
          }
        ]
      },
      {
        name: 'Real Estate Digital Twins',
        items: [
          { 
            title: 'Digital Property Solutions',
            description: 'Create exact digital replicas of your real estate properties. Our digital twin technology enables virtual tours, facility management, and predictive maintenance capabilities.',
            image: 'digital-twins.png',
            link: '/services/digital-twins'
          }
        ]
      },
      {
        name: 'Gamification',
        items: [
          { 
            title: 'Engaging Game Mechanics',
            description: 'Enhance user engagement and motivation through strategic implementation of game elements. We create gamified solutions for training, education, and customer engagement.',
            image: 'gamification.png',
            link: '/services/gamification'
          }
        ]
      }
    ]
  },
  {
    name: 'Industries 11',
    hasMegaMenu: true,
    subItems: [
      
      {
        name: 'Real Estate',
        items: [
          { 
            title: 'Smart Property Solutions',
            description: 'Revolutionize property management with our comprehensive digital solutions. From virtual tours to smart building management systems, we help you leverage technology for better property operations.',
            image: 'real-estate.png',
            link: '/industries/real-estate'
          }
        ]
      },
      {
        name: 'Events & Entertainment',
        items: [
          { 
            title: 'Immersive Event Platforms',
            description: 'Transform your events with cutting-edge digital solutions. Our platforms combine virtual and physical experiences to create engaging, memorable entertainment solutions.',
            image: 'events-entertainment.png',
            link: '/industries/events-entertainment'
          }
        ]
      },
      {
        name: 'Education and Training',
        items: [
          { 
            title: 'Interactive Learning Systems',
            description: 'Enhance education with immersive learning experiences. Our VR/AR training modules and comprehensive LMS solutions revolutionize how knowledge is delivered and retained.',
            image: 'education.png',
            link: '/industries/education'
          }
        ]
      },
      {
        name: 'Healthcare',
        items: [
          { 
            title: 'Digital Health Solutions',
            description: 'Advance healthcare delivery with innovative digital solutions. From patient engagement platforms to medical training simulations, we help modernize healthcare services.',
            image: 'healthcare.png',
            link: '/industries/healthcare'
          }
        ]
      },
      {
        name: 'Defence & Security',
        items: [
          { 
            title: 'Advanced Defense Systems',
            description: 'Enhance military and security operations with state-of-the-art digital solutions. Our simulation systems and secure communications platforms provide cutting-edge capabilities.',
            image: 'defence.png',
            link: '/industries/defence'
          }
        ]
      },
      {
        name: 'Tourism and Hospitality',
        items: [
          { 
            title: 'Smart Tourism Solutions',
            description: 'Elevate guest experiences with innovative digital platforms. From smart booking systems to personalized guest apps, we help you deliver exceptional hospitality services.',
            image: 'tourism.png',
            link: '/industries/tourism'
          }
        ]
      },  {
        name: 'Marketing & Ad Creative',
        items: [
          { 
            title: 'Smart Tourism Solutions',
            description: 'Elevate guest experiences with innovative digital platforms. From smart booking systems to personalized guest apps, we help you deliver exceptional hospitality services.',
            image: 'tourism.png',
            link: '/industries/tourism'
          }
        ]
      },
    ]
  },
  {
    name: 'Products',
    href: '/products'
  },
  {
    name: 'Portfolio',
    href: '/portfolio'
  },
  {
    name: 'About',
    href: '/about'
  }
];

export const Navbar: React.FC = () => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mega menu hover
  const handleMegaMenuEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(itemName);
    const navItem = navigationData.find(item => item.name === itemName);
    if (navItem?.subItems && navItem.subItems.length > 0) {
      setActiveSubItem(navItem.subItems[0].name);
    }
  };

  const handleMegaMenuLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setActiveSubItem('');
    }, 150);
  };

  // Handle clicks outside to close menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get active nav item data
  const activeNavItem = navigationData.find(item => item.name === activeMegaMenu);
  const activeSubItemData = activeNavItem?.subItems?.find(subItem => subItem.name === activeSubItem);

  return (
      <div className="p-2 px-6  bg-[#141414] flex items-center justify-center">
   
     <div className="max-w-9xl m-3 z-[999] w-full backdrop-blur-sm border border-gray-500 rounded  rounded-4xl p-12 shadow-2xl">
    <nav ref={navRef} className="fixed rounded  rounded-4xl top-0 left-0 right-0 z-50 bg-[#141414] text-white">
      {/* Main Navbar */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 border-b border-white/10">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              <Image src="/logoWhite.png" alt="ae-studio" width={100} height={70} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ml-32">
            {navigationData.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasMegaMenu && handleMegaMenuEnter(item.name)}
                onMouseLeave={() => item.hasMegaMenu && handleMegaMenuLeave()}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#40ED70] transition-colors px- py-2 text-lg font-medium rounded-lg hover:bg-whit"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <Link
                    href={`/${item.name.split(' ')[0].toLowerCase()}`}
                    className="text-white  hover:text-[#40ED70] transition-colors px- py-2 text-lg font-semibold flex items-center gap-2 rounded-lg hover:bg-whit group"
                    onMouseEnter={() => item.hasMegaMenu && handleMegaMenuEnter(item.name)}
                  >
                    <span>{item.name.split(' ')[0]}</span>
                    <sup className="text-xs text-[#40ED70]">{item.name.split(' ')[1]}</sup>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Section: Language Toggle and CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-white/20 hover:border-[#40ED70] transition-colors">
              <button className="text-[#40ED70] font-medium">ENG</button>
              <span className="text-white/20">|</span>
              <button className="text-white/60 hover:text-[#40ED70] font-medium">العربي</button>
            </div>
            <Link
              href="/contact"
              className="bg-[#40ED70] inline-flex items-center gap-3 rounded-lg px-5 py-3 font-semibold shadow-lg transform transition ease-out duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#40ED70]/30 bg-gradient-to-r from-[#40ED70] to-emerald-500 text-black"
            >
              Work With Us
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-[#40ED70] transition-colors p-2 rounded-lg hover:bg-white/5"
            aria-label="Open mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMegaMenu && activeNavItem?.hasMegaMenu && (
        <div
          className="absolute top-full left-0  right-0 bg-[#1A1A1A] shadow-2xl border-t border-white/10 rounded  rounded-3xl  transition-all duration-300 ease-in-out"
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={handleMegaMenuLeave}
        >
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              {/* Left Sidebar - Sub Items */}
              <div className="w-1/4">
                <nav className="space-y-2">
                  {activeNavItem.subItems?.map((subItem) => (
                    <button
                      key={subItem.name}
                      onClick={() => setActiveSubItem(subItem.name)}
                      onMouseEnter={() => setActiveSubItem(subItem.name)}
                      className={`w-full text-left px-4 py-3 text-xl font-medium rounded-lg transition-all duration-300 flex items-center justify-between ${
                        activeSubItem === subItem.name
                          ? 'text-[#40ED70] bg-white/5 font-semibold'
                          : 'text-white/80 hover:text-[#40ED70] hover:bg-white/5'
                      }`}
                    >
                      {subItem.name}
                      {activeSubItem === subItem.name && (
                        <svg className="w-4 h-4 text-[#40ED70]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Right Content - Menu Items */}
              <div className="w-3/4 border-l border-white/10 pl-8">
                {activeSubItemData && activeSubItemData.items.map((item, index) => (
                  <div key={index} className="flex gap-8 p-6 rounded-xl hover:bg-white/5 transition-all duration-300 group border border-white/10 hover:border-[#40ED70] mb-4">
                    <div className="flex-1">
                      <Link href={item.link || '#'} className="block">
                        <h3 className="text-2xl font-semibold text-white group-hover:text-[#40ED70] mb-4">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-base text-white/70 leading-relaxed group-hover:text-white/90 mb-4">
                        {item.description}
                      </p>
                      <Link 
                        href={item.link || '#'}
                        className="inline-flex items-center text-[#40ED70] hover:text-[#40ED70]/80 font-medium gap-2 group-hover:translate-x-2 transition-all duration-300"
                      >
                        Learn more
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                    {item.image && (
                      <div className="w-64 h-48 relative rounded-lg overflow-hidden border border-white/10 group-hover:border-[#40ED70] transition-all duration-300">
                        <Image 
                          src={`/images/services/${item.image}`}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navigationData.map((item) => (
              <div key={item.name}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-white hover:text-[#40ED70] block px-4 py-3 text-base font-medium rounded-lg hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href={`/${item.name.split(' ')[0].toLowerCase()}`}
                      className="text-white hover:text-[#40ED70] flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg hover:bg-white/5 w-full"
                      onClick={() => {
                        setActiveMegaMenu(activeMegaMenu === item.name ? null : item.name);
                        if (item.subItems && item.subItems.length > 0) {
                          setActiveSubItem(item.subItems[0].name);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.name.split(' ')[0]}</span>
                        <sup className="text-xs text-[#40ED70]">{item.name.split(' ')[1]}</sup>
                      </div>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${activeMegaMenu === item.name ? 'rotate-90' : ''}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    
                    {/* Mobile Mega Menu Content */}
                    {item.hasMegaMenu && activeMegaMenu === item.name && (
                      <div className="pl-4 space-y-4 border-l border-white/10 ml-4">
                        {item.subItems?.map((subItem) => (
                          <div key={subItem.name} className="space-y-4">
                            <button
                              className={`text-${activeSubItem === subItem.name ? '[#40ED70]' : 'white/80'} hover:text-[#40ED70] font-medium block text-sm px-4 py-2 rounded-lg hover:bg-white/5 w-full text-left`}
                              onClick={() => setActiveSubItem(activeSubItem === subItem.name ? '' : subItem.name)}
                            >
                              {subItem.name}
                            </button>
                            {activeSubItem === subItem.name && subItem.items.map((megaItem, idx) => (
                              <div key={idx} className="p-4 space-y-4">
                                <Link href={megaItem.link || '#'} className="block">
                                  <h4 className="text-lg font-semibold text-white hover:text-[#40ED70] mb-2">
                                    {megaItem.title}
                                  </h4>
                                </Link>
                                <p className="text-sm text-white/70">{megaItem.description}</p>
                                {megaItem.image && (
                                  <div className="relative h-40 rounded-lg overflow-hidden border border-white/10">
                                    <Image 
                                      src={`/images/services/${megaItem.image}`}
                                      alt={megaItem.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <Link 
                                  href={megaItem.link || '#'}
                                  className="inline-flex items-center text-[#40ED70] hover:text-[#40ED70]/80 font-medium gap-2 group mt-2"
                                >
                                  Learn more
                                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </Link>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Language Toggle and CTA */}
            <div className="pt-4 border-t border-white/10 mt-4 space-y-4">
              <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 hover:border-[#40ED70] transition-colors w-fit mx-auto">
                <button className="text-[#40ED70] font-medium">EN</button>
                <span className="text-white/20">|</span>
                <button className="text-white/60 hover:text-[#40ED70] font-medium">AR</button>
              </div>
              <Link
                href="/contact"
                className="bg-[#40ED70] hover:bg-[#40ED70]/90 text-black block px-4 py-3 text-base font-bold rounded-lg text-center hover:scale-105 transform transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    </div>
    </div>
  );
};