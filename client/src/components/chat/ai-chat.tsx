import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ai-chat/ai-chat-header";
import { ChatMessages } from "./ai-chat/ai-chat-message";
import { ChatInput } from "./ai-chat/ai-chat-input";

interface AIChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  websiteContent: string;
}

export function AIChatDialog({ isOpen, onClose, websiteContent }: AIChatDialogProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-md z-39"
            onClick={onClose}
            data-testid="ai-chat-backdrop"
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 mx-4 md:mx-auto md:max-w-2xl z-40 bg-gradient-to-br from-card via-card to-card/95 border border-primary/20 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden"
            data-testid="ai-chat-dialog"
            style={{ pointerEvents: "auto" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          
            <ChatHeader onClose={onClose} />
            <ChatMessages messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
            <ChatInput input={input} setInput={setInput} loading={loading} onSend={handleSend} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
