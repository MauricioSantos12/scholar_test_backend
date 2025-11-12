import { z } from "zod";

export const questionSchema = z.object({
  component_id: z.number().int({
    message: "component_id must be an integer",
  }),
  first_text: z.string().min(3, "first_text must have at least 3 characters"),
  second_text: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  video_url: z.string().optional().nullable(),
  position: z.number().int().optional().nullable(),
});

export const questionCreateSchema = questionSchema; // no omitas nada aquí
export const questionUpdateSchema = questionSchema.partial();
