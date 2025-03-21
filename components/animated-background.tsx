"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  pulse: boolean
  pulseSpeed: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
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
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) / 8

    // Colors based on theme
    const getColors = () => {
      return resolvedTheme === "dark"
        ? ["rgba(62, 84, 172, 0.3)", "rgba(31, 64, 104, 0.3)", "rgba(13, 71, 161, 0.3)"]
        : ["rgba(144, 202, 249, 0.3)", "rgba(66, 165, 245, 0.3)", "rgba(30, 136, 229, 0.3)"]
    }

    const createParticles = () => {
      particlesArray.length = 0
      const colors = getColors()

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = Math.random() * 0.5 - 0.25
        const speedY = Math.random() * 0.5 - 0.25
        const color = colors[Math.floor(Math.random() * colors.length)]
        const opacity = Math.random() * 0.5 + 0.3
        const pulse = Math.random() > 0.7
        const pulseSpeed = Math.random() * 0.02 + 0.01

        particlesArray.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
          opacity,
          pulse,
          pulseSpeed,
        })
      }
    }

    createParticles()

    // Animation loop
    let animationFrameId: number
    let hue = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]

        // Update opacity for pulsing effect
        if (particle.pulse) {
          particle.opacity += Math.sin(hue * particle.pulseSpeed) * 0.01
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Mouse interaction
        const dx = particle.x - mousePosition.current.x
        const dy = particle.y - mousePosition.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const angle = Math.atan2(dy, dx)
          const force = (100 - distance) / 1500
          particle.x += Math.cos(angle) * force
          particle.y += Math.sin(angle) * force
        }

        // Connect particles
        connectParticles(particle, i)
      }

      hue += 0.5
      animationFrameId = requestAnimationFrame(animate)
    }

    // Connect particles with lines if they are close enough
    const connectParticles = (particle: Particle, index: number) => {
      for (let j = index + 1; j < particlesArray.length; j++) {
        const dx = particle.x - particlesArray[j].x
        const dy = particle.y - particlesArray[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const opacity = 1 - distance / 120
          ctx.beginPath()
          ctx.strokeStyle = particle.color.replace(")", `, ${opacity * 0.5})`)
          ctx.lineWidth = 0.3
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
          ctx.stroke()
        }
      }
    }

    // Start animation
    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedTheme, mounted])

  if (!mounted) return null

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" aria-hidden="true" />
  )
}

