'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const loadingTexts = [
  'Initializing...',
  'Loading Assets...',
  'Preparing Experience...',
  'Almost Ready...',
  'Welcome!'
];

// Helper to generate points on circle
const getPointOnCircle = (radius: number, angle: number) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: radius * Math.cos(rad),
    y: radius * Math.sin(rad),
  };
};

const Loader: React.FC<LoaderProps> = ({ onComplete, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number>();
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animate progress and text index
  useEffect(() => {
    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      const newIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
      setCurrentTextIndex(newIndex);

      if (newProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      }
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, onComplete]);

  // Animate time for rotation
  useEffect(() => {
    const animate = (t: number) => {
      setTime(t / 1000);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Mouse move parallax handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30; // range -15 to 15
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Orbital parameters
  const baseRadius = 40;
  const maxRadius = 80;
  const orbitCount = 3;
  const particlesPerOrbit = 6;

  // Calculate radius based on progress (expands)
  const radius = baseRadius + ((maxRadius - baseRadius) * progress) / 100;

  // Rotation speed increases with progress
  const baseSpeed = 20; // degrees per second
  const speed = baseSpeed + (progress / 100) * 40;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, transition: { duration: 1 } }}
          style={{ zIndex: 9999 }}
          role="alert"
          aria-live="assertive"
        >
          {/* SVG Filters for Neon Glow */}
          <svg width="0" height="0" aria-hidden="true" focusable="false">
            <defs>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#40ED70" floodOpacity="0.7" />
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#40ED70" floodOpacity="0.4" />
                <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#40ED70" floodOpacity="0.2" />
              </filter>
            </defs>
          </svg>

          {/* Background subtle noise */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(64,237,112,0.05) 1px, transparent 1px), radial-gradient(circle, rgba(64,237,112,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
              filter: 'blur(1px)',
              zIndex: 0,
            }}
          />

          {/* SVG Orbital Loader */}
          <svg
            width={220}
            height={220}
            viewBox="-110 -110 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
            aria-label="Loading animation"
            role="img"
            style={{
              transform: `translate3d(${mousePos.x / 3}px, ${mousePos.y / 3}px, 0)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            {[...Array(orbitCount)].map((_, orbitIndex) => {
              const orbitRadius = radius * ((orbitIndex + 1) / orbitCount);
              const orbitOpacity = 0.3 + 0.2 * orbitIndex;

              return (
                <g key={orbitIndex} filter="url(#neonGlow)">
                  {/* Orbit circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r={orbitRadius}
                    stroke="rgba(64,237,112,0.4)"
                    strokeWidth={1.5}
                    style={{ filter: 'url(#neonGlow)' }}
                  />

                  {/* Particles on orbit */}
                  {[...Array(particlesPerOrbit)].map((_, particleIndex) => {
                    // Calculate angle for particle
                    const angle =
                      (time * speed * (orbitIndex + 1) * 30 + (360 / particlesPerOrbit) * particleIndex) % 360;
                    const { x, y } = getPointOnCircle(orbitRadius, angle);

                    // Particle trail opacity based on position in orbit (simulate fading trail)
                    const trailOpacity = 0.6 - (particleIndex / particlesPerOrbit) * 0.5;

                    return (
                      <circle
                        key={particleIndex}
                        cx={x}
                        cy={y}
                        r={4}
                        fill="#40ED70"
                        style={{
                          filter: 'url(#neonGlow)',
                          opacity: trailOpacity,
                          transition: 'opacity 0.3s',
                        }}
                      />
                    );
                  })}
                </g>
              );
            })}

            {/* Center glowing orb */}
            <circle
              cx="0"
              cy="0"
              r={radius / 6}
              fill="#40ED70"
              style={{ filter: 'url(#neonGlow)' }}
            />
          </svg>

          {/* Animated Gradient Loading Text */}
          <motion.p
            key={currentTextIndex}
            className="text-4xl font-extrabold mt-8 select-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            aria-live="polite"
            style={{
              background: 'linear-gradient(270deg, #40ED70, #4EFF7A, #40ED70)',
              backgroundSize: '600% 600%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientShift 6s ease infinite',
            }}
          >
            {loadingTexts[currentTextIndex]}
          </motion.p>

          {/* Progress Bar */}
          <div className="w-96 max-w-full mt-6">
            <div className="relative h-3 rounded-full bg-gray-800 overflow-hidden shadow-lg shadow-green-600/30">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #40ED70, #4EFF7A, #40ED70)',
                  boxShadow: '0 0 10px #40ED70',
                }}
                animate={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 25 }}
              >
                <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white opacity-50 animate-pulse" />
              </motion.div>
            </div>
            <motion.div
              className="text-right mt-2 font-mono text-green-400 text-sm select-none"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Gradient animation keyframes */}
          <style>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
