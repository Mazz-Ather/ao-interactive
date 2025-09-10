"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react"
import { cn } from "@/lib/utils"

export interface FullScreenFXAPI {
  goToSection: (index: number) => void
  getCurrentSection: () => number
  nextSection: () => void
  prevSection: () => void
}

interface Section {
  leftLabel: string
  title: React.ReactNode
  rightLabel: string
  background: string
  audioSrc?: string
}

interface FullScreenScrollFXProps {
  sections: Section[]
  header?: React.ReactNode
  footer?: React.ReactNode
  showProgress?: boolean
  durations?: {
    change?: number
    snap?: number
  }
  className?: string
}

export const FullScreenScrollFX = forwardRef<FullScreenFXAPI, FullScreenScrollFXProps>(
  ({ sections, header, footer, showProgress = false, durations = { change: 0.8, snap: 600 }, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentSection, setCurrentSection] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const scrollTimeoutRef = useRef<NodeJS.Timeout>()
    const audioRefs = useRef<(HTMLAudioElement | null)[]>([])

    useEffect(() => {
      audioRefs.current = sections.map((section) => {
        if (section.audioSrc) {
          const audio = new Audio(section.audioSrc)
          audio.preload = "auto"
          audio.volume = 0.3
          return audio
        }
        return null
      })

      return () => {
        audioRefs.current.forEach((audio) => {
          if (audio) {
            audio.pause()
            audio.currentTime = 0
          }
        })
      }
    }, [sections])

    const goToSection = useCallback(
      (index: number) => {
        if (index < 0 || index >= sections.length || isScrolling) return

        setIsScrolling(true)
        setCurrentSection(index)

        const audio = audioRefs.current[index]
        if (audio) {
          audio.currentTime = 0
          audio.play().catch(() => {
            // Ignore audio play errors (user interaction required)
          })
        }

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, durations.snap || 600)
      },
      [sections.length, isScrolling, durations.snap],
    )

    const nextSection = useCallback(() => {
      goToSection(Math.min(currentSection + 1, sections.length - 1))
    }, [currentSection, sections.length, goToSection])

    const prevSection = useCallback(() => {
      goToSection(Math.max(currentSection - 1, 0))
    }, [currentSection, goToSection])

    const getCurrentSection = useCallback(() => currentSection, [currentSection])

    useImperativeHandle(ref, () => ({
      goToSection,
      getCurrentSection,
      nextSection,
      prevSection,
    }))

    useEffect(() => {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        if (isScrolling) return

        if (e.deltaY > 0) {
          nextSection()
        } else if (e.deltaY < 0) {
          prevSection()
        }
      }

      const container = containerRef.current
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false })
        return () => container.removeEventListener("wheel", handleWheel)
      }
    }, [isScrolling, nextSection, prevSection])

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isScrolling) return

        switch (e.key) {
          case "ArrowDown":
          case " ":
            e.preventDefault()
            nextSection()
            break
          case "ArrowUp":
            e.preventDefault()
            prevSection()
            break
          case "Home":
            e.preventDefault()
            goToSection(0)
            break
          case "End":
            e.preventDefault()
            goToSection(sections.length - 1)
            break
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isScrolling, nextSection, prevSection, goToSection, sections.length])

    return (
      <div
        ref={containerRef}
        className={cn("relative h-screen w-full overflow-hidden", className)}
        style={{ touchAction: "none" }}
      >
        {/* Background Images */}
        {sections.map((section, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out",
              currentSection === index ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: `url(${section.background})`,
              willChange: "opacity",
            }}
          />
        ))}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Header */}
        {header && (
          <div className="absolute top-8 left-8 z-20 text-white">
            <div className="text-sm font-light tracking-wider uppercase opacity-80">{header}</div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="flex w-full max-w-6xl items-center justify-between px-8">
            {/* Left Label */}
            <div className="text-sm font-light tracking-widest text-white/60 uppercase rotate-90 origin-center">
              {sections[currentSection]?.leftLabel}
            </div>

            {/* Center Title */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                {sections[currentSection]?.title}
              </h1>
            </div>

            {/* Right Label */}
            <div className="text-sm font-light tracking-widest text-white/60 uppercase -rotate-90 origin-center">
              {sections[currentSection]?.rightLabel}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        {showProgress && (
          <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col space-y-2">
            {sections.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300 hover:scale-125",
                  currentSection === index ? "bg-white" : "bg-white/40 hover:bg-white/60",
                )}
                aria-label={`Go to section ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Hints */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-white/60">
          <div className="text-xs uppercase tracking-wider">Scroll or use arrow keys to navigate</div>
          <div className="mt-2 animate-bounce">
            <svg className="mx-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="absolute bottom-8 right-8 z-20 text-white">
            <div className="text-sm font-light opacity-80">{footer}</div>
          </div>
        )}
      </div>
    )
  },
)

FullScreenScrollFX.displayName = "FullScreenScrollFX"
