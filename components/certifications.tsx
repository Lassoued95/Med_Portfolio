"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  link?: string
  image?: string
}

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Certifications data with the new GDG Tech Days certificate
  const certifications: Certification[] = [
    {
      title: "GDG Tech Days Web Track",
      issuer: "Google Developer Groups Sousse",
      date: "February 2025",
      description:
        "Completed the Web Track Workshops at GDG Tech Days 2025, focusing on modern web development technologies and practices.",
      skills: ["Web Development", "JavaScript", "Collaboration", "Hands-on Learning"],
      link: "https://www.linkedin.com/posts/mohamed-lassoued-a5b5b8243_gdgtechdays-activity-7304889503456870401-sqbR?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADxsYucBLVSHo2fZe3H1kplzkPNGUtkMTTg",
      image: "/images/Certifications/GDG_Certif.png",
    },
    {
      title: "MERN Stack Developer",
      issuer: "Udemy",
      date: "2023",
      description: "Comprehensive certification covering MongoDB, Express, React, and Node.js development.",
      skills: ["MongoDB", "Express", "React", "Node.js"],
      link: "#",
    },
    {
      title: "Advanced JavaScript",
      issuer: "freeCodeCamp",
      date: "2022",
      description: "In-depth JavaScript programming concepts, patterns, and best practices.",
      skills: ["JavaScript", "ES6+", "Async/Await", "Functional Programming"],
      link: "#",
    },
    {
      title: "Professional Photography",
      issuer: "Photography Institute",
      date: "2021",
      description: "Professional certification in digital photography techniques and composition.",
      skills: ["Composition", "Lighting", "Post-Processing", "Portrait Photography"],
      link: "#",
    },
  ]

  return (
    <div ref={ref} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <CardDescription>
                      {cert.issuer} • {cert.date}
                    </CardDescription>
                  </div>
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                {cert.image && (
                  <div className="mb-4 relative overflow-hidden rounded-md">
                    <Link href={cert.image} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={`${cert.title} Certificate`}
                        width={400}
                        height={300}
                        className="w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                )}
                <p className="text-muted-foreground mb-4">{cert.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {cert.link && (
                  <Link
                    href={cert.link}
                    className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

