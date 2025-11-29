import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface FloatingNavProps {
  sections: Section[];
  activeSection: string;
}

export function FloatingNav({ sections, activeSection }: FloatingNavProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { scrollY: scrollYMotion } = useScroll();

  useEffect(() => {
    return scrollYMotion.onChange((latest) => {
      setScrollY(latest);
      setIsMinimized(latest > 300);
    });
  }, [scrollYMotion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeSectionTitle = sections.find((s) => s.id === activeSection)?.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden lg:flex fixed right-8 bottom-8 z-30 flex-col gap-3"
      data-testid="floating-nav"
    >
      {/* Minimized State */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-background/90 backdrop-blur-md border border-border rounded-full p-3 shadow-lg"
        >
          <div className="text-xs font-semibold text-muted-foreground text-center mb-2">
            {activeSectionTitle}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToTop}
              className="h-8 w-8 rounded-full cursor-pointer"
              data-testid="button-scroll-top"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-background/90 backdrop-blur-md border border-border rounded-xl p-4 shadow-lg w-48 space-y-2"
        >
          <div className="text-sm font-semibold text-foreground mb-3">
            Quick Navigation
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {sections.slice(0, 5).map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeSection === section.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                data-testid={`floating-nav-link-${section.id}`}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
