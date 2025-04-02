"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  link: string
}

export function CompetitionCard({ title, description, tags, image, link }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Click to Open in Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative h-48 w-full overflow-hidden cursor-pointer">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            />
            <div
              className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </DialogTrigger>

        {/* Modal Content with DialogTitle for Accessibility */}
        <DialogContent className="max-w-3xl p-4">
          <DialogTitle className="sr-only">{title}</DialogTitle> {/* Visually Hidden Title for Screen Readers */}
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={900}
            height={600}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>

      <CardHeader>
        <CardTitle className="transition-colors duration-300">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  )
}
