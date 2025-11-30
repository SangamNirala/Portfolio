import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Zap } from "lucide-react";
import { SectionHeading, ScrollAnimation } from "@/components/animations/scroll-animations";

export function EducationSection() {
  return (
    <section id="education" className="pt-16 spacing-premium bg-background section-pattern-default relative" data-testid="section-education">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <SectionHeading className="flex flex-col items-center justify-center gap-3 mb-12">
          <GraduationCap className="h-8 w-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
        </SectionHeading>

        <ScrollAnimation variant="scaleIn">
          <Card className="card-depth-2 p-8 text-center education-card card-colored-border border-l-4 border-l-cyan-500 cursor-pointer" data-testid="card-education">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center trophy-icon-animate"
              >
                <GraduationCap className="h-10 w-10 text-cyan-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-university">
                Veermata Jijabai Technological Institute
              </h3>
              <p className="text-lg text-muted-foreground mb-2">Mumbai</p>
              <p className="text-primary font-medium mb-2">Bachelor of Technology in Electronics and Telecommunication</p>
              <p className="text-muted-foreground mb-6">2022 - 2026</p>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="cgpa-badge"
              >
                <Zap className="h-4 w-4" />
                CGPA: 7.0/10
              </motion.span>
            </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
}
