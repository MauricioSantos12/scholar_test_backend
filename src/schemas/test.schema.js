import { z } from "zod";

export const testSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  type_id: z.number().int().optional(),
});

export const testUpdateSchema = testSchema.partial();

export const testCreateSchema = testSchema;
