import { prisma } from '@/lib/prisma';

interface Schedule {
  uid: string;
  sessionDateTime: string; // Prisma returns Date objects for DateTime fields
  group: number;
  isWeekend: boolean;
  isBooked: boolean;
  updatedAt: Date;
  createdAt: Date;
}
export async function getSchedulesByGroup(groupNumber: number | undefined): Promise<Schedule[]> { // Adjust 'any[]' to your actual Schedule type if available
  if (typeof groupNumber !== 'number' || isNaN(groupNumber)) {
    console.error("Invalid groupNumber provided to getSchedulesByGroup:", groupNumber);
    return []; // Return empty array for invalid input
  }

  try {
    const rawSchedules = await prisma.schedule.findMany({
      where: {
        group: groupNumber,
      },
      orderBy: {
        sessionDateTime: 'asc', // Order by sessionDateTime for consistent results
      },
    });


    const schedules = rawSchedules.map(s => ({
      ...s,
      sessionDateTime: s.sessionDateTime.toISOString(), // Convert Date object to ISO string
      // Ensure updatedAt and createdAt are also handled if needed, otherwise they remain Date objects in `s`
      // For this specific request, only sessionDateTime was mentioned.
    }));

    return schedules;
  } catch (error) {
    console.error(`Error fetching schedules for group ${groupNumber}:`, error);
    return []; // Return empty array on error
  }
}