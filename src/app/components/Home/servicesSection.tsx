'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Service {
  code: string;
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

interface ServicesSectionProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaLink?: string;
  services?: Service[];
}

const defaultServices: Service[] = [
  {
    code: "(001)",
    title: "Digital Transformation",
    description: "Creating transformative digital experiences that blur the line between reality and imagination, bringing brands to life in unprecedented ways.",
    imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format&q=80",
    link: "/services/immersive-transformations"
  },
  {
    code: "(002)",
    title: "Events & Exhibitions",
    description: "Empowering next-gen experiences through AI-driven assistants, content, and environments that adapt, engage, and evolve with your audience.",
    imageSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&auto=format&q=80",
    link: "/services/ai-innovations"
  },
  {
    code: "(003)",
    title: "3D Animation & Visualisation",
    description: "Building immersive virtual worlds and ecosystems that enable seamless interaction, collaboration, and commerce in digital realms.",
    imageSrc: "https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=400&h=300&fit=crop&auto=format&q=80",
    link: "/services/metaverse"
  },
  {
    code: "(004)",
    title: "Real Estate Digital Twins",
    description: "Creating precise digital replicas and spatial computing solutions that bridge physical and digital worlds for enhanced decision-making.",
    imageSrc: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&auto=format&q=80",
    link: "/services/digital-twins"
  },
  {
    code: "(005)",
    title: "Gamification",
    description: "Developing cutting-edge augmented, virtual, and mixed reality applications that transform how users interact with digital content.",
    imageSrc: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=300&fit=crop&auto=format&q=80",
    link: "/services/ar-vr"
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

const expandedContentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const contentItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  heading = "Services.",
  subheading = "We build bridges, connecting people to brands through immersive digital experiences.",
  ctaText = "Book a 15min Call",
  ctaLink = "/book-call",
  services = defaultServices
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleAccordion(index);
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #141414 0%, #1a1a1a 50%, #141414 100%)',
        color: '#e0e0e0',
        minHeight: '100vh',
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #40ED70 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16 lg:mb-24"
          variants={itemVariants}
        >
          <div className="mb-8 lg:mb-0 lg:max-w-2xl">
            <motion.h2
              className="text-4xl lg:text-7xl font-bold mb-4 lg:mb-6"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-0.02em',
                lineHeight: '1.1',
                color: '#40ED70',
                textShadow: '0 0 8px #40ED70',
              }}
              whileHover={{
                letterSpacing: '0.01em',
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
            >
              {heading}
            </motion.h2>
            <motion.p
              className="text-lg lg:text-xl leading-relaxed"
              style={{ color: '#cbd5e1' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {subheading}
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            className="lg:mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a
              href={ctaLink}
              className="group inline-flex items-center px-8 py-4 font-semibold rounded-full shadow-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{
                backgroundColor: '#40ED70',
                color: '#141414',
                boxShadow: '0 4px 20px rgba(48, 206, 92, 0.5)',
              }}
            >
              <span className="mr-3">{ctaText}</span>
              <motion.span
                className="text-xl"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>

              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white opacity-0"
                whileTap={{
                  scale: [1, 1.5],
                  opacity: [0.3, 0],
                  transition: { duration: 0.4 }
                }}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Services List */}
        <motion.div className="space-y-2" variants={itemVariants}>
          {services.map((service, index) => (
            <motion.div
              key={service.code}
              className="border rounded-2xl bg-[#1a1a1a]/90 backdrop-blur-sm overflow-hidden shadow-sm transition-all duration-300"
              style={{
                borderColor: activeIndex === index || isHovered === index ? '#40ED70' : 'rgba(255,255,255,0.1)',
                boxShadow: activeIndex === index || isHovered === index ? '0 0 15px #40ED70' : 'none',
              }}
              variants={itemVariants}
              whileHover={{
                y: -2,
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
              }}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
            >
              {/* Service Item Header */}
              <motion.div
                className={`flex items-center justify-between p-6 lg:p-8 cursor-pointer select-none transition-all duration-300`}
                onClick={() => toggleAccordion(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                role="button"
                aria-expanded={activeIndex === index}
                aria-controls={`service-content-${index}`}
                whileTap={{ scale: 0.998 }}
                style={{
                  backgroundColor: activeIndex === index || isHovered === index ? '#40ED70' : 'transparent',
                  color: activeIndex === index || isHovered === index ? '#141414' : '#e0e0e0',
                }}
              >
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <span
                    className="text-sm font-mono transition-colors duration-300"
                    style={{
                      color: activeIndex === index || isHovered === index ? '#a0f7b1' : '#6b7280',
                    }}
                  >
                    {service.code}
                  </span>
                  <motion.h3
                    className="text-xl lg:text-2xl font-bold tracking-tight"
                    animate={{
                      letterSpacing: isHovered === index ? '0.02em' : '-0.01em'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>
                </div>

                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                  animate={{
                    rotate: activeIndex === index ? 45 : 0,
                    borderColor: activeIndex === index || isHovered === index ? '#141414' : '#6b7280',
                    backgroundColor: activeIndex === index || isHovered === index ? '#141414' : 'transparent',
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  <span
                    className="text-lg font-bold transition-colors duration-300"
                    style={{
                      color: activeIndex === index || isHovered === index ? '#40ED70' : '#9ca3af',
                    }}
                  >
                    +
                  </span>
                </motion.div>
              </motion.div>

              {/* Expanded Content */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`service-content-${index}`}
                    className="bg-[#141414]/90 border-t"
                    style={{ borderColor: 'rgba(64, 237, 112, 0.3)' }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={expandedContentVariants}
                  >
                    <div className="p-6 lg:p-8">
                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Image */}
                        <motion.div
                          className="relative overflow-hidden rounded-xl shadow-lg group"
                          variants={contentItemVariants}
                        >
                          <motion.img
                            src={service.imageSrc}
                            alt={service.title}
                            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            style={{ borderRadius: '1rem' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                          className="space-y-6"
                          variants={contentItemVariants}
                        >
                          <motion.p
                            className="text-lg leading-relaxed"
                            style={{ color: '#cbd5e1' }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                          >
                            {service.description}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            <a
                              href={service.link}
                              className="group inline-flex items-center font-semibold transition-colors duration-200"
                              style={{ color: '#40ED70' }}
                            >
                              <span className="relative">
                                Explore More
                                <motion.span
                                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#40ED70] group-hover:w-full transition-all duration-300"
                                  layout
                                />
                              </span>
                              <motion.span
                                className="ml-2"
                                animate={{ x: [0, 4, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: "loop"
                                }}
                              >
                                →
                              </motion.span>
                            </a>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {services.length === 0 && (
          <motion.div
            className="text-center py-16"
            variants={itemVariants}
          >
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>No services available at the moment.</p>
          </motion.div>
        )}
      </div>

      {/* Subtle glow effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: 'rgba(64, 237, 112, 0.15)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl -z-10"
        style={{ backgroundColor: 'rgba(64, 237, 112, 0.1)' }}
      />
    </motion.section>
  );
};

export default ServicesSection;
