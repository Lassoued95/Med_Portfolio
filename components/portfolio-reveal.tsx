"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TechBackground } from "./tech-background"

export function PortfolioReveal({ children }: { children: React.ReactNode }) {
  const [showPortfolio, setShowPortfolio] = useState(false)

  // Listen for PC click event
  useEffect(() => {
    const handleBackgroundClick = () => {
      setShowPortfolio(true)
    }

    window.addEventListener("backgroundPCClick", handleBackgroundClick)

    return () => {
      window.removeEventListener("backgroundPCClick", handleBackgroundClick)
    }
  }, [])

  return (
    <>
      <TechBackground showPortfolio={showPortfolio} />

      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {!showPortfolio && (
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => setShowPortfolio(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-md hover:bg-primary/90 transition-colors"
          >
            Skip Intro
          </button>
        </div>
      )}
    </>
  )
}

