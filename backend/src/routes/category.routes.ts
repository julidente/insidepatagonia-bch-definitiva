// src/routes/category.routes.ts
import { Router } from 'express';
import CategoryController from '../controllers/category.controller';
import { validate } from '../middlewares/validate.middleware';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Operaciones relacionadas con categorías de productos
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
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
 *                     example: Electrónica
 *                   description:
 *                     type: string
 *                     example: Productos tecnológicos y dispositivos electrónicos
 */
router.get('/', (req, res) => CategoryController.getAll(req, res));
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 name:
 *                   type: string
 *                   example: Ropa
 *                 description:
 *                   type: string
 *                   example: Artículos de vestimenta y moda
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  CategoryController.getById(req, res),
);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crea una nueva categoría (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []        # Requiere token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Compras
 *               description:
 *                 type: string
 *                 example: Centros comerciales, mercados locales y zonas de compras
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: integer
 *                   example: 12
 *                 name:
 *                   type: string
 *                   example: Compras
 *                 description:
 *                   type: string
 *                   example: Centros comerciales, mercados locales y zonas de compras
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post('/', authenticateJWT, validate(createCategorySchema), (req, res) =>
  CategoryController.create(req, res),
);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualiza una categoría existente (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tecnología
 *               description:
 *                 type: string
 *                 example: Dispositivos electrónicos, computadoras y accesorios
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Error en los datos de entrada
 *       404:
 *         description: Categoría no encontrada
 */
router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateCategorySchema),
  (req, res) => CategoryController.update(req, res),
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Elimina una categoría (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []       # <<--- Se agrega autenticación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada correctamente
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  CategoryController.delete(req, res),
);

export default router;
