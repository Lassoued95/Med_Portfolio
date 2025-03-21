import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ProjectCard } from "@/components/project-card"
import { PhotoGallery } from "@/components/photo-gallery"
import { ContactForm } from "@/components/contact-form"
import { Github, Linkedin, Mail, Camera } from "lucide-react"
import { ThemeDebug } from "@/components/theme-debug"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { PortfolioReveal } from "@/components/portfolio-reveal"
import { SkillIcons } from "@/components/skill-icons"
import { Certifications } from "@/components/certifications"

export default function Home() {
  return (
    <div className="flex justify-center">
    <PortfolioReveal>
      <div className="min-h-screen bg-background">
        <ThemeDebug />
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="font-bold text-xl">Mohamed Lassoued</div>
            <nav className="hidden md:flex gap-6">
              <Link href="#home" className="text-sm font-medium hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="#projects" className="text-sm font-medium hover:underline underline-offset-4">
                Projects
              </Link>
              <Link href="#photography" className="text-sm font-medium hover:underline underline-offset-4">
                Photography
              </Link>
              <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
                About
              </Link>
              <Link href="#certifications" className="text-sm font-medium hover:underline underline-offset-4">
                Certifications
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button variant="outline" size="sm" asChild className="hidden md:flex">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="container py-10">
          {/* Hero Section */}
          <section id="home" className="py-20 md:py-32 flex flex-col items-center text-center">
            <div className="mb-8 relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Mohamed Lassoued"
                  width={224}
                  height={224}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-background rounded-full p-2 shadow-lg border border-border">
                <Camera className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Mohamed Lassoued</h1>
            <p className="text-2xl font-medium text-primary mb-2">MERN Stack Developer & Photographer</p>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Creating beautiful digital experiences through code and capturing moments through the lens.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
            <div className="flex gap-4 mt-8">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:contact@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Development Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A selection of my recent web development work using the MERN stack and other technologies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="E-Commerce Platform"
                description="A full-stack MERN application with user authentication, product management, and payment integration."
                tags={["React", "Node.js", "MongoDB", "Express"]}
                image="/placeholder.svg?height=200&width=400"
                link="#"
              />
              <ProjectCard
                title="Task Management App"
                description="A real-time collaborative task management tool with drag-and-drop functionality."
                tags={["React", "Redux", "Socket.io", "Express"]}
                image="/placeholder.svg?height=200&width=400"
                link="#"
              />
              <ProjectCard
                title="Social Media Dashboard"
                description="Analytics dashboard that aggregates data from multiple social media platforms."
                tags={["React", "Chart.js", "Node.js", "API Integration"]}
                image="/placeholder.svg?height=200&width=400"
                link="#"
              />
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View More on GitHub
                </Link>
              </Button>
            </div>
          </section>

          {/* Photography Section */}
          <section id="photography" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Photography Portfolio</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Capturing moments and emotions through the lens. Here's a selection of my photographic work.
              </p>
            </div>
            <PhotoGallery />
          </section>

          {/* About/Skills Section */}
          <section id="about" className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-muted-foreground mb-4">
                  I'm Mohamed Lassoued, a passionate MERN Stack developer and photographer based in Tunisia. I combine
                  technical expertise with creative vision to build beautiful digital experiences and capture compelling
                  visual stories.
                </p>
                <p className="text-muted-foreground mb-4">
                  With several years of experience in web development, I specialize in creating responsive,
                  user-friendly applications using MongoDB, Express, React, and Node.js. My photography work focuses on
                  capturing authentic moments and creative compositions.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding or behind the camera, you can find me exploring new technologies, contributing to
                  open-source projects, and continuously expanding my skills in both development and photography.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Badge className="px-3 py-1">
                    MongoDB
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Express.js
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    React
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Node.js
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Next.js
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Tailwind CSS
                  </Badge>
                  <Badge variant="secondary" className="px-3 py-1">
                    Photography
                  </Badge>
                </div>
              </div>
              <SkillIcons />
            </div>
          </section>

          {/* Certifications Section */}
          <section id="certifications" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">My Certifications</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional certifications and courses I've completed to enhance my skills.
              </p>
            </div>
            <Certifications />
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Interested in working together? Fill out the form below or reach out directly via email or social media.
              </p>
            </div>
            <ContactForm />
          </section>
        </main>
        <footer className="border-t py-8">
          <div className="container flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Mohamed Lassoued. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:contact@example.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </PortfolioReveal>
    </div>
  )
}

