import { motion } from "framer-motion";

export function SkeletonLine({ width = "w-full", delay = 0 }: { width?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, delay }}
      className={`skeleton-line ${width} h-4 rounded-md`}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-lg overflow-hidden p-4 space-y-4"
    >
      <div className="w-full h-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
      <SkeletonLine width="w-3/4" />
      <SkeletonLine width="w-1/2" delay={0.1} />
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-16 h-6 bg-muted rounded animate-pulse" />
        ))}
      </div>
    </motion.div>
  );
}

export function SkillCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-lg p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary/20 rounded-lg animate-pulse" />
        <SkeletonLine width="w-24" />
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-3 py-1 bg-muted rounded-full h-6 w-20 animate-pulse" />
        ))}
      </div>
    </motion.div>
  );
}
