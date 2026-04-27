// src/routes/image.routes.ts
import { Router } from 'express';
import ImageController from '../controllers/image.controller';
import { validate } from '../middlewares/validate.middleware';
import { createImageSchema, updateImageSchema } from '../schemas/image.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Imágenes
 *   description: Operaciones relacionadas con las imágenes de actividades
 */

router.get('/', (req, res) => ImageController.getAll(req, res));

router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  ImageController.getById(req, res),
);

/**
 * @swagger
 * /api/images:
 *   post:
 *     summary: Sube una nueva imagen asociada a una actividad
 *     tags: [Imágenes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - activity_id
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               activity_id:
 *                 type: integer
 *                 example: 4
 *               is_cover:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Imagen creada exitosamente
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post(
  '/',
  authenticateJWT,
  uploadImage.single('image'),
  validate(createImageSchema),
  (req, res) => ImageController.create(req, res),
);

router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateImageSchema),
  (req, res) => ImageController.update(req, res),
);

router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  ImageController.delete(req, res),
);

export default router;
