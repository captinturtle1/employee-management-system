import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
  return new Promise(async resolve => {

    try {
        let min = await prisma.employees.aggregate({
            _min: { salary: true }
        })

        let max = await prisma.employees.aggregate({
            _max: { salary: true }
        })

        let avg = await prisma.employees.aggregate({
            _avg: { salary: true }
        })

        let output = {
            min: `$${min._min.salary}`,
            max: `$${max._max.salary}`,
            avg: `$${Math.round(avg._avg.salary * 100) / 100}`
        }

        res.json({status: 200, body: output});
        await prisma.$disconnect()
        resolve();
    } catch(e) {
        console.log(e);
        res.json({status: 500});
        await prisma.$disconnect()
        resolve();
    }
  });
}