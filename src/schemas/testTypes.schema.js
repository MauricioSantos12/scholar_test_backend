import { z } from "zod";

export const testTypesSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional().nullable(),
  is_active: z.boolean().optional().nullable(),
});

export const testTypesUpdateSchema = testTypesSchema.partial();

export const testTypesCreateSchema = testTypesSchema;
