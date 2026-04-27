// src/schemas/category.schema.ts
import { z } from 'zod';

// Crear Category
export const createCategorySchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  description: z.string().optional(),
});

// Actualizar Category: todos opcionales
export const updateCategorySchema = createCategorySchema.partial();
