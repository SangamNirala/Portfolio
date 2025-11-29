import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "ML Engineer at TechCorp",
    content: "Sangam's ML pipeline optimization reduced model training time by 40%. Exceptional problem-solver with deep MLOps expertise.",
    avatar: "PS",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    name: "Rajesh Patel",
    role: "Senior Data Scientist at DataFlow",
    content: "Outstanding expertise in Computer Vision and deep learning. Delivered production-ready face detection system ahead of schedule.",
    avatar: "RP",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Neha Gupta",
    role: "Product Manager at CloudML",
    content: "Impressive technical depth and communication skills. Successfully architected RAG-based chatbot with multi-language support.",
    avatar: "NG",
    gradient: "from-pink-500 to-red-500",
  },
  {
    name: "Arjun Singh",
    role: "DevOps Lead at Systems Plus",
    content: "Expert in Docker, Kubernetes, and CI/CD. Implemented seamless deployment pipelines that improved team productivity significantly.",
    avatar: "AS",
    gradient: "from-green-500 to-blue-500",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-card"
      data-testid="section-testimonials"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Social Proof
          </h2>
          <p className="text-muted-foreground text-lg">
            Recognition and recommendations from colleagues and collaborators
          </p>
        </motion.div>

        <div className="relative">
          {/* Testimonials Carousel */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 md:p-10 bg-gradient-to-br from-background to-card border border-primary/10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg text-foreground mb-6 italic leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      alt={testimonials[currentIndex].name}
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonials[currentIndex].avatar}`}
                    />
                    <AvatarFallback className={`bg-gradient-to-br ${testimonials[currentIndex].gradient} text-white font-bold`}>
                      {testimonials[currentIndex].avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Previous testimonial"
              data-testid="button-prev-testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-8"
                      : "bg-primary/30 w-2"
                  }`}
                  data-testid={`indicator-testimonial-${index}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Next testimonial"
              data-testid="button-next-testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Testimonial Count */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>
      </div>
    </section>
  );
}
