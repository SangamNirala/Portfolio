import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function ContactFormSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="mb-6 flex justify-center"
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.5, 0.8, 1] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-green-500/20 rounded-full blur-lg"
          />
          <CheckCircle2 className="h-20 w-20 text-green-500 relative z-10" />
        </div>
      </motion.div>
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-foreground mb-2"
      >
        Message Sent!
      </motion.h4>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground mb-6"
      >
        I'll get back to you within 24 hours.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-primary font-medium"
      >
        ✓ Thank you for reaching out!
      </motion.div>
    </motion.div>
  );
}
