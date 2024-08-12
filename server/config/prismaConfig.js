import { PrismaClient } from '@prisma/client'

const global = {
  // Allow use of global variables in TypeScript
  cachedPrisma:PrismaClient | undefined
}

const prisma = global.cachedPrisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.cachedPrisma = prisma
}

export const db = prisma