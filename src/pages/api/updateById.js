import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        prisma.employees.update({
            where: {id: req.body.id},
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                job_title: req.body.job_title,
                birth_date: new Date(req.body.birth_date),
                hire_date: new Date(req.body.hire_date),
                phone_number: req.body.phone_number,
                salary: req.body.salary,
            }
          })
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