"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {useFormatter, useTranslations} from "next-intl"

interface Certification {
  translationKey: string
  date: string
  dateEnd?: string
  skills: string[]
  link?: string
  image?: string
}

export function Certifications() {
  const t = useTranslations("education")
  const common = useTranslations("common")
  const formatter = useFormatter()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const certifications: Certification[] = [
    {translationKey: "googleCloudAi", date: "2026-11-14", skills: ["Google Cloud", "Data Engineering", "AI Solutions", "Cloud Computing"], link: "#", image: "/images/Certifications/365datascience.png"},
    {translationKey: "rapidLlm", date: "2026-10-31", skills: ["Large Language Models", "LLM Applications", "Prompt Engineering", "Python"], link: "https://learn.nvidia.com/certificates?id=v0NlTpF3R6K_kjaPkl-laA", image: "/images/Certifications/rapid.png"},
    {translationKey: "deepLearning", date: "2025-12-01", skills: ["Deep Learning", "Neural Networks", "Python", "TensorFlow"], link: "https://www.linkedin.com/feed/update/urn:li:activity:7401366575112429569/", image: "/images/Certifications/nvidia.png"},
    {translationKey: "generativeAi", date: "2025-11-01", skills: ["Generative AI", "LangChain", "Hugging Face", "Model Deployment"], link: "https://www.linkedin.com/feed/update/urn:li:activity:7397348383063158785/", image: "/images/Certifications/udemy.png"},
    {translationKey: "webTrack", date: "2025-02-01", skills: ["Web Development", "JavaScript", "React", "Problem-Solving"], link: "https://www.linkedin.com/feed/update/urn:li:activity:7304889503456870401/", image: "/images/Certifications/gdg.png"},
    {translationKey: "flutter", date: "2024-01-01", dateEnd: "2024-03-01", skills: ["Flutter", "Dart", "Mobile Development", "UI/UX"], link: "#", image: "/images/Certifications/GDG_Flutter.png"},
    {translationKey: "micminds", date: "2023-12-02", dateEnd: "2023-12-03", skills: ["Hackathon Participation", "Problem-Solving", "Team Collaboration", "Creative Innovation"], link: "https://www.linkedin.com/feed/update/urn:li:activity:7137444503942017024/", image: "/images/Certifications/MICMINDS_Hackathon_2023.jpg"}
  ]
  return (
    <div ref={ref} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => {
          const title = t(`certifications.${cert.translationKey}.title`)
          const description = t(`certifications.${cert.translationKey}.description`)
          const date = cert.dateEnd
            ? formatter.dateTimeRange(new Date(`${cert.date}T12:00:00Z`), new Date(`${cert.dateEnd}T12:00:00Z`), {month: "short", year: "numeric"})
            : formatter.dateTime(new Date(`${cert.date}T12:00:00Z`), {month: "long", year: "numeric"})
          return (
          <motion.div
            key={cert.translationKey}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{t(`certifications.${cert.translationKey}.issuer`)} • {date}</CardDescription>
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
                        alt={common("certificateAlt", {title})}
                        width={400}
                        height={300}
                        className="w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                )}
                <p className="text-muted-foreground mb-4">{description}</p>
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
                    {t("viewCertificate")} <ExternalLink className="h-3 w-3" />
                  </Link>
                )}
              </CardContent>
            </Card>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
