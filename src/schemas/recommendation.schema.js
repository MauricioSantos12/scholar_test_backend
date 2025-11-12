import { z } from "zod";

export const recommendationSchema = z.object({
  area_id: z.number().int(),
  min_score: z.number().min(0).max(100),
  max_score: z.number().min(0).max(100),
  text: z.string().min(3),
  image_url: z.string().optional(),
});

export const recommendationUpdateSchema = recommendationSchema.partial();

export const recommendationCreateSchema = recommendationSchema;
