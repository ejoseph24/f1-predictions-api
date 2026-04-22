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

const router = express.Router();

router.get('/', getAllRacesHandler);
router.get('/:id', getRaceByIdHandler);
router.post('/', authenticate, authorizeRoles('ADMIN'), createRaceHandler);
router.put('/:id', authenticate, authorizeRoles('ADMIN'), updateRaceHandler);
router.delete('/:id', authenticate, authorizeRoles('ADMIN'), deleteRaceHandler);

export default router;