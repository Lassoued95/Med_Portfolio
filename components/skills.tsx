"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  const developmentSkills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "Express", level: 85 },
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "HTML/CSS", level: 95 },
  ]

  const photographySkills = [
    { name: "Composition", level: 85 },
    { name: "Lighting", level: 80 },
    { name: "Post-Processing", level: 75 },
    { name: "Portrait Photography", level: 85 },
    { name: "Landscape Photography", level: 90 },
  ]

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const newValues: Record<string, number> = {}

        developmentSkills.forEach((skill) => {
          newValues[skill.name] = skill.level
        })

        photographySkills.forEach((skill) => {
          newValues[skill.name] = skill.level
        })

        setAnimatedValues(newValues)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <Card ref={ref}>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Development Skills</h3>
            <div className="space-y-4">
              {developmentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{animatedValues[skill.name] || 0}%</span>
                  </div>
                  <Progress value={animatedValues[skill.name] || 0} className="h-2" />
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Photography Skills</h3>
            <div className="space-y-4">
              {photographySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{animatedValues[skill.name] || 0}%</span>
                  </div>
                  <Progress value={animatedValues[skill.name] || 0} className="h-2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

