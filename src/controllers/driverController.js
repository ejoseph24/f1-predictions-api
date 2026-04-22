import {
  getAllDriversService,
  getDriverByIdService,
  createDriverService,
  updateDriverService,
  deleteDriverService,
} from '../services/driverService.js';

export async function getAllDriversHandler(req, res) {
  const drivers = await getAllDriversService();
  res.status(200).json(drivers);
}

export async function getDriverByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const driver = await getDriverByIdService(id);
  res.status(200).json(driver);
}

export async function createDriverHandler(req, res) {
  const { name, nationality, team } = req.body;
  const driver = await createDriverService({ name, nationality, team });
  res.status(201).json(driver);
}

export async function updateDriverHandler(req, res) {
  const id = parseInt(req.params.id);
  const { name, nationality, team } = req.body;
  const driver = await updateDriverService(id, { name, nationality, team });
  res.status(200).json(driver);
}

export async function deleteDriverHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteDriverService(id);
  res.status(204).send();
}