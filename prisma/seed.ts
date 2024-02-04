import { roles } from '@/constants/seed'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  try {
    await prisma.role.createMany({
      data: roles,
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
