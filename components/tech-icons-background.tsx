"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

interface TechIcon {
  x: number
  y: number
  size: number
  type: "react" | "mongodb" | "node" | "next" | "javascript" | "tailwind" | "camera"
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
  vx: number
  vy: number
  connections: number[]
}

export function TechIconsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0, active: false })
  const iconsRef = useRef<TechIcon[]>([])
  const rafRef = useRef<number>(0)
  const scrollY = useRef(0)

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
        active: true,
      }

      // Reset active flag after 2 seconds of no movement
      setTimeout(() => {
        mousePosition.current.active = false
      }, 2000)
    }

    const handleScroll = () => {
      scrollY.current = window.scrollY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas 3x the viewport height
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create tech icons
    const createIcons = () => {
      const icons: TechIcon[] = []
      const numIcons = Math.min(Math.floor(window.innerWidth / 20), 60)

      // Colors based on theme
      const getColors = () => {
        return resolvedTheme === "dark"
          ? {
              react: "rgba(97, 218, 251, 0.7)",
              mongodb: "rgba(67, 153, 52, 0.7)",
              node: "rgba(104, 160, 99, 0.7)",
              next: "rgba(255, 255, 255, 0.7)",
              javascript: "rgba(247, 223, 30, 0.7)",
              tailwind: "rgba(56, 189, 248, 0.7)",
              camera: "rgba(220, 64, 140, 0.7)",
              connection: "rgba(150, 150, 220, 0.3)",
            }
          : {
              react: "rgba(97, 218, 251, 0.5)",
              mongodb: "rgba(67, 153, 52, 0.5)",
              node: "rgba(104, 160, 99, 0.5)",
              next: "rgba(0, 0, 0, 0.5)",
              javascript: "rgba(247, 223, 30, 0.5)",
              tailwind: "rgba(56, 189, 248, 0.5)",
              camera: "rgba(180, 30, 100, 0.5)",
              connection: "rgba(100, 100, 180, 0.2)",
            }
      }

      const colors = getColors()
      const iconTypes: ("react" | "mongodb" | "node" | "next" | "javascript" | "tailwind" | "camera")[] = [
        "react",
        "mongodb",
        "node",
        "next",
        "javascript",
        "tailwind",
        "camera",
      ]

      // Create tech icons
      for (let i = 0; i < numIcons; i++) {
        const type = iconTypes[Math.floor(Math.random() * iconTypes.length)]

        icons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 15,
          type,
          color: colors[type],
          opacity: Math.random() * 0.5 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      // Create connections between icons
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i]

        // Each icon connects to 1-3 other icons
        const numConnections = Math.floor(Math.random() * 3) + 1

        for (let j = 0; j < numConnections; j++) {
          // Find a random icon to connect to
          const targetIndex = Math.floor(Math.random() * icons.length)

          // Don't connect to self
          if (targetIndex !== i && !icon.connections.includes(targetIndex)) {
            icon.connections.push(targetIndex)
          }
        }
      }

      return icons
    }

    iconsRef.current = createIcons()

    // Draw React icon
    const drawReactIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.strokeStyle = icon.color
      ctx.lineWidth = 2
      ctx.globalAlpha = icon.opacity

      // Draw atom
      const orbitRadius = icon.size * 0.8

      // Draw nucleus
      ctx.beginPath()
      ctx.arc(0, 0, icon.size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = icon.color
      ctx.fill()

      // Draw orbits
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.ellipse(0, 0, orbitRadius, orbitRadius * 0.4, (i * Math.PI) / 3, 0, Math.PI * 2)
        ctx.stroke()

        // Draw electron
        const electronAngle = (Date.now() * 0.001 + (i * Math.PI) / 1.5) % (Math.PI * 2)
        const electronX = Math.cos(electronAngle) * orbitRadius
        const electronY = Math.sin(electronAngle) * orbitRadius * 0.4

        // Rotate electron position
        const rotatedX = electronX * Math.cos((i * Math.PI) / 3) - electronY * Math.sin((i * Math.PI) / 3)
        const rotatedY = electronX * Math.sin((i * Math.PI) / 3) + electronY * Math.cos((i * Math.PI) / 3)

        ctx.beginPath()
        ctx.arc(rotatedX, rotatedY, icon.size * 0.1, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Draw MongoDB icon
    const drawMongoDBIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.fillStyle = icon.color
      ctx.globalAlpha = icon.opacity

      // Draw leaf shape
      ctx.beginPath()
      ctx.moveTo(0, -icon.size * 0.8)
      ctx.bezierCurveTo(
        icon.size * 0.5,
        -icon.size * 0.8,
        icon.size * 0.8,
        -icon.size * 0.4,
        icon.size * 0.8,
        icon.size * 0.4,
      )
      ctx.bezierCurveTo(icon.size * 0.8, icon.size * 0.8, 0, icon.size * 0.8, 0, icon.size * 0.8)
      ctx.bezierCurveTo(
        -icon.size * 0.8,
        icon.size * 0.8,
        -icon.size * 0.8,
        icon.size * 0.4,
        -icon.size * 0.8,
        icon.size * 0.4,
      )
      ctx.bezierCurveTo(-icon.size * 0.8, -icon.size * 0.4, -icon.size * 0.5, -icon.size * 0.8, 0, -icon.size * 0.8)
      ctx.fill()

      // Add highlight
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)"
      ctx.beginPath()
      ctx.ellipse(-icon.size * 0.3, -icon.size * 0.3, icon.size * 0.2, icon.size * 0.4, Math.PI / 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Draw Node.js icon
    const drawNodeIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.fillStyle = icon.color
      ctx.globalAlpha = icon.opacity

      // Draw hexagon
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2
        const x = Math.cos(angle) * icon.size * 0.8
        const y = Math.sin(angle) * icon.size * 0.8

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.fill()

      // Draw "N" letter
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"
      ctx.font = `bold ${icon.size * 0.8}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("N", 0, 0)

      ctx.restore()
    }

    // Draw Next.js icon
    const drawNextIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.fillStyle = icon.color
      ctx.globalAlpha = icon.opacity

      // Draw circle
      ctx.beginPath()
      ctx.arc(0, 0, icon.size * 0.8, 0, Math.PI * 2)
      ctx.fill()

      // Draw "N" letter
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.7)"
      ctx.font = `bold ${icon.size}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("N", 0, 0)

      ctx.restore()
    }

    // Draw JavaScript icon
    const drawJavaScriptIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.fillStyle = icon.color
      ctx.globalAlpha = icon.opacity

      // Draw square
      ctx.beginPath()
      ctx.rect(-icon.size * 0.7, -icon.size * 0.7, icon.size * 1.4, icon.size * 1.4)
      ctx.fill()

      // Draw "JS" letters
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.7)"
      ctx.font = `bold ${icon.size * 0.7}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("JS", 0, 0)

      ctx.restore()
    }

    // Draw Tailwind icon
    const drawTailwindIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.fillStyle = icon.color
      ctx.globalAlpha = icon.opacity

      // Draw stylized wave pattern
      const waveHeight = icon.size * 0.2
      const waveWidth = icon.size * 0.3

      for (let i = 0; i < 3; i++) {
        const yOffset = (i - 1) * waveHeight * 1.5

        ctx.beginPath()
        ctx.moveTo(-icon.size, yOffset)

        // First wave
        ctx.bezierCurveTo(
          -icon.size + waveWidth,
          yOffset - waveHeight,
          -icon.size + waveWidth * 2,
          yOffset + waveHeight,
          -icon.size + waveWidth * 3,
          yOffset,
        )

        // Second wave
        ctx.bezierCurveTo(
          -icon.size + waveWidth * 4,
          yOffset - waveHeight,
          -icon.size + waveWidth * 5,
          yOffset + waveHeight,
          -icon.size + waveWidth * 6,
          yOffset,
        )

        ctx.lineWidth = icon.size * 0.15
        ctx.stroke()
      }

      ctx.restore()
    }

    // Draw camera icon
    const drawCameraIcon = (ctx: CanvasRenderingContext2D, icon: TechIcon) => {
      ctx.save()
      ctx.translate(icon.x, icon.y)
      ctx.rotate(icon.rotation)

      ctx.strokeStyle = icon.color
      ctx.fillStyle = icon.color
      ctx.lineWidth = 2
      ctx.globalAlpha = icon.opacity

      // Camera body
      ctx.beginPath()
      ctx.roundRect(-icon.size * 0.6, -icon.size * 0.4, icon.size * 1.2, icon.size * 0.8, 5)
      ctx.stroke()

      // Lens
      ctx.beginPath()
      ctx.arc(0, 0, icon.size * 0.3, 0, Math.PI * 2)
      ctx.stroke()

      // Inner lens
      ctx.beginPath()
      ctx.arc(0, 0, icon.size * 0.15, 0, Math.PI * 2)
      ctx.fill()

      // Viewfinder
      ctx.beginPath()
      ctx.rect(icon.size * 0.3, -icon.size * 0.4, icon.size * 0.15, icon.size * 0.15)
      ctx.fill()

      ctx.restore()
    }

    // Draw connection between icons
    const drawConnection = (ctx: CanvasRenderingContext2D, icon1: TechIcon, icon2: TechIcon) => {
      const dx = icon2.x - icon1.x
      const dy = icon2.y - icon1.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Only draw connections if icons are within a certain distance
      if (distance < 300) {
        ctx.save()

        const opacity = Math.max(0, 1 - distance / 300) * 0.5
        ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(150, 150, 220, 0.3)" : "rgba(100, 100, 180, 0.2)"
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(icon1.x, icon1.y)

        // Create a curved line
        const midX = (icon1.x + icon2.x) / 2
        const midY = (icon1.y + icon2.y) / 2
        const offset = Math.sin(Date.now() * 0.001) * 20 * (1 - distance / 300)

        ctx.quadraticCurveTo(midX + offset, midY + offset, icon2.x, icon2.y)

        ctx.stroke()

        ctx.restore()
      }
    }

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update canvas position based on scroll
      canvas.style.top = `-${scrollY.current}px`

      // Update and draw icons
      for (let i = 0; i < iconsRef.current.length; i++) {
        const icon = iconsRef.current[i]

        // Update position
        icon.x += icon.vx
        icon.y += icon.vy

        // Update rotation
        icon.rotation += icon.rotationSpeed

        // Boundary check with bounce
        if (icon.x < 0 || icon.x > canvas.width) {
          icon.vx = -icon.vx
          icon.x = Math.max(0, Math.min(canvas.width, icon.x))
        }

        if (icon.y < 0 || icon.y > canvas.height) {
          icon.vy = -icon.vy
          icon.y = Math.max(0, Math.min(canvas.height, icon.y))
        }

        // Mouse interaction
        if (mousePosition.current.active) {
          const dx = icon.x - mousePosition.current.x
          const dy = icon.y - mousePosition.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const angle = Math.atan2(dy, dx)
            const force = (150 - distance) / 1000

            // Push icons away from mouse
            icon.vx += Math.cos(angle) * force
            icon.vy += Math.sin(angle) * force

            // Limit velocity
            const speed = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy)
            if (speed > 2) {
              icon.vx = (icon.vx / speed) * 2
              icon.vy = (icon.vy / speed) * 2
            }
          }
        }

        // Apply friction
        icon.vx *= 0.99
        icon.vy *= 0.99

        // Draw icon
        switch (icon.type) {
          case "react":
            drawReactIcon(ctx, icon)
            break
          case "mongodb":
            drawMongoDBIcon(ctx, icon)
            break
          case "node":
            drawNodeIcon(ctx, icon)
            break
          case "next":
            drawNextIcon(ctx, icon)
            break
          case "javascript":
            drawJavaScriptIcon(ctx, icon)
            break
          case "tailwind":
            drawTailwindIcon(ctx, icon)
            break
          case "camera":
            drawCameraIcon(ctx, icon)
            break
        }
      }

      // Draw connections
      for (let i = 0; i < iconsRef.current.length; i++) {
        const icon = iconsRef.current[i]

        for (let j = 0; j < icon.connections.length; j++) {
          const targetIndex = icon.connections[j]

          if (targetIndex < iconsRef.current.length) {
            drawConnection(ctx, icon, iconsRef.current[targetIndex])
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [resolvedTheme, mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-[300vh] -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

