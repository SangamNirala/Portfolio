import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ChatInput({
  input,
  setInput,
  loading,
  onSend,
}: {
  input: string;
  setInput: (value: string) => void;
  loading: boolean;
  onSend: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative p-4 border-t border-primary/20 flex gap-2 bg-background/40 backdrop-blur-xl">
      <motion.input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && !loading && onSend()}
        placeholder="Ask a question..."
        className="flex-1 px-4 py-2.5 rounded-xl bg-background/60 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm transition-all duration-200 backdrop-blur-xl"
        disabled={loading}
        data-testid="input-ai-question"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          onClick={onSend}
          disabled={loading || !input.trim()}
          size="sm"
          className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-xl hover:shadow-primary/50 transition-all duration-200"
          data-testid="button-send-ai-question"
        >
          <Send className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
