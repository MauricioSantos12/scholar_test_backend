import { z } from "zod";

export const componentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  area_id: z.number().int(),
  position: z.number().int().optional(),
});

export const componentUpdateSchema = componentSchema.partial();
