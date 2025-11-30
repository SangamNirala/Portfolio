import { motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export function ChatHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex items-center justify-between p-5 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
      <motion.div className="flex items-center gap-3" whileHover={{ x: 4 }} transition={{ duration: 0.3 }}>
        <motion.div 
          className="p-2 rounded-lg bg-primary/20 backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Sparkles className="h-5 w-5 text-primary" />
        </motion.div>
        <div>
          <h3 className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Ask about Sangam</h3>
          <p className="text-xs text-muted-foreground">Powered by Gemini AI</p>
        </div>
      </motion.div>
      <motion.button
        onClick={onClose}
        className="p-1.5 hover:bg-primary/20 rounded-lg transition-all duration-200 hover-elevate"
        aria-label="Close AI chat"
        data-testid="button-close-ai-chat"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <X className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
