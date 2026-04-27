// src/schemas/user.schema.ts
import { z } from 'zod';

export const userInputSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.email({ message: 'Correo electrónico inválido' }),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const userUpdateSchema = userInputSchema.partial(); // todos opcionales
