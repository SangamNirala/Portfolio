import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <footer className="spacing-section-lg bg-background section-pattern-default relative" data-testid="section-footer">
      <div className="footer-top-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="footer-column"
          >
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">Sangam Nirala</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">ML Engineer building production-grade systems that drive real business impact.</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://linkedin.com/in/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="LinkedIn"
                data-testid="footer-link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="GitHub"
                data-testid="footer-link-github"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:srnirala_b22@et.vjti.ac.in"
                whileHover={{ scale: 1.2 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="Email"
                data-testid="footer-link-email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-section">
              {["About", "Experience", "Projects", "Skills", "Education"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="footer-link text-sm"
                    data-testid={`footer-link-${item.toLowerCase()}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Contact</h4>
            <ul className="footer-section text-sm">
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 shrink-0 text-primary group-hover:text-primary/80 transition-colors" />
                <a href="mailto:srnirala_b22@et.vjti.ac.in" className="footer-link text-sm">srnirala_b22@et.vjti.ac.in</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 shrink-0 text-primary group-hover:text-primary/80 transition-colors" />
                <a href="tel:+919987937919" className="footer-link text-sm">+91 9987937919</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Mumbai, India</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-card border border-primary/20 hover:border-primary/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-sm hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </motion.button>
            </form>
            <p className="text-xs text-muted-foreground/70 mt-3">Get ML insights monthly</p>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground/70 mb-6">© {new Date().getFullYear()} Sangam Nirala. All rights reserved.</p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="outline" className="font-mono text-xs border-primary/20">WCAG AA</Badge>
            <Badge variant="outline" className="font-mono text-xs border-primary/20">Mobile Responsive</Badge>
            <Badge variant="outline" className="font-mono text-xs border-primary/20">Lighthouse 95+</Badge>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
