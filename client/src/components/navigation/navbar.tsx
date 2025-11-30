import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Navbar({ onGlossaryClick, onAIClick }: { onGlossaryClick: () => void; onAIClick: () => void }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "stats", "experience", "projects", "skills", "education", "honors"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = ["About", "Experience", "Projects", "Skills", "Education"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border cursor-pointer" data-testid="navbar" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer"
            data-testid="nav-logo"
            aria-label="Portfolio home"
          >
            SN
          </button>

          <div className="hidden md:flex items-center gap-6" role="menubar">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeSection === item.toLowerCase() ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${item.toLowerCase()}`}
                role="menuitem"
                aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={onAIClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10 cursor-pointer hidden sm:block"
              aria-label="AI assistant"
              data-testid="button-ai"
            >
              AI
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              data-testid="button-theme-toggle"
              aria-pressed={theme === "dark"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative p-2.5 rounded-lg text-muted-foreground hover:text-foreground bg-primary/5 hover:bg-primary/15 transition-all duration-300 cursor-pointer border border-primary/20 hover:border-primary/40"
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              data-testid="button-hamburger"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>

            <Button
              size="sm"
              onClick={() => window.open("/api/resume", "_blank")}
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-testid="nav-button-resume"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-primary/30 relative z-50 cursor-pointer bg-gradient-to-b from-card to-background/95"
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-4 py-3 space-y-1 backdrop-blur-lg" role="menubar">
          {navItems.map((item) => (
            <motion.button
              key={item}
              type="button"
              onClick={() => {
                scrollToSection(item.toLowerCase());
                setMobileMenuOpen(false);
              }}
              whileHover={{ x: 4 }}
              className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer text-base sm:text-lg ${
                activeSection === item.toLowerCase()
                  ? "text-primary bg-primary/15 border border-primary/30 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border hover:border-primary/20"
              }`}
              data-testid={`nav-link-mobile-${item.toLowerCase()}`}
              role="menuitem"
              aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
              aria-label={`Navigate to ${item}`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden pointer-events-auto"
            style={{ top: "auto", bottom: 0, zIndex: 30, willChange: "opacity" }}
            data-testid="mobile-menu-backdrop"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
