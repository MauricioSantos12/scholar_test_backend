import { z } from "zod";

export const testAreaSchema = z.object({
  area_id: z.number().int().positive(),
  weight: z.number().min(0).max(100).optional(),
  is_active: z.boolean().optional(),
  position: z.number().int().optional(),
});
