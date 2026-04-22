import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // CLEAR existing data in order
  await prisma.prediction.deleteMany();
  await prisma.race.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.user.deleteMany();

  // CREATE userss
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const userPassword = await bcrypt.hash('User123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@f1.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const regularUser = await prisma.user.create({
    data: {
      email: 'fan@f1.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Users created');

  // CREATE drivers
  const driver1 = await prisma.driver.create({
    data: { name: 'Max Verstappen', nationality: 'Dutch', team: 'Red Bull Racing' },
  });

  const driver2 = await prisma.driver.create({
    data: { name: 'Lewis Hamilton', nationality: 'British', team: 'Ferrari' },
  });

  const driver3 = await prisma.driver.create({
    data: { name: 'Charles Leclerc', nationality: 'Monégasque', team: 'Ferrari' },
  });

  const driver4 = await prisma.driver.create({
    data: { name: 'Lando Norris', nationality: 'British', team: 'McLaren' },
  });

  const driver5 = await prisma.driver.create({
    data: { name: 'Carlos Sainz', nationality: 'Spanish', team: 'Williams' },
  });

  console.log('Drivers created');

  // Creating the  races
  const race1 = await prisma.race.create({
    data: {
      name: 'Monaco Grand Prix',
      circuit: 'Circuit de Monaco',
      season: 2025,
      date: '2025-05-25',
    },
  });

  const race2 = await prisma.race.create({
    data: {
      name: 'British Grand Prix',
      circuit: 'Silverstone Circuit',
      season: 2025,
      date: '2025-07-06',
    },
  });

  const race3 = await prisma.race.create({
    data: {
      name: 'Italian Grand Prix',
      circuit: 'Autodromo Nazionale Monza',
      season: 2025,
      date: '2025-09-07',
    },
  });

  console.log('Races created');

  // Creating the predictions
  await prisma.prediction.create({
    data: {
      userId: regularUser.id,
      raceId: race1.id,
      predictedFirstId: driver1.id,
      predictedSecondId: driver2.id,
      predictedThirdId: driver3.id,
    },
  });

  await prisma.prediction.create({
    data: {
      userId: regularUser.id,
      raceId: race2.id,
      predictedFirstId: driver4.id,
      predictedSecondId: driver1.id,
      predictedThirdId: driver5.id,
    },
  });

  await prisma.prediction.create({
    data: {
      userId: admin.id,
      raceId: race3.id,
      predictedFirstId: driver2.id,
      predictedSecondId: driver3.id,
      predictedThirdId: driver1.id,
    },
  });

  console.log('Predictions created');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });