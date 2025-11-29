import { useEffect, useState } from "react";

export interface Section {
  id: string;
  title: string;
  icon?: any;
}

export function useScrollSpy(sectionIds: string[], options = { offset: 100 }) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.top <= options.offset) {
          currentSection = id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, options]);

  return activeSection;
}
