import { z } from "zod";

export const areaSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
});

export const areaUpdateSchema = areaSchema.partial();
