import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { userInputSchema, userUpdateSchema } from '../schemas/user.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       401:
 *         description: Token inválido o ausente
 */
// Rutas de usuario (solo admin)
router.get('/', authenticateJWT, (req, res) => UserController.getAll(req, res));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  UserController.getById(req, res),
);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Usuarios]
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
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Juan Perez
 *                 email:
 *                   type: string
 *                   example: juan@example.com
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 */
router.post('/', authenticateJWT, validate(userInputSchema), (req, res) =>
  UserController.create(req, res),
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza un usuario existente (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Error en los datos de entrada
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Usuario no encontrado
 */
router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(userUpdateSchema),
  (req, res) => UserController.update(req, res),
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario (necesita token, hacer login y poner el token en Authorize)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []       # <<--- Auth agregado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado correctamente
 *       401:
 *         description: Token inválido o ausente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  UserController.delete(req, res),
);

export default router;
