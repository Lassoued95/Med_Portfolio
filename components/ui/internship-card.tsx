"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Maximize2, X } from "lucide-react"

interface InternshipCardProps {
  title: string
  description: string
  tags: string[]
  /** Vertical document image (attestation, certificate...) */
  image: string
  /** Optional link (project, company website...) */
  link?: string
  linkLabel: string
  enlargeLabel: string
  closeLabel: string
}

export function InternshipCard({
  title,
  description,
  tags,
  image,
  link,
  linkLabel,
  enlargeLabel,
  closeLabel,
}: InternshipCardProps) {
  const [open, setOpen] = useState(false)

  // Close the lightbox with Escape + lock page scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <Card className="group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg sm:flex-row">
        {/* Document preview (full image, never cropped) */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${enlargeLabel}: ${title}`}
          className="relative block aspect-[3/4] w-full shrink-0 cursor-zoom-in bg-muted sm:w-56"
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-contain p-2"
          />
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" />
            {enlargeLabel}
          </span>
        </button>

        {/* Text */}
        <div className="flex flex-1 flex-col">
          <CardHeader>
            <CardTitle className="text-xl leading-snug">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            {link && link !== "#" ? (
              <Link href={link} className="flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all">
                {linkLabel} <ExternalLink className="h-3 w-3" />
              </Link>
            ) : null}
          </CardContent>
        </div>
      </Card>

      {/* Lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-black shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
          <Image
            src={image}
            alt={title}
            width={1200}
            height={1600}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-[92vh] w-auto max-w-[95vw] rounded-md bg-white object-contain"
          />
        </div>
      ) : null}
    </>
  )
}