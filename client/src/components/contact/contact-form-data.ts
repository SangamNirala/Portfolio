import { z } from "zod";
import { Linkedin, Github, MessageSquare } from "lucide-react";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const directMessageOptions = [
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "https://linkedin.com/in/sangamnirala", 
    color: "from-blue-600 to-blue-700", 
    testid: "dm-linkedin" 
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "https://github.com/sangamnirala", 
    color: "from-gray-700 to-gray-800", 
    testid: "dm-github" 
  },
  { 
    icon: MessageSquare, 
    label: "WhatsApp", 
    href: "https://wa.me/919987937919", 
    color: "from-green-500 to-green-600", 
    testid: "dm-whatsapp" 
  },
];
