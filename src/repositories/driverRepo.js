import prisma from '../config/db.js';

export async function getAllDrivers() {
  return await prisma.driver.findMany();
}

export async function getDriverById(id) {
  return await prisma.driver.findUnique({ where: { id } });
}

export async function createDriver(data) {
  try {
    return await prisma.driver.create({ data });
  } catch (err) {
    if (err.code === 'P2002') {
      const error = new Error('A driver with that name already exists');
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function updateDriver(id, data) {
  try {
    return await prisma.driver.update({ where: { id }, data });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}

export async function deleteDriver(id) {
  try {
    await prisma.driver.delete({ where: { id } });
    return true;
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}