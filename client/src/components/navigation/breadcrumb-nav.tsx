import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbNavProps {
  activeSection: string;
  sections: { id: string; title: string }[];
}

export function BreadcrumbNav({ activeSection, sections }: BreadcrumbNavProps) {
  const activeSectionData = sections.find((s) => s.id === activeSection);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="hidden md:flex items-center h-12 px-4 bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-30"
      data-testid="breadcrumb-nav"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 text-sm"
            >
              <Home className="h-4 w-4" />
              Portfolio
            </BreadcrumbLink>
          </BreadcrumbItem>
          {activeSectionData && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-sm text-muted-foreground">
                  {activeSectionData.title}
                </span>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </motion.div>
  );
}
