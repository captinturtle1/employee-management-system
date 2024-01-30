import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
  return new Promise(resolve => {
    const lastThreeYears = new Date();
    lastThreeYears.setFullYear(lastThreeYears.getFullYear() - 3);

    prisma.employees.findMany({})
    .then(async response => {
      let output = [
        { range: "0 - 60K", count: 0 },
        { range: "60K - 90K", count: 0 },
        { range: "90K - 120K", count: 0 },
        { range: "120K+", count: 0 }
      ];

      for (let i = 0; i < response.length; i++) {
        if (response[i].salary < 60000) {
            output[0].count++;
        } else if (response[i].salary < 90000) {
            output[1].count++;
        } else if (response[i].salary < 120000) {
            output[2].count++;
        } else {
            output[3].count++;
        }
      }

      
      res.json({status: 200, body: output});
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