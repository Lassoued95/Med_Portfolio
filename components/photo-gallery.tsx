"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Sample photo data - replace with your actual photos
const photos = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Landscape photo",
    category: "Landscape",
    image:"images/Photography/CSC_8389.jpg"
  },
  {
    id: 2,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Portrait photo",
    category: "Portrait",
    image:"images/Photography/CSC_8389.jpg"
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Street photo",
    category: "Street",
    image:"images/Photography/CSC_8389.jpg"
  },
  {
    id: 4,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Architecture photo",
    category: "Architecture",
    image:"images/Photography/CSC_8389.jpg"
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Nature photo",
    category: "Nature",
    image:"images/Photography/CSC_8389.jpg"
  },
  {
    id: 6,
    src: "/placeholder.svg?height=800&width=600",
    alt: "Travel photo",
    category: "Travel",
    image:"images/Photography/CSC_8389.jpg"
  },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)
  const [filter, setFilter] = useState<string>("All")
  const [activeIndex, setActiveIndex] = useState(-1)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)

  const categories = ["All", ...Array.from(new Set(photos.map((photo) => photo.category)))]
  const filteredPhotos = filter === "All" ? photos : photos.filter((photo) => photo.category === filter)

  // Handle filter change with animation
  const handleFilterChange = (category: string) => {
    if (category === filter) return

    setAnimating(true)
    setTimeout(() => {
      setFilter(category)
      setTimeout(() => {
        setAnimating(false)
      }, 100)
    }, 300)
  }

  // Mouse move effect for gallery items
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!galleryRef.current) return

      const items = galleryRef.current.querySelectorAll(".gallery-item")

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          setActiveIndex(index)

          // Calculate the tilt based on mouse position
          const xPercent = x / rect.width
          const yPercent = y / rect.height
          const tiltX = (yPercent - 0.5) * 10
          const tiltY = (xPercent - 0.5) * -10

          // Apply the tilt effect
          const element = item as HTMLElement
          element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
        } else if (activeIndex === index) {
          setActiveIndex(-1)
          const element = item as HTMLElement
          element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        }
      })
    }

    const handleMouseLeave = () => {
      if (!galleryRef.current) return

      const items = galleryRef.current.querySelectorAll(".gallery-item")
      items.forEach((item) => {
        const element = item as HTMLElement
        element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
      })

      setActiveIndex(-1)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [activeIndex])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              filter === category
                ? "bg-primary text-primary-foreground scale-110"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        ref={galleryRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300",
          animating ? "opacity-0" : "opacity-100",
        )}
      >
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(
              "relative aspect-square overflow-hidden rounded-md cursor-pointer group gallery-item",
              "transition-all duration-500 ease-out",
            )}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              transitionDelay: `${index * 50}ms`,
              transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
            }}
          >
            <Image
              src={photo.image || "/placeholder.svg"}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="w-full">
                <span className="text-white font-medium block">{photo.alt}</span>
                <span className="text-white/70 text-sm">{photo.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="relative h-[80vh]">
              <Image
                src={selectedPhoto.image || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
                <p className="text-white">{selectedPhoto.alt}</p>
                <p className="text-white/70 text-sm">{selectedPhoto.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

