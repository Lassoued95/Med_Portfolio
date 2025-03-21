"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  skills: string[]
  link?: string
}

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  // Replace with your actual certifications
  const certifications: Certification[] = [
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
      <h2 className="text-3xl font-bold mb-6">Certifications</h2>
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

