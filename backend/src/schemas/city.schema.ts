// src/schemas/city.schema.ts
import { z } from 'zod';

// Crear City
export const createCitySchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  province_id: z.number().positive('province_id debe ser un número positivo'),
});

// Actualizar City: todos opcionales
export const updateCitySchema = createCitySchema.partial();
