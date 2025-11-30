import { lazy, Suspense, useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { StatsSection } from "@/components/sections/stats-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { HonorsSection } from "@/components/sections/honors-section";
import { CTASection } from "@/components/sections/cta-section";
import { ProjectsSectionSkeleton, SkillsSectionSkeleton } from "@/components/skeleton-loader";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { GlossaryDialog } from "@/components/glossary/glossary-dialog";
import { AIChatDialog } from "@/components/chat/ai-chat";
import { getWebsiteContent } from "@/lib/website-content";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ScrollProgressBar } from "@/components/utils/scroll-progress-bar";
import { BackToTopButton } from "@/components/utils/back-to-top-button";
import { FloatingContactWidget } from "@/components/utils/floating-contact-widget";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navigation/navbar";

const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

const SECTIONS = [
  { id: "home", title: "Home" },
  { id: "about", title: "About" },
  { id: "stats", title: "Stats" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "education", title: "Education" },
  { id: "honors", title: "Honors" },
];

export default function Home() {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const activeSection = useScrollSpy(["home", "about", "stats", "experience", "projects", "skills", "education", "honors"]);

  return (
    <div className="min-h-screen bg-background cursor-glow relative">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar onGlossaryClick={() => setGlossaryOpen(true)} onAIClick={() => setAiChatOpen(true)} />
      <GlossaryDialog open={glossaryOpen} onOpenChange={setGlossaryOpen} />
      <AIChatDialog isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} websiteContent={getWebsiteContent()} />
      <FloatingNav sections={SECTIONS} activeSection={activeSection} />
      
      <main id="main-content" tabIndex={-1} role="main" className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <Suspense fallback={<ProjectsSectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SkillsSectionSkeleton />}>
          <SkillsSection />
        </Suspense>
        <EducationSection />
        <HonorsSection />
        <CTASection />
      </main>
      
      <Footer />
      <BackToTopButton />
      <FloatingContactWidget />
    </div>
  );
}
