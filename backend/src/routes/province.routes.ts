// src/routes/province.routes.ts
import { Router } from 'express';
import ProvinceController from '../controllers/province.controller';
import { validate } from '../middlewares/validate.middleware';
import { createProvinceSchema, updateProvinceSchema } from '../schemas/province.schema';
import { idParamSchema } from '../schemas/common.schema';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Provincias
 *   description: Operaciones relacionadas con provincias (solo argentina no se hara post, put o delete)
 */

/**
 * @swagger
 * /api/provinces:
 *   get:
 *     summary: Obtiene todas las provincias
 *     tags: [Provincias]
 *     responses:
 *       200:
 *         description: Lista de provincias
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
 *                     example: Buenos Aires
 */
router.get('/', (req, res) => ProvinceController.getAll(req, res));
/**
 * @swagger
 * /api/provinces/{id}:
 *   get:
 *     summary: Obtiene una provincia por ID
 *     tags: [Provincias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la provincia
 *     responses:
 *       200:
 *         description: Provincia encontrada
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
 *       404:
 *         description: Provincia no encontrada
 */
router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  ProvinceController.getById(req, res),
);
// /**
//  * @swagger
//  * /api/provinces:
//  *   post:
//  *     summary: Crea una nueva provincia
//  *     tags: [Provincias]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: Mendoza
//  *     responses:
//  *       201:
//  *         description: Provincia creada exitosamente
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: integer
//  *                   example: 10
//  *                 name:
//  *                   type: string
//  *                   example: Mendoza
//  *       400:
//  *         description: Error en los datos de entrada
//  */
// router.post('/', validate(createProvinceSchema), (req, res) => ProvinceController.create(req, res));
// /**
//  * @swagger
//  * /api/provinces/{id}:
//  *   put:
//  *     summary: Actualiza una provincia existente
//  *     tags: [Provincias]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID de la provincia
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: Santa Fe
//  *     responses:
//  *       200:
//  *         description: Provincia actualizada correctamente
//  *       400:
//  *         description: Error en los datos de entrada
//  *       404:
//  *         description: Provincia no encontrada
//  */
// router.put('/:id', validate(idParamSchema, 'params'), validate(updateProvinceSchema), (req, res) =>
//   ProvinceController.update(req, res),
// );
// /**
//  * @swagger
//  * /api/provinces/{id}:
//  *   delete:
//  *     summary: Elimina una provincia
//  *     tags: [Provincias]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: ID de la provincia
//  *     responses:
//  *       204:
//  *         description: Provincia eliminada correctamente
//  *       404:
//  *         description: Provincia no encontrada
//  */
// router.delete('/:id', validate(idParamSchema, 'params'), (req, res) =>
//   ProvinceController.delete(req, res),
// );

export default router;
