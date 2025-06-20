// // prisma
// import { PrismaClient } from '../../generated/prisma/client';

// export const prisma = new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });







// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Declare a global variable for PrismaClient
// This prevents multiple instances of PrismaClient in development,
// which can happen with Next.js hot-reloading.
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Check if we are in a production environment
// In production, we always create a new instance.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, we use a global variable to prevent multiple instances
  // due to Next.js hot-reloading.
  // If `global.prisma` is not set, create a new instance and assign it.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  // If `global.prisma` is already set, reuse it.
  prisma = global.prisma;
}

export { prisma };
