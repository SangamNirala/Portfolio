import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Brain, Zap, Database, Cloud, Cpu, Eye, GitBranch, Container, Network } from "lucide-react";

const floatingIcons = [
  { Icon: Code2, label: "Python", delay: 0 },
  { Icon: Brain, label: "AI/ML", delay: 0.2 },
  { Icon: Zap, label: "Performance", delay: 0.4 },
  { Icon: Database, label: "Data", delay: 0.6 },
  { Icon: Cloud, label: "Cloud", delay: 0.8 },
  { Icon: Cpu, label: "GPU", delay: 1 },
  { Icon: Eye, label: "Vision", delay: 1.2 },
  { Icon: GitBranch, label: "Git", delay: 1.4 },
  { Icon: Container, label: "Docker", delay: 1.6 },
  { Icon: Network, label: "Network", delay: 1.8 },
];

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / 50,
        y: (e.clientY - rect.top - rect.height / 2) / 50,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      data-testid="floating-elements"
    >
      {floatingIcons.map((item, index) => {
        const angle = (index / floatingIcons.length) * Math.PI * 2;
        const distance = 150 + (index % 3) * 60;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={index}
            className="absolute p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
            style={{
              left: "50%",
              top: "50%",
              width: "40px",
              height: "40px",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              x: x + mousePosition.x * 20,
              y: y + mousePosition.y * 20,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + index, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <item.Icon className="h-5 w-5 text-primary/60 hover:text-primary" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
