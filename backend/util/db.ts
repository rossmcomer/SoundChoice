const { PrismaClient } = require ('../generated/prisma');

const prisma = new PrismaClient();

const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (err) {
    console.log('Failed to connect to the database', err);
    process.exit(1);
  }
};

const disconnectFromDatabase = async () => {
  await prisma.$disconnect()
};

export { prisma, connectToDatabase, disconnectFromDatabase };
