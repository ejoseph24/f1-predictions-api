import prisma from '../config/db.js';

export async function getAllPredictions() {
  return await prisma.prediction.findMany();
}

export async function getPredictionById(id) {
  return await prisma.prediction.findUnique({ where: { id } });
}

export async function createPrediction(data) {
  try {
    return await prisma.prediction.create({ data });
  } catch (err) {
    if (err.code === 'P2003') {
      const error = new Error('Referenced race or driver does not exist');
      error.status = 404;
      throw error;
    }
    throw err;
  }
}

export async function updatePrediction(id, data) {
  try {
    return await prisma.prediction.update({ where: { id }, data });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}

export async function deletePrediction(id) {
  try {
    await prisma.prediction.delete({ where: { id } });
    return true;
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}