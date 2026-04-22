import prisma from '../config/db.js';

export async function getAllRaces() {
  return await prisma.race.findMany();
}

export async function getRaceById(id) {
  return await prisma.race.findUnique({ where: { id } });
}

export async function createRace(data) {
  try {
    return await prisma.race.create({ data });
  } catch (err) {
    if (err.code === 'P2002') {
      const error = new Error('A race with that name already exists');
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function updateRace(id, data) {
  try {
    return await prisma.race.update({ where: { id }, data });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}

export async function deleteRace(id) {
  try {
    await prisma.race.delete({ where: { id } });
    return true;
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
}