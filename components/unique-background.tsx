"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

interface Element {
  x: number
  y: number
  size: number
  type: "code" | "photo" | "node" | "connection"
  color: string
  opacity: number
  rotation: number
  rotationSpeed: number
  vx: number
  vy: number
  connections: number[]
}

export function UniqueBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mousePosition = useRef({ x: 0, y: 0, active: false })
  const elementsRef = useRef<Element[]>([])
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

    // Create elements
    const createElements = () => {
      const elements: Element[] = []
      const numElements = Math.min(Math.floor(window.innerWidth / 15), 100)

      // Colors based on theme
      const getColors = () => {
        return resolvedTheme === "dark"
          ? {
              code: "rgba(64, 116, 220, 0.7)",
              photo: "rgba(220, 64, 140, 0.7)",
              node: "rgba(64, 220, 180, 0.7)",
              connection: "rgba(150, 150, 220, 0.3)",
            }
          : {
              code: "rgba(30, 80, 180, 0.5)",
              photo: "rgba(180, 30, 100, 0.5)",
              node: "rgba(30, 180, 140, 0.5)",
              connection: "rgba(100, 100, 180, 0.2)",
            }
      }

      const colors = getColors()

      // Create code elements (brackets, braces, etc.)
      for (let i = 0; i < numElements * 0.4; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10,
          type: "code",
          color: colors.code,
          opacity: Math.random() * 0.5 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      // Create photo elements (camera, lens, etc.)
      for (let i = 0; i < numElements * 0.4; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 15 + 10,
          type: "photo",
          color: colors.photo,
          opacity: Math.random() * 0.5 + 0.3,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
        })
      }

      // Create node elements (connection points)
      for (let i = 0; i < numElements * 0.2; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 3,
          type: "node",
          color: colors.node,
          opacity: Math.random() * 0.5 + 0.5,
          rotation: 0,
          rotationSpeed: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          connections: [],
        })
      }

      // Create connections between elements
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]

        // Each element connects to 1-3 other elements
        const numConnections = Math.floor(Math.random() * 3) + 1

        for (let j = 0; j < numConnections; j++) {
          // Find a random element to connect to
          const targetIndex = Math.floor(Math.random() * elements.length)

          // Don't connect to self
          if (targetIndex !== i && !element.connections.includes(targetIndex)) {
            element.connections.push(targetIndex)
          }
        }
      }

      return elements
    }

    elementsRef.current = createElements()

    // Draw code element (brackets, braces, etc.)
    const drawCodeElement = (ctx: CanvasRenderingContext2D, element: Element) => {
      ctx.save()
      ctx.translate(element.x, element.y)
      ctx.rotate(element.rotation)

      ctx.strokeStyle = element.color
      ctx.lineWidth = 2
      ctx.globalAlpha = element.opacity

      // Randomly choose between different code symbols
      const codeType = Math.floor(element.x * element.y) % 4

      switch (codeType) {
        case 0: // Curly braces
          ctx.beginPath()
          ctx.moveTo(-element.size / 2, -element.size / 2)
          ctx.lineTo(-element.size / 4, -element.size / 2)
          ctx.lineTo(-element.size / 4, element.size / 2)
          ctx.lineTo(-element.size / 2, element.size / 2)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(element.size / 2, -element.size / 2)
          ctx.lineTo(element.size / 4, -element.size / 2)
          ctx.lineTo(element.size / 4, element.size / 2)
          ctx.lineTo(element.size / 2, element.size / 2)
          ctx.stroke()
          break

        case 1: // Angle brackets
          ctx.beginPath()
          ctx.moveTo(-element.size / 2, 0)
          ctx.lineTo(0, -element.size / 2)
          ctx.lineTo(element.size / 2, 0)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(-element.size / 2, 0)
          ctx.lineTo(0, element.size / 2)
          ctx.lineTo(element.size / 2, 0)
          ctx.stroke()
          break

        case 2: // Parentheses
          ctx.beginPath()
          ctx.arc(-element.size / 4, 0, element.size / 2, -Math.PI / 2, Math.PI / 2, false)
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(element.size / 4, 0, element.size / 2, Math.PI / 2, -Math.PI / 2, false)
          ctx.stroke()
          break

        case 3: // Equals and dots
          ctx.beginPath()
          ctx.moveTo(-element.size / 2, -element.size / 4)
          ctx.lineTo(element.size / 2, -element.size / 4)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(-element.size / 2, element.size / 4)
          ctx.lineTo(element.size / 2, element.size / 4)
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(0, 0, element.size / 10, 0, Math.PI * 2)
          ctx.fill()
          break
      }

      ctx.restore()
    }

    // Draw photo element (camera, lens, etc.)
    const drawPhotoElement = (ctx: CanvasRenderingContext2D, element: Element) => {
      ctx.save()
      ctx.translate(element.x, element.y)
      ctx.rotate(element.rotation)

      ctx.strokeStyle = element.color
      ctx.fillStyle = element.color
      ctx.lineWidth = 2
      ctx.globalAlpha = element.opacity

      // Randomly choose between different photo symbols
      const photoType = Math.floor(element.y * element.x) % 4

      switch (photoType) {
        case 0: // Camera
          // Camera body
          ctx.beginPath()
          ctx.roundRect(-element.size / 2, -element.size / 3, element.size, element.size / 1.5, 5)
          ctx.stroke()

          // Lens
          ctx.beginPath()
          ctx.arc(0, 0, element.size / 4, 0, Math.PI * 2)
          ctx.stroke()

          // Viewfinder
          ctx.beginPath()
          ctx.rect(element.size / 4, -element.size / 3, element.size / 6, element.size / 6)
          ctx.stroke()
          break

        case 1: // Aperture
          const numBlades = 6
          const angleStep = (Math.PI * 2) / numBlades

          ctx.beginPath()
          for (let i = 0; i < numBlades; i++) {
            const angle = i * angleStep
            const x1 = (Math.cos(angle) * element.size) / 3
            const y1 = (Math.sin(angle) * element.size) / 3
            const x2 = (Math.cos(angle + angleStep / 2) * element.size) / 2
            const y2 = (Math.sin(angle + angleStep / 2) * element.size) / 2

            if (i === 0) {
              ctx.moveTo(x1, y1)
            } else {
              ctx.lineTo(x1, y1)
            }
            ctx.lineTo(x2, y2)
          }
          ctx.closePath()
          ctx.stroke()

          // Center circle
          ctx.beginPath()
          ctx.arc(0, 0, element.size / 6, 0, Math.PI * 2)
          ctx.fill()
          break

        case 2: // Focus points
          // Outer rectangle
          ctx.beginPath()
          ctx.rect(-element.size / 2, -element.size / 2, element.size, element.size)
          ctx.stroke()

          // Focus points
          for (let i = 0; i < 5; i++) {
            const x = (Math.random() - 0.5) * element.size * 0.8
            const y = (Math.random() - 0.5) * element.size * 0.8

            ctx.beginPath()
            ctx.moveTo(x - element.size / 10, y)
            ctx.lineTo(x + element.size / 10, y)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x, y - element.size / 10)
            ctx.lineTo(x, y + element.size / 10)
            ctx.stroke()
          }
          break

        case 3: // Film frame
          // Outer rectangle
          ctx.beginPath()
          ctx.rect(-element.size / 2, -element.size / 3, element.size, element.size / 1.5)
          ctx.stroke()

          // Sprocket holes
          for (let i = -2; i <= 2; i++) {
            ctx.beginPath()
            ctx.rect((i * element.size) / 5, -element.size / 2.5, element.size / 15, element.size / 10)
            ctx.stroke()

            ctx.beginPath()
            ctx.rect(
              (i * element.size) / 5,
              element.size / 2.5 - element.size / 10,
              element.size / 15,
              element.size / 10,
            )
            ctx.stroke()
          }
          break
      }

      ctx.restore()
    }

    // Draw node element (connection point)
    const drawNodeElement = (ctx: CanvasRenderingContext2D, element: Element) => {
      ctx.save()
      ctx.translate(element.x, element.y)

      ctx.fillStyle = element.color
      ctx.globalAlpha = element.opacity

      ctx.beginPath()
      ctx.arc(0, 0, element.size, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    // Draw connection between elements
    const drawConnection = (ctx: CanvasRenderingContext2D, element1: Element, element2: Element) => {
      const dx = element2.x - element1.x
      const dy = element2.y - element1.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Only draw connections if elements are within a certain distance
      if (distance < 300) {
        ctx.save()

        const opacity = Math.max(0, 1 - distance / 300) * 0.5
        ctx.strokeStyle = element1.type === "node" ? element1.color : element2.color
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(element1.x, element1.y)

        // Create a curved line
        const midX = (element1.x + element2.x) / 2
        const midY = (element1.y + element2.y) / 2
        const offset = Math.sin(Date.now() * 0.001) * 20 * (1 - distance / 300)

        ctx.quadraticCurveTo(midX + offset, midY + offset, element2.x, element2.y)

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

      // Update and draw elements
      for (let i = 0; i < elementsRef.current.length; i++) {
        const element = elementsRef.current[i]

        // Update position
        element.x += element.vx
        element.y += element.vy

        // Update rotation
        element.rotation += element.rotationSpeed

        // Boundary check with bounce
        if (element.x < 0 || element.x > canvas.width) {
          element.vx = -element.vx
          element.x = Math.max(0, Math.min(canvas.width, element.x))
        }

        if (element.y < 0 || element.y > canvas.height) {
          element.vy = -element.vy
          element.y = Math.max(0, Math.min(canvas.height, element.y))
        }

        // Mouse interaction
        if (mousePosition.current.active) {
          const dx = element.x - mousePosition.current.x
          const dy = element.y - mousePosition.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const angle = Math.atan2(dy, dx)
            const force = (150 - distance) / 1000

            // Push elements away from mouse
            element.vx += Math.cos(angle) * force
            element.vy += Math.sin(angle) * force

            // Limit velocity
            const speed = Math.sqrt(element.vx * element.vx + element.vy * element.vy)
            if (speed > 2) {
              element.vx = (element.vx / speed) * 2
              element.vy = (element.vy / speed) * 2
            }
          }
        }

        // Apply friction
        element.vx *= 0.99
        element.vy *= 0.99

        // Draw element
        switch (element.type) {
          case "code":
            drawCodeElement(ctx, element)
            break
          case "photo":
            drawPhotoElement(ctx, element)
            break
          case "node":
            drawNodeElement(ctx, element)
            break
        }
      }

      // Draw connections
      for (let i = 0; i < elementsRef.current.length; i++) {
        const element = elementsRef.current[i]

        for (let j = 0; j < element.connections.length; j++) {
          const targetIndex = element.connections[j]

          if (targetIndex < elementsRef.current.length) {
            drawConnection(ctx, element, elementsRef.current[targetIndex])
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

