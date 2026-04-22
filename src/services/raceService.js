import {
  getAllRaces,
  getRaceById,
  createRace,
  updateRace,
  deleteRace,
} from '../repositories/raceRepo.js';

export async function getAllRacesService() {
  return await getAllRaces();
}

export async function getRaceByIdService(id) {
  const race = await getRaceById(id);
  if (!race) {
    const error = new Error(`Race ${id} not found`);
    error.status = 404;
    throw error;
  }
  return race;
}

export async function createRaceService(data) {
  return await createRace(data);
}

export async function updateRaceService(id, data) {
  const race = await updateRace(id, data);
  if (!race) {
    const error = new Error(`Race ${id} not found`);
    error.status = 404;
    throw error;
  }
  return race;
}

export async function deleteRaceService(id) {
  const result = await deleteRace(id);
  if (!result) {
    const error = new Error(`Race ${id} not found`);
    error.status = 404;
    throw error;
  }
}