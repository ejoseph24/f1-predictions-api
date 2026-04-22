import {
  getAllPredictionsService,
  getPredictionByIdService,
  createPredictionService,
  updatePredictionService,
  deletePredictionService,
} from '../services/predictionService.js';

export async function getAllPredictionsHandler(req, res) {
  const predictions = await getAllPredictionsService();
  res.status(200).json(predictions);
}


export async function getPredictionByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const prediction = await getPredictionByIdService(id);
  res.status(200).json(prediction);
}



export async function createPredictionHandler(req, res) {
  const { raceId, predictedFirstId, predictedSecondId, predictedThirdId } = req.body;
  const userId = req.user.id;
  const prediction = await createPredictionService({
    userId,
    raceId,
    predictedFirstId,
    predictedSecondId,
    predictedThirdId,
  });
  res.status(201).json(prediction);
}


export async function updatePredictionHandler(req, res) {
  const id = parseInt(req.params.id);
  const userId = req.user.id;
  const { predictedFirstId, predictedSecondId, predictedThirdId } = req.body;
  const prediction = await updatePredictionService(id, userId, {
    predictedFirstId,
    predictedSecondId,
    predictedThirdId,
  });
  res.status(200).json(prediction);
}

export async function deletePredictionHandler(req, res) {
  const id = parseInt(req.params.id);
  const userId = req.user.id;
  const userRole = req.user.role;
  await deletePredictionService(id, userId, userRole);
  res.status(204).send();
}