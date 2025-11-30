import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "./ai-markdown-components";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function ChatMessages({
  messages,
  loading,
  messagesEndRef,
}: {
  messages: ChatMessage[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="relative p-4 space-y-3 max-h-80 overflow-y-auto bg-background/40 backdrop-blur-xl">
      {messages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 px-4"
        >
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ask me anything about Sangam's experience, projects, or skills. I'm here to help!
          </p>
        </motion.div>
      )}

      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10, x: msg.role === "user" ? 20 : -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          data-testid={`chat-message-${idx}`}
        >
          {msg.role === "assistant" && (
            <motion.div 
              className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>
          )}
          <motion.div
            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
              msg.role === "user"
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-lg px-4 py-2.5 max-w-md hover:shadow-xl hover:shadow-primary/50"
                : "bg-muted/70 text-muted-foreground rounded-bl-none backdrop-blur-xl border border-primary/20 px-4 py-3 max-w-2xl hover:bg-muted/80 hover:border-primary/30"
            }`}
            whileHover={{ y: -2 }}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-sm dark:prose-invert max-w-none text-inherit">
                <ReactMarkdown
                  components={markdownComponents}
                  remarkPlugins={[remarkGfm]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            ) : (
              <span className="text-sm">{msg.content}</span>
            )}
          </motion.div>
        </motion.div>
      ))}

      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex justify-start items-end gap-2"
        >
          <motion.div 
            className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </motion.div>
          <motion.div 
            className="bg-muted/70 text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 backdrop-blur-xl border border-primary/20"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="text-sm">Thinking...</span>
          </motion.div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
