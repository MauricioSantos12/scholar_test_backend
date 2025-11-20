import { z } from "zod";

export const userSchema = z.object({
  identification_number: z.string().min(3),
  name: z.string().min(2),
  second_name: z.string().optional(),
  last_name: z.string().min(2),
  email: z.string().email(),
  date_birth: z.string().date().or(z.string()),
  school_name: z.string().optional(),
  graduation_year: z.number().int().optional(),
  city: z.string().optional(),
  phone_number: z.string().optional(),
  parent_name: z.string().optional().nullable(),
  parent_email: z.string().email().optional().nullable(),
  parent_phone: z.string().optional().nullable(),
  role: z.enum(["admin", "student"]),
  is_active: z.boolean().optional(),
  password: z.string().optional().nullable(),
});

export const userUpdateSchema = userSchema.partial();

export const userCreateSchema = userSchema.extend({
  password: z.string().min(8),
});
