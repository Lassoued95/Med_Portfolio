import Image from "next/image";
import {Camera, Github, Linkedin, Mail} from "lucide-react";
import {useFormatter, useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Navbar} from "@/components/navbar";
import {ProjectCard} from "@/components/project-card";
import {InternshipCard} from "@/components/ui/internship-card";
import {CompetitionCard} from "@/components/competition-card";
import {ContactForm} from "@/components/contact-form";
import {ThemeDebug} from "@/components/theme-debug";
import {PortfolioReveal} from "@/components/portfolio-reveal";
import {SkillIcons} from "@/components/skill-icons";
import {Certifications} from "@/components/certifications";
import {Link} from "@/i18n/navigation";
import {competitionData, internshipData, projectData} from "@/lib/portfolio-data";

const socialLinks = [
  {label: "github", href: "https://github.com/Lassoued95", Icon: Github},
  {label: "linkedin", href: "https://www.linkedin.com/in/mohamed-lassoued-a5b5b8243/", Icon: Linkedin},
  {label: "email", href: "mailto:lassouedmohamed2004@gmail.com", Icon: Mail}
] as const;

const date = (value: string) => new Date(`${value}T12:00:00Z`);

export default function Home() {
  const hero = useTranslations("hero");
  const about = useTranslations("about");
  const skills = useTranslations("skills");
  const projects = useTranslations("projects");
  const internships = useTranslations("internships");
  const education = useTranslations("education");
  const contact = useTranslations("contact");
  const footer = useTranslations("footer");
  const common = useTranslations("common");
  const formatter = useFormatter();
  const formatRange = (start: string, end: string) =>
    formatter.dateTimeRange(date(start), date(end), {month: "short", year: "numeric"});
  const formatToPresent = (start: string) =>
    `${formatter.dateTime(date(start), {month: "short", year: "numeric"})} – ${common("present")}`;

  return (
    <div className="flex justify-center">
      <PortfolioReveal>
        <div className="min-h-screen bg-background">
          <ThemeDebug />
          <Navbar />
          <main className="container py-10">
            <section id="home" className="flex flex-col items-center py-20 text-center md:py-32">
              <div className="relative mb-8">
                <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl md:h-56 md:w-56">
                  <Image
                    src="/images/mee.jpeg"
                    alt={hero("portraitAlt")}
                    width={224}
                    height={224}
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-full border border-border bg-background p-2 shadow-lg">
                  <Camera className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">Mohamed Lassoued</h1>
              <p className="mb-2 text-2xl font-medium text-primary">{hero("role")}</p>
              <p className="mb-8 max-w-2xl text-xl text-muted-foreground">{hero("description")}</p>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/cv/My_Resume.pdf" target="_blank" rel="noopener noreferrer">{hero("downloadCv")}</a>
                </Button>
                <Button variant="outline" asChild><Link href="#contact">{hero("contactMe")}</Link></Button>
              </div>
              <div className="mt-8 flex gap-4">
                {socialLinks.map(({label, href, Icon}) => (
                  <Button key={label} variant="ghost" size="icon" asChild>
                    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={common(label)}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </section>

            <section id="about" className="py-16">
              <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 flex justify-center text-3xl font-bold">{about("title")}</h2>
                  <p className="mb-4 text-muted-foreground">{about("paragraph1")}</p>
                  <p className="mb-4 text-muted-foreground">{about("paragraph2")}</p>
                  <p className="text-muted-foreground">{about("paragraph3")}</p>

                  <div className="mt-6">
                    <div className="flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("web")}</h3>
                      {["React", "Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS"].map((item, index) =>
                        <Badge key={item} variant={index === 0 ? "default" : "secondary"} className="px-3 py-1">{item}</Badge>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("mobile")}</h3>
                      <Badge className="px-3 py-1">React Native</Badge>
                      <Badge variant="secondary" className="px-3 py-1">Flutter</Badge>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("backend")}</h3>
                      {["FastAPI", "Flask", "Spring Boot", "PostgreSQL", "Prisma", "MySQL", "Firebase"].map((item, index) =>
                        <Badge key={item} variant={index === 0 ? "default" : "secondary"} className="px-3 py-1">{item}</Badge>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("bigDataAi")}</h3>
                      {["Hadoop", "MapReduce", "Spark", "Apache Iceberg", "RAG", "LLM APIs", "scikit-learn"].map((item, index) =>
                        <Badge key={item} variant={index === 0 ? "default" : "secondary"} className="px-3 py-1">{item}</Badge>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("languages")}</h3>
                      {["Python", "JavaScript", "TypeScript", "Java", "PHP", "C"].map((item, index) =>
                        <Badge key={item} variant={index === 0 ? "default" : "secondary"} className="px-3 py-1">{item}</Badge>
                      )}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <h3 className="w-full text-center text-lg font-semibold">{skills("tools")}</h3>
                      {["Git", "GitHub", "Docker", "n8n", "Postman"].map((item, index) =>
                        <Badge key={item} variant={index === 0 ? "default" : "secondary"} className="px-3 py-1">{item}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <SkillIcons />
              </div>
            </section>

            <section id="resume" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{education("resumeTitle")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{education("resumeDescription")}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-950">
                  <h3 className="mb-4 text-xl font-bold">{education("educationTitle")}</h3>
                  <ul>
                    <li className="mb-3">
                      <strong>{education("masters")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatToPresent("2026-09-01")}</span>
                    </li>
                    <li className="mb-3">
                      <strong>{education("bachelor")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatRange("2023-09-01", "2026-06-01")}</span>
                    </li>
                    <li>
                      <strong>{education("highSchool")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatRange("2020-09-01", "2023-06-01")}</span>
                      <p className="text-sm">{education("baccalaureate")}</p>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-950">
                  <h3 className="mb-4 text-xl font-bold">{education("experienceTitle")}</h3>
                  <ul>
                    <li className="mb-3">
                      <strong>{education("socialMediaManager")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatToPresent("2026-07-01")}</span><br />
                      <p className="text-sm">{education("socialMediaDescription")}</p>
                    </li>
                    <li className="mb-3">
                      <strong>{education("wyzeInternship")}</strong><br />
                      <p className="text-sm">{education("wyzeDescription")}</p>
                    </li>
                    <li className="mb-3">
                      <strong>{education("activitiesInternship")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatRange("2025-06-01", "2025-07-31")}</span><br />
                      <p className="text-sm">{education("activitiesDescription")}</p>
                    </li>
                    <li className="mb-3">
                      <strong>{education("freelanceDeveloper")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatToPresent("2025-01-01")}</span><br />
                      <p className="text-sm">{education("freelanceDescription")}</p>
                    </li>
                    <li>
                      <strong>{education("organizer")}</strong><br />
                      <span className="text-sm text-muted-foreground">{formatToPresent("2024-09-01")}</span><br />
                      <p className="text-sm">{education("organizerDescription")}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="projects" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{projects("title")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{projects("description")}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectData.map((project) => {
                  const title = projects(`items.${project.id}.title`);
                  return (
                    <ProjectCard
                      key={project.id}
                      title={title}
                      description={projects(`items.${project.id}.description`)}
                      tags={[...project.tags]}
                      image={project.image}
                      link={project.link}
                      viewLabel={projects("viewProject")}
                      openLabel={common("openVideo")}
                      openVideoLabel={projects("openVideo", {title})}
                      closeVideoLabel={common("closeVideo")}
                    />
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <a href="https://github.com/Lassoued95" target="_blank" rel="noopener noreferrer">{projects("viewMore")}</a>
                </Button>
              </div>
            </section>

            <section id="competitions" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{education("competitionsTitle")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{education("competitionsDescription")}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {competitionData.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    title={education(`competitions.${competition.id}.title`)}
                    description={education(`competitions.${competition.id}.description`)}
                    tags={[...competition.tags]}
                    image={competition.image}
                    link={competition.link}
                  />
                ))}
              </div>
            </section>

            <section id="certifications" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{education("certificationsTitle")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{education("certificationsDescription")}</p>
              </div>
              <Certifications />
            </section>

            <section id="internships" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{internships("title")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{internships("description")}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {internshipData.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    title={internships(`items.${internship.id}.title`)}
                    description={internships(`items.${internship.id}.description`)}
                    tags={[...internship.tags]}
                    image={internship.image}
                    linkLabel={internships("items.viewDetails")}
                    enlargeLabel={internships("items.enlarge")}
                    closeLabel={internships("items.close")}
                  />
                ))}
              </div>
            </section>

            <section id="contact" className="py-16">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">{contact("title")}</h2>
                <p className="mx-auto max-w-2xl text-muted-foreground">{contact("description")}</p>
              </div>
              <ContactForm />
            </section>
          </main>
          <footer className="border-t py-8">
            <div className="container flex flex-col items-center justify-between md:flex-row">
              <div className="mb-4 text-sm text-muted-foreground md:mb-0">
                © {formatter.number(new Date().getFullYear())} Mohamed Lassoued. {footer("rights")}
              </div>
              <div className="flex gap-4">
                {socialLinks.map(({label, href, Icon}) => (
                  <Button key={label} variant="ghost" size="icon" asChild>
                    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={common(label)}>
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </PortfolioReveal>
    </div>
  );
}
