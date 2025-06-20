

import { prisma } from '@/lib/prisma';
import { addDays } from 'date-fns'; // Used for easily adding days
import { getSession } from '@/lib/session';
interface SessionDetail {
  uid: string;
  sessionDateTime: Date;
  sessionDateTimetoISO: string // Changed to string to store ISO 8601 string
  group: number;
  isWeekend: boolean;
  isBooked: boolean;
}

export async function getEventSessionsBySelectedDate(dateString: string | undefined, durationDays: number = 2): Promise<SessionDetail[]> {

  const session = await getSession();
  const sessionGroup = session.coupon?.group ?? 0;


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

// const newRawSessions = rawSessions.map(s => {
//   return {...s, sessionDateTimetoISO: s.sessionDateTime.toISOString()}
// })


    // Extract just the Date objects from the Prisma results
    const sessions: SessionDetail[] = rawSessions.map(s => ({
      uid: s.uid,
      sessionDateTime: s.sessionDateTime,
      sessionDateTimetoISO: s.sessionDateTime.toISOString(), // Convert Date object to ISO string
      group: s.group,
      isWeekend: s.isWeekend,
      isBooked: s.isBooked,
    }));
    // add filter by group
const sessionsByGroup = sessions.filter(session => session.group === sessionGroup);

    return sessionsByGroup;

  } catch (error) {
    console.error(`Error fetching sessions for date string "${dateString}":`, error);
    return []; // Return empty array on error
  }
}