import express from 'express';
import {
  getAllDriversHandler,
  getDriverByIdHandler,
  createDriverHandler,
  updateDriverHandler,
  deleteDriverHandler,
} from '../controllers/driverController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/', getAllDriversHandler);
router.get('/:id', getDriverByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), createDriverHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateDriverHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteDriverHandler);

export default router;