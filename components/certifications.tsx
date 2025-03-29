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
      "title": "Flutter Workshop Participant",
      "issuer": "GDG RandoTek",
      "date": "Jan-Mar 2024",
      "description": "Certificate of participation in the Flutter workshop organized by GDG RandoTek in Sousse. This workshop covered Flutter app development, best practices, and modern tools for building smooth and high-performance mobile applications.",
      "skills": ["Flutter", "Dart", "Mobile Development", "UI/UX"],
      "link": "#",
      "image": "/images/Certifications/GDG_Flutter.png"
    },
    {  
      "title": "MICMINDS Hackathon Participant",  
      "issuer": "Microsoft ISIMA Club",  
      "date": "Dec 2-3, 2023",  
      "description": "Certificate of participation in the MICMINDS Hackathon, recognizing exceptional dedication, creativity, and problem-solving skills. Contributed actively to innovative solutions during the 24-hour event.",  
      "skills": ["Hackathon Participation", "Problem-Solving", "Team Collaboration", "Creative Innovation"],  
      "link": "https://www.linkedin.com/feed/update/urn:li:activity:7137444503942017024/",  
      "image": "/images/Certifications/MICMINDS_Hackathon_2023.jpg"  
    }  
    
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

