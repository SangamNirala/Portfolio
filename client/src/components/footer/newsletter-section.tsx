import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Simulate subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-8"
    >
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Get notified about new projects, insights, and opportunities.
        </p>

        <form onSubmit={handleSubscribe} className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pr-10"
              data-testid="input-newsletter-email"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            size="default"
            data-testid="button-newsletter-subscribe"
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : isSubscribed ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Sent
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        {isSubscribed && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-green-600 dark:text-green-400 mt-3"
          >
            ✓ Thanks for subscribing!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
