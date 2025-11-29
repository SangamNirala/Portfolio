import { motion } from "framer-motion";

export function SkeletonCard() {
  return (
    <div className="skeleton-card rounded-lg overflow-hidden">
      <div className="skeleton-line h-48 w-full mb-4" />
      <div className="skeleton-line h-4 w-3/4 mb-3" />
      <div className="skeleton-line h-4 w-1/2" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton-line ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function ProjectsSectionSkeleton() {
  return (
    <section className="pt-16 py-24 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="skeleton-line h-12 w-64 mb-4" />
          <div className="skeleton-line h-6 w-96" />
        </div>
        <SkeletonGrid count={3} />
      </div>
    </section>
  );
}

export function SkillsSectionSkeleton() {
  return (
    <section className="pt-16 py-24 md:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="skeleton-line h-12 w-48 mb-4" />
          <div className="skeleton-line h-6 w-80" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton-line h-8 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="skeleton-line h-4 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LazyLoadPlaceholder({ height = "h-96" }: { height?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${height} bg-gradient-to-br from-background to-card rounded-lg overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground text-sm font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
}
