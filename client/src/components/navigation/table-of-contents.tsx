import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Section {
  id: string;
  title: string;
  icon: any;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
}

export function TableOfContents({ sections, activeSection }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="md:hidden fixed left-4 top-20 z-30"
        data-testid="toc-toggle"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full cursor-pointer"
          data-testid="button-toc-toggle"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || true) && (
          <motion.aside
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -250 }}
            transition={{ duration: 0.3 }}
            className="hidden md:block fixed left-0 top-12 w-56 h-[calc(100vh-3rem)] bg-background/80 backdrop-blur-md border-r border-border z-20 overflow-y-auto p-4 space-y-2"
            data-testid="table-of-contents"
          >
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Navigate
            </div>
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer group ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    data-testid={`toc-link-${section.id}`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{section.title}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="md:hidden fixed left-0 top-20 w-64 bg-background border-r border-border z-20 overflow-y-auto p-4 space-y-2 max-h-[calc(100vh-5rem)]"
            data-testid="mobile-toc"
          >
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid={`mobile-toc-link-${section.id}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{section.title}</span>
                  {isActive && <ChevronRight className="h-4 w-4 text-primary" />}
                </motion.button>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
