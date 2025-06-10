// src/lib/scheduleService.ts
// prisma
import { prisma } from '@/lib/prisma';
/**
 * Interface for the date range returned by the function.
 */
interface ScheduleDateRange {
  startDate: Date | null; // Date objects are returned from Prisma
  endDate: Date | null;
}

/**
 * Fetches the minimum and maximum sessionDateTime for a given group from the database.
 *
 * @param groupNumber The group number to filter by.
 * @returns A Promise resolving to an object containing startDate and endDate (min/max sessionDateTime),
 * or nulls if no schedules are found or an error occurs.
 */
export async function getMinMaxScheduleDatesByGroup(groupNumber: number): Promise<ScheduleDateRange> {
  try {
    // Use Prisma's aggregate function to find the min and max sessionDateTime
    const result = await prisma.schedule.aggregate({
      where: {
        group: groupNumber,
      },
      _min: {
        sessionDateTime: true,
      },
      _max: {
        sessionDateTime: true,
      },
    });

    // Prisma's aggregate returns null for _min or _max if no records match the where clause
    return {
      startDate: result._min.sessionDateTime,
      endDate: result._max.sessionDateTime,
    };
  } catch (error) {
    console.error(`[getMinMaxScheduleDatesByGroup] Error fetching schedule dates for group ${groupNumber}:`, error);
    // Return nulls or throw the error, depending on how you want to handle it upstream
    return { startDate: null, endDate: null };
  }
  // Important: In Next.js with Prisma, you typically don't need to manually disconnect
  // prisma.$disconnect() after every query in API routes or Server Components.
  // Next.js handles connection pooling efficiently.
}