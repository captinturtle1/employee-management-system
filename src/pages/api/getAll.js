import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
  return new Promise(resolve => {
    prisma.employees.findMany()
    .then(async response => {
      res.json({status: 200, body: response});
      await prisma.$disconnect()
      resolve();
    })
    .catch(async (e) => {
      console.log(e);
      res.json({status: 500});
      await prisma.$disconnect()
      resolve();
    });
  });
}