import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
  return new Promise(resolve => {
    const lastThreeYears = new Date();
    lastThreeYears.setFullYear(lastThreeYears.getFullYear() - 3);

    prisma.employees.findMany({
        where: { hire_date: { gte: lastThreeYears }},
        orderBy: { hire_date: 'desc' }
    })
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