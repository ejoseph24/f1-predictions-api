import {
  getAllRacesService,
  getRaceByIdService,
  createRaceService,
  updateRaceService,
  deleteRaceService,
} from '../services/raceService.js';

export async function getAllRacesHandler(req, res) {
  const races = await getAllRacesService();
  res.status(200).json(races);
}

export async function getRaceByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const race = await getRaceByIdService(id);
  res.status(200).json(race);
}

export async function createRaceHandler(req, res) {
  const { name, circuit, season, date } = req.body;
  const race = await createRaceService({ name, circuit, season, date });
  res.status(201).json(race);
}

export async function updateRaceHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, circuit, season, date } = req.body;
  const race = await updateRaceService(id, { name, circuit, season, date });
  res.status(200).json(race);
}

export async function deleteRaceHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteRaceService(id);
  res.status(204).send();
}