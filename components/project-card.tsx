"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
  /**
   * Optional custom class for the image container (e.g. "h-80" or "aspect-[3/4]").
   */
  imageContainerClassName?: string
}

export function ProjectCard({ title, description, tags, image, link, imageContainerClassName }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const isVideo = !!image && /\.(mp4|mov|webm)$/i.test(image)
  const [showModal, setShowModal] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-full overflow-hidden ${imageContainerClassName ?? "h-48"}`}>
        {isVideo ? (
          <button
            onClick={(e) => {
              // open in new tab by default; open modal when user holds Ctrl/Cmd/Shift
              if (e.ctrlKey || e.metaKey || e.shiftKey) {
                setShowModal(true)
              } else {
                window.open(image, "_blank", "noopener,noreferrer")
              }
            }}
            aria-label={`Open ${title} video`}
            className="relative block w-full h-full"
          >
            <video
              src={image}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-contain transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
            />
            <span className="absolute left-2 top-2 inline-flex items-center gap-2 rounded-full bg-black/60 px-2 py-1 text-xs">
              ▶ Open
            </span>
          </button>
        ) : (
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
        )}
        <div
          className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {showModal && isVideo ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowModal(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="Close video"
              onClick={() => setShowModal(false)}
              className="absolute -top-4 -right-4 z-60 rounded-full bg-white p-1 shadow-lg"
            >
              ✕
            </button>
            <video
              src={image}
              controls
              autoPlay
              className="w-[360px] h-[720px] max-w-[90vw] max-h-[95vh] rounded-lg bg-black object-contain"
            />
          </div>
        </div>
      ) : null}
      <CardHeader>
        <CardTitle className="transition-colors duration-300">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-0"}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={link}
          className={`text-sm text-primary flex items-center gap-1 transition-all duration-300 ${isHovered ? "gap-2" : "gap-1"}`}
        >
          View Project{" "}
          <ExternalLink
            className={`h-3 w-3 transition-transform duration-300 ${isHovered ? "translate-x-1" : "translate-x-0"}`}
          />
        </Link>
      </CardFooter>
    </Card>
  )
}

