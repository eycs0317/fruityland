// prisma
import { prisma } from '@/lib/prisma';

export async function getEventMinMaxDate() {
  try {
    const result = await prisma.schedule.aggregate({
      _min: {
        sessionDateTime: true,
      },
      _max: {
        sessionDateTime: true,
      },
    });

    return {
      startDate: result._min.sessionDateTime,
      endDate: result._max.sessionDateTime,
    };
  } catch (error) {
    console.error(`[getEventMinMaxDate] Error fetching all record:`, error);
    return { startDate: null, endDate: null };
  }
}