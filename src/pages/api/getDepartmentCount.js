import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
  return new Promise(resolve => {
    const lastThreeYears = new Date();
    lastThreeYears.setFullYear(lastThreeYears.getFullYear() - 3);

    prisma.employees.groupBy({
      by: 'job_title',
      _count: { job_title: true }
    })
    .then(async response => {
      let output = [];
      for (let i = 0; i < response.length; i++) {
        let tempObject = {
          job_title: response[i].job_title,
          count: response[i]._count.job_title
        }
        output.push(tempObject);
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