import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData, directMessageOptions } from "./contact-form-data";

export function ContactFormFields({
  form,
  isSubmitting,
  onSubmit,
}: {
  form: UseFormReturn<ContactFormData>;
  isSubmitting: boolean;
  onSubmit: (data: ContactFormData) => Promise<void>;
}) {
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      className="bg-background border-border focus:border-primary"
                      disabled={isSubmitting}
                      data-testid="input-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      {...field}
                      className="bg-background border-border focus:border-primary"
                      disabled={isSubmitting}
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Project inquiry, collaboration, etc."
                    {...field}
                    className="bg-background border-border focus:border-primary"
                    disabled={isSubmitting}
                    data-testid="input-subject"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project or idea..."
                    {...field}
                    className="bg-background border-border focus:border-primary min-h-32 resize-none"
                    disabled={isSubmitting}
                    data-testid="textarea-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold min-h-12 transition-all duration-300"
            data-testid="button-submit-form"
          >
            {isSubmitting ? (
              <motion.span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⏳
                </motion.span>
                Sending...
              </motion.span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Form>

      {/* Direct Message Options */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="text-sm text-muted-foreground text-center mb-4 font-medium">Or reach out directly:</p>
        <div className="grid grid-cols-3 gap-3">
          {directMessageOptions.map((option, index) => (
            <motion.a
              key={index}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-4 rounded-lg bg-gradient-to-br ${option.color} text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300`}
              data-testid={option.testid}
              aria-label={`Direct message via ${option.label}`}
            >
              <option.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{option.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </>
  );
}
