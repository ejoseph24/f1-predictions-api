import express from 'express';
import {
  getAllPredictionsHandler,
  getPredictionByIdHandler,
  createPredictionHandler,
  updatePredictionHandler,
  deletePredictionHandler,
} from '../controllers/predictionController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', getAllPredictionsHandler);
router.get('/:id', getPredictionByIdHandler);
router.post('/', authenticate, createPredictionHandler);
router.put('/:id', authenticate, updatePredictionHandler);
router.delete('/:id', authenticate, deletePredictionHandler);

export default router;