import express from 'express';
import {
  getAllPredictionsHandler,
  getPredictionByIdHandler,
  createPredictionHandler,
  updatePredictionHandler,
  deletePredictionHandler,
} from '../controllers/predictionController.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  validatePredictionId,
  validateCreatePrediction,
  validateUpdatePrediction,
} from '../middleware/validators/predictionValidators.js';

const router = express.Router();

router.get('/', getAllPredictionsHandler);
router.get('/:id', validatePredictionId, getPredictionByIdHandler);
router.post('/', authenticate, validateCreatePrediction, createPredictionHandler);
router.put('/:id', authenticate, validatePredictionId, validateUpdatePrediction, updatePredictionHandler);
router.delete('/:id', authenticate, validatePredictionId, deletePredictionHandler);

export default router;