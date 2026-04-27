// src/routes/city.routes.ts
import { Router } from 'express';
import CityController from '../controllers/city.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCitySchema, updateCitySchema } from '../schemas/city.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Ciudades
 *   description: Operaciones relacionadas con ciudades
 */

/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Obtiene todas las ciudades
 *     tags: [Ciudades]
 *     responses:
 *       200:
 *         description: Lista de ciudades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Rosario
 *                   province_id:
 *                     type: integer
 *                     example: 3
 */
// Rutas
router.get('/', (req, res) => CityController.getAll(req, res));
/**
 * @swagger
 * /api/cities/{id}:
 *   get:
 *     summary: Obtiene una ciudad por ID
 *     tags: [Ciudades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     responses:
 *       200:
 *         description: Ciudad encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Córdoba
 *                 province_id:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: Ciudad no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CityController.getById(req, res),
);

/**
 * @swagger
 * /api/cities:
 *   post:
 *     summary: Crea una nueva ciudad (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Ciudades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - province_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: San Miguel de Tucumán
 *               province_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Ciudad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 12
 *                 name:
 *                   type: string
 *                   example: San Miguel de Tucumán
 *                 province_id:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post('/', authenticateJWT, validate(createCitySchema), (req, res) =>
  CityController.create(req, res),
);

/**
 * @swagger
 * /api/cities/{id}:
 *   put:
 *     summary: Actualiza una ciudad existente (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Ciudades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Santa Rosa
 *               province_id:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: Ciudad actualizada correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Ciudad no encontrada
 */
router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateCitySchema),
  (req, res) => CityController.update(req, res),
);

/**
 * @swagger
 * /api/cities/{id}:
 *   delete:
 *     summary: Elimina una ciudad (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Ciudades]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ciudad
 *     responses:
 *       204:
 *         description: Ciudad eliminada correctamente
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Ciudad no encontrada
 */
router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  CityController.delete(req, res),
);

export default router;
