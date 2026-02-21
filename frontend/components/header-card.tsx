"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HeaderCardProps {
  scrollRef: React.RefObject<HTMLDivElement | null>
  placeholder: string
}

export function HeaderCard({ scrollRef, placeholder }: HeaderCardProps) {
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleScroll = () => {
      setFloating(scrollEl.scrollTop > 0)
    }

    scrollEl.addEventListener("scroll", handleScroll, { passive: true })
    return () => scrollEl.removeEventListener("scroll", handleScroll)
  }, [scrollRef])

  return (
    <>
      {/* Floating Card */}
      {floating && (
        <div className="w-full px-4 md:px-0 pt-4 invisible" aria-hidden>
          <div className="mx-auto w-full max-w-2xl">
            <div className="rounded-2xl border border-border bg-card py-4 text-sm text-center text-muted-foreground">
              {placeholder}
            </div>
          </div>
        </div>
      )}

      {/* The actual card */}
      <div
        className={cn(
          "w-full px-4 md:px-0 transition-all duration-300",
          floating
            ? "fixed top-0 left-0 right-0 z-20 pt-4"
            : "relative pt-4"
        )}
      >
        <div className="mx-auto w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border border-border bg-card py-4 text-sm text-center text-muted-foreground transition-shadow duration-300",
              floating && "shadow-lg"
            )}
          >
            {placeholder}
          </div>
        </div>
      </div>
    </>
  )
}
