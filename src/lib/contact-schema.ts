import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(254, "Email is too long"),

  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid phone number")
    .max(25, "Phone number is too long")
    .refine((phone) => {
      const digits = phone.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, "Enter a valid phone number"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be under 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
