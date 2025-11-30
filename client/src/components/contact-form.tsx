import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, ContactFormData } from "./contact/contact-form-data";
import { ContactFormFields } from "./contact/contact-form-fields";
import { ContactFormSuccess } from "./contact/contact-form-success";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      
      setSubmitSuccess(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: result.message || "I'll get back to you within 24 hours.",
      });

      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm cursor-pointer shadow-lg"
      data-testid="contact-form"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Mail className="h-6 w-6 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
            <p className="text-sm text-muted-foreground">I typically respond within 24 hours</p>
          </div>
        </div>
      </div>

      {submitSuccess ? (
        <ContactFormSuccess />
      ) : (
        <ContactFormFields form={form} isSubmitting={isSubmitting} onSubmit={onSubmit} />
      )}
    </motion.div>
  );
}
