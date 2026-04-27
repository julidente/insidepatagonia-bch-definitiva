// src/schemas/province.schema.ts
import { z } from 'zod';

export const createProvinceSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
});

export const updateProvinceSchema = createProvinceSchema.partial();
