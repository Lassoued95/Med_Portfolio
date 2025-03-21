"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Database,
  Server,
  Code2,
  FileJson,
  Layers,
  Palette,
  Globe,
  Cpu,
  Workflow,
  Camera,
  Image,
  Aperture,
  Mountain,
  Users,
} from "lucide-react"

interface SkillIconProps {
  name: string
  icon: React.ReactNode
  delay?: number
}

export function SkillIcons() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const developmentSkills = [
    { name: "MongoDB", icon: <Database className="h-8 w-8" /> },
    { name: "Express", icon: <Server className="h-8 w-8" /> },
    { name: "React", icon: <Code2 className="h-8 w-8" /> },
    { name: "Node.js", icon: <FileJson className="h-8 w-8" /> },
    { name: "Next.js", icon: <Layers className="h-8 w-8" /> },
    { name: "Tailwind CSS", icon: <Palette className="h-8 w-8" /> },
    { name: "TypeScript", icon: <Globe className="h-8 w-8" /> },
    { name: "JavaScript", icon: <Cpu className="h-8 w-8" /> },
    { name: "Git", icon: <Workflow className="h-8 w-8" /> },
  ]

  const photographySkills = [
    { name: "Composition", icon: <Camera className="h-8 w-8" /> },
    { name: "Lighting", icon: <Image className="h-8 w-8" /> },
    { name: "Post-Processing", icon: <Aperture className="h-8 w-8" /> },
    { name: "Landscape", icon: <Mountain className="h-8 w-8" /> },
    { name: "Portrait", icon: <Users className="h-8 w-8" /> },
  ]

  return (
    <div ref={ref} className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Development Skills</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {developmentSkills.map((skill, index) => (
            <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} delay={index * 0.1} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Photography Skills</h3>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {photographySkills.map((skill, index) => (
            <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} delay={index * 0.1 + 0.5} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillIcon({ name, icon, delay = 0 }: SkillIconProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.3 }}
    >
      <div className="text-primary mb-2">{icon}</div>
      <span className="text-sm font-medium text-center">{name}</span>
    </motion.div>
  )
}

