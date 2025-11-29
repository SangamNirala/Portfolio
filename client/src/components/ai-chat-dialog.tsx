import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Send, Loader2 } from "lucide-react";

interface AIChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  websiteContent: string;
}

export function AIChatDialog({ isOpen, onClose, websiteContent }: AIChatDialogProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          context: websiteContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-0 right-0 mx-4 md:mx-auto md:max-w-2xl z-40 bg-card border border-border rounded-xl shadow-lg"
          data-testid="ai-chat-dialog"
          style={{ pointerEvents: "auto" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Ask anything about Sangam Nirala</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Close AI chat"
              data-testid="button-close-ai-chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 space-y-4 max-h-80 overflow-y-auto bg-background/50">
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">Ask me anything about Sangam Nirala's experience, projects, or skills.</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`chat-message-${idx}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } text-sm`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-border flex gap-2 bg-background/50">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              disabled={loading}
              data-testid="input-ai-question"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-send-ai-question"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
