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
import {
  validateDriverId,
  validateCreateDriver,
  validateUpdateDriver,
} from '../middleware/validators/driverValidators.js';

const router = express.Router();

router.get('/', getAllDriversHandler);
router.get('/:id', validateDriverId, getDriverByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), validateCreateDriver, createDriverHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateDriverId, validateUpdateDriver, updateDriverHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateDriverId, deleteDriverHandler);

export default router;