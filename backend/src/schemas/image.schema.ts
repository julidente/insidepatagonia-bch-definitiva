// src/schemas/image.schema.ts
import { z } from 'zod';

export const createImageSchema = z.object({
  activity_id: z.coerce.number().positive('activity_id debe ser un número positivo'),
  is_cover: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((value) => value === true || value === 'true'),
});

export const updateImageSchema = z
  .object({
    url: z.string().min(1, 'La URL es obligatoria').optional(),
    public_id: z.string().min(1, 'El public_id es obligatorio').optional(),
    is_cover: z.boolean().optional(),
    activity_id: z.number().positive('activity_id debe ser un número positivo').optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  });
