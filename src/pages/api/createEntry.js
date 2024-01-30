import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        console.log(req.body)
        prisma.employees.create({ data: req.body })
          .then(async response => {
            res.status(200).json(response);
            await prisma.$disconnect()
            resolve();
          })
          .catch(async (e) => {
            console.log(e);
            res.status(500);
            await prisma.$disconnect()
            reject();
          });
    })
}