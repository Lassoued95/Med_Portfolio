"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface TechBackgroundProps {
  showPortfolio: boolean
}

export function TechBackground({ showPortfolio }: TechBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Show hint after 2 seconds
    const timer = setTimeout(() => {
      setHintVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
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
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Animation variables
    let animationFrameId: number
    const particles: Particle[] = []
    const icons: Icon[] = []
    const mousePosition = { x: 0, y: 0, active: false }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
      mousePosition.active = true

      // Reset active flag after 2 seconds of no movement
      setTimeout(() => {
        mousePosition.active = false
      }, 2000)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create particles and icons
    const createParticles = () => {
      const isDark = resolvedTheme === "dark"
      const particleColor = isDark ? "rgba(100, 150, 255, 0.5)" : "rgba(30, 80, 180, 0.3)"

      // Create background particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: particleColor,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }

      // Create tech icons
      const iconTypes = ["mongodb", "express", "react", "node", "javascript", "nextjs"]
      const iconColors = {
        mongodb: isDark ? "rgba(67, 153, 52, 0.7)" : "rgba(67, 153, 52, 0.5)",
        express: isDark ? "rgba(150, 150, 150, 0.7)" : "rgba(100, 100, 100, 0.5)",
        react: isDark ? "rgba(97, 218, 251, 0.7)" : "rgba(97, 218, 251, 0.5)",
        node: isDark ? "rgba(104, 160, 99, 0.7)" : "rgba(104, 160, 99, 0.5)",
        javascript: isDark ? "rgba(247, 223, 30, 0.7)" : "rgba(247, 223, 30, 0.5)",
        nextjs: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.5)",
      }

      // Create computer icon in the center
      icons.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 60,
        type: "computer",
        color: isDark ? "rgba(150, 180, 255, 0.8)" : "rgba(30, 80, 180, 0.6)",
        rotation: 0,
        rotationSpeed: 0,
      })

      // Create tech icons around the computer
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2
        const distance = 150
        const x = canvas.width / 2 + Math.cos(angle) * distance
        const y = canvas.height / 2 + Math.sin(angle) * distance

        icons.push({
          x,
          y,
          size: 30,
          type: iconTypes[i] as IconType,
          color: iconColors[iconTypes[i] as keyof typeof iconColors],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        })
      }
    }

    createParticles()

    // Draw computer icon
    const drawComputer = (x: number, y: number, size: number, color: string) => {
      // Monitor
      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      // Monitor body
      ctx.beginPath()
      ctx.roundRect(x - size, y - size * 0.8, size * 2, size * 1.5, 5)
      ctx.fill()
      ctx.stroke()

      // Screen
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(20, 70, 120, 0.5)" : "rgba(100, 150, 255, 0.3)"
      ctx.beginPath()
      ctx.roundRect(x - size * 0.9, y - size * 0.7, size * 1.8, size * 1.2, 2)
      ctx.fill()
      ctx.stroke()

      // Stand
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.roundRect(x - size * 0.2, y + size * 0.7, size * 0.4, size * 0.2, 5)
      ctx.fill()
      ctx.stroke()

      // Base
      ctx.beginPath()
      ctx.ellipse(x, y + size * 0.9, size * 0.5, size * 0.1, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Text on screen
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
      ctx.font = `${size * 0.2}px sans-serif`
      ctx.textAlign = "center"
      ctx.fillText("MERN", x, y - size * 0.3)
      ctx.fillText("Portfolio", x, y - size * 0.1)

      // Hint text (only if hint is visible)
      if (hintVisible) {
        ctx.font = `${size * 0.12}px sans-serif`
        ctx.fillStyle = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
        ctx.fillText("Click to view", x, y + size * 0.2)
        ctx.fillText("portfolio", x, y + size * 0.35)
      }
    }

    // Draw MongoDB icon
    const drawMongoDB = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color

      // Draw leaf shape
      ctx.beginPath()
      ctx.moveTo(0, -size * 0.8)
      ctx.bezierCurveTo(size * 0.5, -size * 0.8, size * 0.8, -size * 0.4, size * 0.8, size * 0.4)
      ctx.bezierCurveTo(size * 0.8, size * 0.8, 0, size * 0.8, 0, size * 0.8)
      ctx.bezierCurveTo(-size * 0.8, size * 0.8, -size * 0.8, size * 0.4, -size * 0.8, size * 0.4)
      ctx.bezierCurveTo(-size * 0.8, -size * 0.4, -size * 0.5, -size * 0.8, 0, -size * 0.8)
      ctx.fill()

      ctx.restore()
    }

    // Draw Express icon
    const drawExpress = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.strokeStyle = color
      ctx.lineWidth = size * 0.1

      // Draw stylized 'E'
      ctx.beginPath()
      ctx.moveTo(-size * 0.6, -size * 0.4)
      ctx.lineTo(size * 0.6, -size * 0.4)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(-size * 0.6, 0)
      ctx.lineTo(size * 0.3, 0)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(-size * 0.6, size * 0.4)
      ctx.lineTo(size * 0.6, size * 0.4)
      ctx.stroke()

      ctx.restore()
    }

    // Draw React icon
    const drawReact = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.strokeStyle = color
      ctx.lineWidth = size * 0.1

      // Draw atom
      const orbitRadius = size * 0.8

      // Draw nucleus
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2)
      ctx.fillStyle = color
      ctx.fill()

      // Draw orbits
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.ellipse(0, 0, orbitRadius, orbitRadius * 0.4, (i * Math.PI) / 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()
    }

    // Draw Node.js icon
    const drawNode = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color

      // Draw hexagon
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 2
        const px = Math.cos(angle) * size * 0.8
        const py = Math.sin(angle) * size * 0.8

        if (i === 0) {
          ctx.moveTo(px, py)
        } else {
          ctx.lineTo(px, py)
        }
      }
      ctx.closePath()
      ctx.fill()

      // Draw "N" letter
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"
      ctx.font = `bold ${size * 0.8}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("N", 0, 0)

      ctx.restore()
    }

    // Draw JavaScript icon
    const drawJavaScript = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color

      // Draw square
      ctx.beginPath()
      ctx.rect(-size * 0.7, -size * 0.7, size * 1.4, size * 1.4)
      ctx.fill()

      // Draw "JS" letters
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.7)"
      ctx.font = `bold ${size * 0.7}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("JS", 0, 0)

      ctx.restore()
    }

    // Draw Next.js icon
    const drawNextjs = (x: number, y: number, size: number, color: string, rotation: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      ctx.fillStyle = color

      // Draw circle
      ctx.beginPath()
      ctx.arc(0, 0, size * 0.8, 0, Math.PI * 2)
      ctx.fill()

      // Draw "N" letter
      ctx.fillStyle = resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)"
      ctx.font = `bold ${size}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("N", 0, 0)

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Draw connections between particles and icons
      for (let i = 0; i < particles.length; i++) {
        for (let j = 0; j < icons.length; j++) {
          const dx = particles[i].x - icons[j].x
          const dy = particles[i].y - icons[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(icons[j].x, icons[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = 0.2 * (1 - distance / 100)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // Update and draw icons
      for (let i = 0; i < icons.length; i++) {
        const icon = icons[i]

        // Update rotation
        icon.rotation += icon.rotationSpeed

        // Draw icon based on type
        switch (icon.type) {
          case "computer":
            drawComputer(icon.x, icon.y, icon.size, icon.color)
            break
          case "mongodb":
            drawMongoDB(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
          case "express":
            drawExpress(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
          case "react":
            drawReact(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
          case "node":
            drawNode(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
          case "javascript":
            drawJavaScript(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
          case "nextjs":
            drawNextjs(icon.x, icon.y, icon.size, icon.color, icon.rotation)
            break
        }
      }

      // Mouse interaction with computer icon
      if (mousePosition.active) {
        const computerIcon = icons[0] // The computer is the first icon
        const dx = mousePosition.x - computerIcon.x
        const dy = mousePosition.y - computerIcon.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < computerIcon.size * 1.5) {
          canvas.style.cursor = "pointer"
        } else {
          canvas.style.cursor = "default"
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Handle click
    const handleClick = (e: MouseEvent) => {
      const computerIcon = icons[0] // The computer is the first icon
      const dx = e.clientX - computerIcon.x
      const dy = e.clientY - computerIcon.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < computerIcon.size * 1.5) {
        // Dispatch a custom event that the parent component can listen for
        const event = new CustomEvent("backgroundPCClick")
        window.dispatchEvent(event)
      }
    }

    canvas.addEventListener("click", handleClick)

    // Start animation
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme, mounted, hintVisible])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 w-full h-screen -z-10 cursor-pointer", showPortfolio && "opacity-30")}
      style={{
        transition: "opacity 1s ease-in-out",
      }}
      aria-hidden="true"
    />
  )
}

// Types
type IconType = "computer" | "mongodb" | "express" | "react" | "node" | "javascript" | "nextjs"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

interface Icon {
  x: number
  y: number
  size: number
  type: IconType
  color: string
  rotation: number
  rotationSpeed: number
}

