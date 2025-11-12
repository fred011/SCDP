import * as z from "zod"

export const accountRegistrationSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .refine((email) => email.includes("@") && email.includes("."), {
      message: "Email must be a valid format",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one symbol"),
})

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens and apostrophes"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens and apostrophes"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must not exceed 15 digits")
    .regex(/^[0-9+\s()-]+$/, "Please enter a valid contact number with digits, +, spaces, ( ) or -"),
  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^[0-9]+$/, "Age must be a number")
    .refine((val) => Number.parseInt(val) >= 13 && Number.parseInt(val) <= 120, {
      message: "Age must be between 13 and 120",
    }),
  province: z.string().min(1, "Please select a valid province"),
  town: z
    .string()
    .min(2, "Town / Location must be at least 2 characters")
    .max(100, "Town / Location must not exceed 100 characters"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  gender: z.string().min(1, "Gender is required"),
  idPassport: z
    .string()
    .min(6, "ID / Passport number must be at least 6 characters")
    .max(20, "ID / Passport number must not exceed 20 characters")
    .regex(/^[A-Za-z0-9]+$/, "ID / Passport can only contain letters and numbers"),
  race: z.string().optional(),
})

export type AccountRegistrationData = z.infer<typeof accountRegistrationSchema>
export type PersonalInfoData = z.infer<typeof personalInfoSchema>
