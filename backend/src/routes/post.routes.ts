import { Router } from 'express';
import PostController from '../controllers/post.controller';
import { validate } from '../middlewares/validate.middleware';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { idParamSchema } from '../schemas/common.schema';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = Router();

// Públicas
router.get('/published', (req, res) => PostController.getPublished(req, res));

router.get('/slug/:slug', (req, res) => PostController.getBySlug(req, res));

// Admin
router.get('/', authenticateJWT, (req, res) => PostController.getAll(req, res));

router.get('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  PostController.getById(req, res),
);

router.post('/', authenticateJWT, validate(createPostSchema), (req, res) =>
  PostController.create(req, res),
);

router.post(
  '/:id/image',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  uploadImage.single('image'),
  (req, res) => PostController.uploadImage(req, res),
);

router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updatePostSchema),
  (req, res) => PostController.update(req, res),
);

router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  PostController.delete(req, res),
);

export default router;
