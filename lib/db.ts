import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// If it is the first time store the instance in globalThis
export const db = globalThis.prisma || new PrismaClient();

// If env is not production check globalThis for prisma db instance
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
