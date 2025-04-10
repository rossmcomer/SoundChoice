const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const clients = await prisma.client.findMany();
  console.log(clients);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());