import { Router } from 'express';
import ActivityController from '../controllers/activity.controller';
import { validate } from '../middlewares/validate.middleware';
import { createActivitySchema, updateActivitySchema } from '../schemas/activity.schema';
import { idParamSchema } from '../schemas/common.schema';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', (req, res) => ActivityController.getAll(req, res));

router.get('/sorted', (req, res) => ActivityController.getAllSorted(req, res));

router.get('/:id', validate(idParamSchema, 'params'), (req, res) =>
  ActivityController.getById(req, res),
);

router.post('/', authenticateJWT, validate(createActivitySchema), (req, res) =>
  ActivityController.create(req, res),
);

router.put(
  '/:id',
  authenticateJWT,
  validate(idParamSchema, 'params'),
  validate(updateActivitySchema),
  (req, res) => ActivityController.update(req, res),
);

router.delete('/:id', authenticateJWT, validate(idParamSchema, 'params'), (req, res) =>
  ActivityController.delete(req, res),
);

export default router;
