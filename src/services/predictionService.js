import {
  getAllPredictions,
  getPredictionById,
  createPrediction,
  updatePrediction,
  deletePrediction,
} from '../repositories/predictionRepo.js';

export async function getAllPredictionsService() {
  return await getAllPredictions();
}

export async function getPredictionByIdService(id) {
  const prediction = await getPredictionById(id);
  if (!prediction) {
    const error = new Error(`Prediction ${id} not found`);
    error.status = 404;
    throw error;
  }
  return prediction;
}

export async function createPredictionService(data) {
  return await createPrediction(data);
}

export async function updatePredictionService(id, userId, data) {
  const prediction = await getPredictionById(id);
  if (!prediction) {
    const error = new Error(`Prediction ${id} not found`);
    error.status = 404;
    throw error;
  }
  if (prediction.userId !== userId) {
    const error = new Error('Forbidden: you do not own this prediction');
    error.status = 403;
    throw error;
  }
  return await updatePrediction(id, data);
}


export async function deletePredictionService(id, userId, userRole) {
  const prediction = await getPredictionById(id);
  if (!prediction) {
    const error = new Error(`Prediction ${id} not found`);
    error.status = 404;
    throw error;
  }
  if (prediction.userId !== userId && userRole !== 'ADMIN') {
    const error = new Error('Forbidden: you do not own this prediction');
    error.status = 403;
    throw error;
  }
  await deletePrediction(id);
}