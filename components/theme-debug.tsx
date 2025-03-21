"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border p-4 rounded-md shadow-md z-50">
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={() => setTheme("light")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          Light
        </button>
        <button onClick={() => setTheme("dark")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          Dark
        </button>
        <button onClick={() => setTheme("system")} className="px-2 py-1 bg-secondary rounded-md text-sm">
          System
        </button>
      </div>
    </div>
  )
}

