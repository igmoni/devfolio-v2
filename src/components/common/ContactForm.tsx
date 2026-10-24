"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { toast } from "sonner";

import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Coffee } from "./Coffee";

type ContactFormProps = {
  className?: string;
  showHeader?: boolean;
};

export function ContactForm({
  className,
  showHeader = true,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const message = watch("message");

  const fieldClassName =
    "h-12 rounded-xl border-border/80 bg-background/60 px-4 shadow-sm transition-all duration-200 placeholder:text-muted-foreground/65 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-foreground/10";

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send your message");
      }

      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      className={cn(
        "border-border/70 bg-card/80 relative w-full overflow-hidden rounded-2xl border p-0 shadow-[0_12px_50px_-20px_rgba(0,0,0,0.25)] backdrop-blur-xl",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="from-muted/70 via-muted/20 pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b to-transparent"
      />

      {showHeader && (
        <CardHeader className="relative space-y-3 px-5 pt-6 sm:px-8 sm:pt-8">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-500/70" />
            <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              Get in touch
            </span>
          </div>

          <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Send me a message
          </CardTitle>

          <CardDescription className="max-w-lg text-xs leading-6 sm:text-sm">
            Have a project in mind or just want to say hello? Fill out the form
            below and I&apos;ll get back to you in few hours.
          </CardDescription>
        </CardHeader>
      )}

      <CardContent className="relative px-5 pb-6 sm:px-8 sm:pb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={cn("space-y-5", !showHeader && "mt-6")}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium">
                Name <span className="text-destructive">*</span>
              </label>

              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  className={cn(fieldClassName, "pl-10")}
                  {...register("name")}
                />
              </div>

              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-sm font-medium">
                Phone <span className="text-destructive">*</span>
              </label>

              <div className="relative">
                <Phone className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
                <Input
                  id="contact-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  className={cn(fieldClassName, "pl-10")}
                  {...register("phone")}
                />
              </div>

              {errors.phone && (
                <p className="text-destructive text-sm">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>

            <div className="relative">
              <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <Input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={cn(fieldClassName, "pl-10")}
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-destructive text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="contact-message" className="text-sm font-medium">
                Message <span className="text-destructive">*</span>
              </label>

              <span className="text-muted-foreground text-xs tabular-nums">
                {(message ?? "").length}/1000
              </span>
            </div>

            <div className="relative">
              <MessageCircle className="text-muted-foreground absolute top-4 left-3.5 size-4" />
              <Textarea
                id="contact-message"
                placeholder="Tell me about your project, idea, or just say hello..."
                maxLength={1000}
                aria-invalid={!!errors.message}
                className="border-border/80 bg-background/60 placeholder:text-muted-foreground/65 focus-visible:border-foreground/40 focus-visible:ring-foreground/10 min-h-36 resize-y rounded-xl py-3 pl-10 shadow-sm transition-all duration-200 focus-visible:ring-2"
                {...register("message")}
              />
            </div>

            {errors.message && (
              <p className="text-destructive text-sm">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group bg-foreground text-background h-12 w-full rounded-xl px-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 sm:flex-1 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending message...
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowUpRight className="ml-auto size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </Button>

            <Coffee className="shadow-acternity dark:shadow-acternity-white size-9 shrink-0 self-center sm:self-auto" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
