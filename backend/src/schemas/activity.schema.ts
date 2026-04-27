// src/schemas/activity.schema.ts
import { z } from 'zod';

export const createActivitySchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),

    summary: z.string().max(150, 'El resumen no puede superar 150 caracteres').optional(),

    description: z.string().optional(),

    location: z
      .string()
      .min(1, 'La ubicación es obligatoria')
      .max(200, 'La ubicación no puede superar 200 caracteres'),

    has_multiple_meeting_points: z.boolean(),

    meeting_point_1: z
      .string()
      .max(200, 'El lugar de encuentro 1 no puede superar 200 caracteres')
      .optional(),

    meeting_point_2: z
      .string()
      .max(200, 'El lugar de encuentro 2 no puede superar 200 caracteres')
      .optional(),

    activity_type: z.string().min(1, 'El tipo de actividad es obligatorio'),

    duration_hours: z
      .number()
      .int()
      .min(1, 'La duración mínima es 1 hora')
      .max(20, 'La duración máxima es 20 horas')
      .optional(),

    has_additional_cost: z.boolean().optional(),

    additional_cost: z.string().optional(),

    includes: z.string().max(200, 'Incluye no puede superar 200 caracteres').optional(),

    not_includes: z.string().max(200, 'No incluye no puede superar 200 caracteres').optional(),

    what_you_will_do: z.string().optional(),

    accommodation_detail: z
      .string()
      .max(200, 'Alojamiento no puede superar 200 caracteres')
      .optional(),

    transfer_detail: z.string().max(200, 'Traslado no puede superar 200 caracteres').optional(),

    important_info: z.string().optional(),

    tips: z.string().max(150, 'Los tips no pueden superar 150 caracteres').optional(),

    technical_difficulty: z.string().optional(),

    effort_level: z.string().optional(),

    distance: z.string().max(100, 'La distancia no puede superar 100 caracteres').optional(),

    activity_days: z
      .number()
      .int()
      .min(1, 'Los días de actividad deben ser mínimo 1')
      .max(10, 'Los días de actividad no pueden superar 10')
      .optional(),

    accommodation_days: z
      .number()
      .int()
      .min(1, 'Los días con alojamiento deben ser mínimo 1')
      .max(10, 'Los días con alojamiento no pueden superar 10')
      .optional(),

    accommodation_type: z.string().optional(),

    transport_type: z.string().optional(),

    price: z.number().positive('El precio debe ser un número positivo'),

    price_currency: z.string().min(1, 'La moneda es obligatoria'),

    price_additional_info: z
      .string()
      .max(150, 'La información adicional del precio no puede superar 150 caracteres')
      .optional(),

    availableDates: z
      .array(
        z.object({
          start_date: z.string().min(1, 'La fecha de inicio es obligatoria'),
          end_date: z.string().min(1, 'La fecha de fin es obligatoria'),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.meeting_point_1 || data.meeting_point_1.trim() === '') {
      ctx.addIssue({
        code: 'custom',
        path: ['meeting_point_1'],
        message: 'El lugar de encuentro 1 es obligatorio',
      });
    }

    if (data.has_multiple_meeting_points) {
      if (!data.meeting_point_2 || data.meeting_point_2.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['meeting_point_2'],
          message: 'El lugar de encuentro 2 es obligatorio si hay más de un lugar de encuentro',
        });
      }
    }

    if (data.has_additional_cost) {
      if (!data.additional_cost || data.additional_cost.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          path: ['additional_cost'],
          message: 'Debes completar el detalle del costo adicional',
        });
      }
    }

    if (data.availableDates && data.availableDates.length > 0) {
      for (let i = 0; i < data.availableDates.length; i++) {
        const item = data.availableDates[i];
        if (!item) continue;

        if (item.end_date < item.start_date) {
          ctx.addIssue({
            code: 'custom',
            path: ['availableDates', i, 'end_date'],
            message: 'La fecha de fin no puede ser menor que la fecha de inicio',
          });
        }
      }
    }
  });

export const updateActivitySchema = createActivitySchema.partial();

export const activityIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID debe ser un número').transform(Number),
});
