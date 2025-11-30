import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const footerColumns: FooterColumn[] = [
  {
    title: "Projects",
    links: [
      { name: "Face Detection", href: "#projects" },
      { name: "PDF Chatbot", href: "#projects" },
      { name: "View All", href: "#projects" },
    ],
  },
  {
    title: "Experience",
    links: [
      { name: "Zenbourg", href: "#experience" },
      { name: "Sakura Biotech", href: "#experience" },
      { name: "Timeline", href: "#experience" },
    ],
  },
  {
    title: "Skills",
    links: [
      { name: "ML/AI", href: "#skills" },
      { name: "Full Stack", href: "#skills" },
      { name: "DevOps", href: "#skills" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Contact", href: "#contact" },
      { name: "Resume", href: "/api/resume" },
      { name: "Blog", href: "#" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "Email",
    href: "mailto:sangam@example.com",
    icon: Mail,
  },
  {
    name: "GitHub",
    href: "https://github.com/sangamnirala",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/sangamnirala",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/sangamnirala",
    icon: Twitter,
  },
];

export const contactInfo = {
  email: "sangam@example.com",
  location: "Mumbai, India",
};
