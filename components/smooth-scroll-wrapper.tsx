"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const smoother = gsap.to(scrollRef.current, {
      ease: "power3.out",
      duration: 1.2,
    })

    return () => {
      smoother.kill()
    }
  }, [])

  return (
    <div ref={scrollRef} className="smooth-scroll-wrapper">
      {children}
    </div>
  )
}
