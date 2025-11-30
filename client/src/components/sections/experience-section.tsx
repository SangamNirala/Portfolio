import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, CheckCircle, Lightbulb, Target } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";

const experiences = [
  {
    company: "Zenbourg",
    role: "AI Automation Intern",
    period: "July 2025 - August 2025",
    location: "Remote",
    logoInitials: "ZB",
    logoColor: "from-blue-500 to-indigo-600",
    achievements: [
      "Designed automated workflows using n8n and Make to integrate business tools and eliminate repetitive tasks",
      "Integrated workflows with websites by building frontend using JavaScript and React",
      "Created tools like email automation, WhatsApp automation, and calling agent, increasing sales by 40%",
    ],
    tech: ["n8n", "Make", "JavaScript", "React", "AI Automation"],
  },
  {
    company: "Sakura Biotech",
    role: "AI/ML Intern",
    period: "May 2025 – July 2025",
    location: "Mumbai, India",
    logoInitials: "SB",
    logoColor: "from-pink-500 to-rose-600",
    achievements: [
      "Developed and deployed a real-time algae monitoring system using LSTM model trained on 1,400+ synthetic sinusoidal pH readings, achieving 92.4% accuracy (MAE: 0.12) for 30-step forecasting",
      "Engineered a live pipeline streaming data every 10s, triggering predictions via Flask",
      "Developed a full stack application integrated with anomaly detection and multi-sensor expansion capability",
    ],
    tech: ["LSTM", "Flask", "Python", "ML Pipeline", "Real-time Systems"],
  },
];

export function ExperienceSection() {
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleDotHover = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setHoveredDotIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 60,
      left: rect.left + window.scrollX,
    });
  };

  return (
    <section id="experience" className="pt-16 spacing-premium bg-card section-pattern-default relative" data-testid="section-experience">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="relative">
          <motion.div 
            className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5"
            style={{ willChange: "background-position" }}
          />

          <AnimatePresence>
            {hoveredDotIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg p-3 shadow-xl z-50 pointer-events-none"
                style={{
                  top: `${tooltipPosition.top}px`,
                  left: `${tooltipPosition.left - 80}px`,
                  minWidth: "200px",
                }}
                data-testid={`tooltip-experience-${hoveredDotIndex}`}
              >
                <p className="font-bold text-primary text-sm">{experiences[hoveredDotIndex].company}</p>
                <p className="text-xs text-muted-foreground">{experiences[hoveredDotIndex].role}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {experiences[hoveredDotIndex].period}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {experiences[hoveredDotIndex].location}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {experiences.map((exp, index) => (
            <div key={index} id={`experience-${index}`}>
              <AnimatedSection className="relative mb-12 last:mb-0">
                <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="hidden md:block md:w-1/2" />

                <motion.button
                  onClick={() => scrollToExperience(index)}
                  onMouseEnter={(e) => handleDotHover(e as any, index)}
                  onMouseLeave={() => setHoveredDotIndex(null)}
                  className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary via-blue-400 to-primary border-4 border-background -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-2xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  data-testid={`timeline-dot-${index}`}
                  type="button"
                  aria-label={`Scroll to ${exp.company} experience`}
                  style={{ willChange: "transform" }}
                />

                <Card
                  className={`card-depth-2 ml-12 md:ml-0 md:w-1/2 p-6 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                  data-testid={`card-experience-${index}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`company-logo company-logo-glow w-16 h-16 rounded-full bg-gradient-to-br ${exp.logoColor} flex items-center justify-center shrink-0 shadow-lg transition-all duration-300`}
                    >
                      <span className="text-xl font-bold text-white">{exp.logoInitials}</span>
                    </motion.div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent" data-testid={`text-company-${index}`}>
                          {exp.company}
                        </h3>
                        <p className="text-lg text-primary font-bold tracking-tight mt-1">{exp.role}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 sm:justify-end">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-4">
                    {exp.achievements.map((achievement, i) => {
                      const icons = [CheckCircle, Lightbulb, Target];
                      const Icon = icons[i % icons.length];
                      return (
                        <motion.li 
                          key={i} 
                          className="text-sm text-muted-foreground flex gap-3 items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
