import { z } from "zod";

export const answerSchema = z.object({
  question_id: z.number().int(),
  text: z.string().min(1),
  image_url: z.string().optional(),
  value: z.number().min(0).max(1),
  is_correct: z.boolean(),
  explanation: z.string().optional(),
  video_url: z.string().optional(),
  position: z.number().int().optional(),
});

export const answerUpdateSchema = answerSchema.partial();

export const answerCreateSchema = answerSchema;
