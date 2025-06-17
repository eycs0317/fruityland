import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns'; // Used for easily adding days

interface SessionDetail {
  uid: string;
  sessionDateTime: string; // Changed to string to store ISO 8601 string
  group: number;
  isWeekend: boolean;
  isBooked: boolean;
}

export async function getEventSessionsBySelectedDate(dateString: string, durationDays: number = 2): Promise<Date[]> {
  if (!dateString) {
    console.error("No dateString provided to getSessionsInPeriod.");
    return [];
  }

  const parts = dateString.split('-').map(Number);
  // Basic validation for parsed parts to ensure it's a valid date format
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    console.error("Invalid dateString format provided to getSessionsInPeriod. Expected 'YYYY-MM-DD'. Received:", dateString);
    return [];
  }

  // Construct the start date (midnight UTC) from the input YYYY-MM-DD string.
  // Date.UTC() explicitly creates a Date object based on UTC components.
  const startDateUtc = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0));

  // Calculate the end date by adding the specified durationDays to startDateUtc.
  // This defines the exclusive upper bound of our time window.
  const endDateUtc = addDays(startDateUtc, durationDays);

  console.log(`Querying sessions for UTC range based on input "${dateString}" and duration ${durationDays} days:`);
  console.log(`  Start (inclusive): ${startDateUtc.toISOString()}`);
  console.log(`  End (exclusive):   ${endDateUtc.toISOString()}`);

  try {
    const rawSessions = await prisma.schedule.findMany({
      where: {
        sessionDateTime: {
          gte: startDateUtc, // Greater than or equal to the start of the period
          lt: endDateUtc,    // Less than (exclusive) the end of the period
        },
      },
      select: {
        sessionDateTime: true,
        uid: true,
        group: true,
        isWeekend: true,
        isBooked: true
      },
      orderBy: {
        sessionDateTime: 'asc', // Order chronologically
      },
    });

    // Extract just the Date objects from the Prisma results
    const sessions: SessionDetail[] = rawSessions.map(s => ({
      uid: s.uid,
      sessionDateTime: s.sessionDateTime.toISOString(), // Convert Date object to ISO string
      group: s.group,
      isWeekend: s.isWeekend,
      isBooked: s.isBooked,
    }));

    // console.log(`Found ${sessionDateTimes.length} sessions in the ${durationDays}-day period starting from ${dateString} UTC.`);
    return sessions;

  } catch (error) {
    console.error(`Error fetching sessions for date string "${dateString}":`, error);
    return []; // Return empty array on error
  }
}