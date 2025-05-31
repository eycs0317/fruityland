// import { PrismaClient } from "@prisma/client"; // not working
import { PrismaClient } from '../../generated/prisma/client';

// console.log('Prisma Client:', PrismaClient)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // Optional: Logs queries for debugging
  });
  // if (!globalForPrisma.prisma) {
  //   console.log('Prisma Client Initialized');
  // }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
