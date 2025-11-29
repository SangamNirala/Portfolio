import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Send, Loader2, Sparkles, MessageCircle, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface AIChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  websiteContent: string;
}

// Custom markdown components with syntax highlighting
const markdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const code = String(children).replace(/\n$/, "");

    if (inline) {
      return (
        <code className="bg-background/50 px-2 py-1 rounded text-primary/90 font-mono text-xs border border-border/30">
          {children}
        </code>
      );
    }

    return (
      <div className="my-3 rounded-lg overflow-hidden border border-border/30">
        <div className="flex items-center justify-between bg-background/50 px-4 py-2 border-b border-border/20">
          <span className="text-xs font-mono text-muted-foreground">{language}</span>
          <CopyButton code={code} />
        </div>
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  },
  ul({ children }: any) {
    return (
      <ul className="my-2 space-y-1 pl-4">
        {children}
      </ul>
    );
  },
  li({ children }: any) {
    return (
      <li className="flex gap-2 text-sm">
        <span className="text-primary font-semibold mt-0.5 flex-shrink-0">•</span>
        <span>{children}</span>
      </li>
    );
  },
  p({ children }: any) {
    return <p className="mb-3 text-sm leading-relaxed">{children}</p>;
  },
  h1({ children }: any) {
    return <h1 className="text-lg font-bold mb-2 text-foreground">{children}</h1>;
  },
  h2({ children }: any) {
    return <h2 className="text-base font-bold mb-2 text-foreground">{children}</h2>;
  },
  h3({ children }: any) {
    return <h3 className="text-sm font-semibold mb-2 text-foreground">{children}</h3>;
  },
  strong({ children }: any) {
    return <strong className="font-semibold text-foreground">{children}</strong>;
  },
  em({ children }: any) {
    return <em className="italic">{children}</em>;
  },
  blockquote({ children }: any) {
    return (
      <blockquote className="border-l-3 border-primary pl-3 my-2 py-1 italic text-muted-foreground">
        {children}
      </blockquote>
    );
  },
};

// Copy button component
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-background rounded transition-colors text-muted-foreground hover:text-foreground"
      title="Copy code"
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
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
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 mx-4 md:mx-auto md:max-w-2xl z-40 bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden"
          data-testid="ai-chat-dialog"
          style={{ pointerEvents: "auto" }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center justify-between p-5 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Ask about Sangam</h3>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-primary/10 rounded-lg transition-all duration-200 hover-elevate"
              aria-label="Close AI chat"
              data-testid="button-close-ai-chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative p-4 space-y-3 max-h-80 overflow-y-auto bg-background/30 backdrop-blur-sm">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 px-4"
              >
                <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask me anything about Sangam's experience, projects, or skills. I'm here to help!
                </p>
              </motion.div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`chat-message-${idx}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-2xl overflow-hidden ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-lg px-4 py-2.5 max-w-md"
                      : "bg-muted/60 text-muted-foreground rounded-bl-none backdrop-blur-sm border border-border/30 px-4 py-3 max-w-2xl"
                  }`}
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
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start items-end gap-2"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-muted/60 text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 backdrop-blur-sm border border-border/30">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="relative p-4 border-t border-border/30 flex gap-2 bg-background/30 backdrop-blur-sm">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-background/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm transition-all duration-200 backdrop-blur-sm"
              disabled={loading}
              data-testid="input-ai-question"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg transition-all duration-200"
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
