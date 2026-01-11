import { z } from "zod";

export const groupSchema = z.object({
  name: z.string().min(3, "first_text must have at least 3 characters"),
  description: z.string().optional().nullable(),
  school_name: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
});

export const groupCreateSchema = groupSchema; // no omitas nada aquí
export const groupUpdateSchema = groupSchema.partial();
