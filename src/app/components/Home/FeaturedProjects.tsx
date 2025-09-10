"use client"

import React, { useMemo } from "react"
import { FullScreenScrollFX, type FullScreenFXAPI } from "@/app/components/ui/full-screen-scroll-fx"
import Link from "next/link"

const sections = [
  {
    leftLabel: "Digital Transformation",
    title: (
      <Link
        href="/projects/ancient-makkah-vr"
        className="text-white hover:text-gray-300 transition-colors duration-300 no-underline"
      >
     Digital Transformation
      </Link>
    ),
    rightLabel: "Digital Transformation",
    background: "/images/img2.png",
    audioSrc: "/sfx/click-01.mp3",
  },
  {
    leftLabel: " Events & Exhibitions",
    title: (
      <Link
        href="/projects/events-exhibitions"
        className="text-white hover:text-gray-300 transition-colors duration-300 no-underline"
      >
        Events & Exhibitions
      </Link>
    ),
    rightLabel: " Events & Exhibitions",
    background: "/images/f2.png",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
  {
    leftLabel: " 3D Animation",
    title: (
      <Link
        href="/projects/3DAnimation"
        className="text-white hover:text-gray-300 transition-colors duration-300 no-underline"
      >
         3D Animation
      </Link>
    ),
    rightLabel: " 3D Animation",
    background: "/images/f1.png",
    audioSrc: "/sfx/whoosh-02.mp3",
  },
]

export default function FeaturedProjects() {
  const apiRef = React.useRef<FullScreenFXAPI>(null)

  const smoothDurations = useMemo(
    () => ({
      change: 0.8,
      snap: 600,
    }),
    [],
  )

  return (
    <FullScreenScrollFX
      ref={apiRef}
      sections={sections}
      header={
        <>
          <div>Featured</div>
          <div>Projects</div>
        </>
      }
      footer={<div></div>}
      showProgress
      durations={smoothDurations}
    />
  )
}
