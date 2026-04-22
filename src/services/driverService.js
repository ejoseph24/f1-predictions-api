import {
  getAllDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from '../repositories/driverRepo.js';

export async function getAllDriversService() {
  return await getAllDrivers();
}

export async function getDriverByIdService(id) {
  const driver = await getDriverById(id);
  if (!driver) {
    const error = new Error(`Driver ${id} not found`);
    error.status = 404;
    throw error;
  }
  return driver;
}

export async function createDriverService(data) {
  return await createDriver(data);
}

export async function updateDriverService(id, data) {
  const driver = await updateDriver(id, data);
  if (!driver) {
    const error = new Error(`Driver ${id} not found`);
    error.status = 404;
    throw error;
  }
  return driver;
}

export async function deleteDriverService(id) {
  const result = await deleteDriver(id);
  if (!result) {
    const error = new Error(`Driver ${id} not found`);
    error.status = 404;
    throw error;
  }
}