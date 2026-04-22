import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    const user = await prisma.user.create({ data });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (err) {
    if (err.code === 'P2002') {
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }
    throw err;
  }
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } });
}