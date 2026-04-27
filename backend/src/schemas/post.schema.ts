import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es obligatorio')
    .max(200, 'El título no puede superar 200 caracteres'),

  description: z.string().min(1, 'La descripción es obligatoria'),

  is_published: z.boolean().optional(),

  cover_image_url: z.string().max(500).optional().nullable(),

  cover_image_public_id: z.string().max(255).optional().nullable(),
});

export const updatePostSchema = createPostSchema.partial();
