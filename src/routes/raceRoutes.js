import express from 'express';
import {
  getAllRacesHandler,
  getRaceByIdHandler,
  createRaceHandler,
  updateRaceHandler,
  deleteRaceHandler,
} from '../controllers/raceController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import {
  validateRaceId,
  validateCreateRace,
  validateUpdateRace,
} from '../middleware/validators/raceValidators.js';

const router = express.Router();

router.get('/', getAllRacesHandler);
router.get('/:id', validateRaceId, getRaceByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), validateCreateRace, createRaceHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), validateRaceId, validateUpdateRace, updateRaceHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), validateRaceId, deleteRaceHandler);

export default router;