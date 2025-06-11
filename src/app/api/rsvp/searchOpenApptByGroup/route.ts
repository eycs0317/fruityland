// src/app/api/rsvp/searchOpenApptByGroup/route.ts
import { NextResponse } from 'next/server';
// prisma
import {prisma} from '@/lib/prisma'; // Import Prisma for types
import { parseISO} from 'date-fns'; // date-fns utilities

// Initialize Prisma Client (ensure this is a singleton instance if used elsewhere)


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupParam = searchParams.get('group');
  const dateParam = searchParams.get('date'); // 'YYYY-MM-DD' from the client
console.log('dateParam ------- ', dateParam)// 2025-07-10
console.log('groupParam ------- ', groupParam)// 1

  // Validate group parameter
  if (!groupParam) {
    return NextResponse.json({ message: 'Group parameter is required' }, { status: 400 });
  }
  const group = parseInt(groupParam, 10); //convert the string to integar
  if (isNaN(group)) {
    return NextResponse.json({ message: 'Invalid group parameter' }, { status: 400 });
  }

  // Define the type
  const whereClause: {
    group: number;
    isBooked: boolean;
    sessionDateTime?: {
      gte: Date;
      lte: Date;
    };
  } = {
    group: group,
    isBooked: false, // Only fetch appointments that are not yet booked
  };

  // If a date parameter is provided, filter by that specific day in UTC
  if (dateParam) {
    // Parse the 'YYYY-MM-DD' string. parseISO will interpret this as midnight
    // in the local timezone where the server is running.
    const localParsedDate = parseISO(dateParam);
  console.log('------localParsedDate------', localParsedDate)// 2025-07-10
    if (isNaN(localParsedDate.getTime())) {
      return NextResponse.json({ message: 'Invalid date parameter format. Expected YYYY-MM-DD.' }, { status: 400 });
    }

    // --- CRUCIAL CHANGE FOR UTC BOUNDARIES ---
    // Construct the start of the day in UTC for the given date.
    // We create a new Date object based on the YYYY, MM, DD components of localParsedDate,
    // but we use UTC methods to set the time to 00:00:00.000Z
    const startOfDayUtc = new Date(Date.UTC(
      localParsedDate.getFullYear(),
      localParsedDate.getMonth(),
      localParsedDate.getDate(),
      0, 0, 0, 0
    ));
  console.log('searchOpenApptByGroup startOfDayUtc ------- ', startOfDayUtc)// 2025-07-10T00:00:00.000Z
    // The end of the day in UTC is just before midnight of the next UTC day.
    const endOfDayUtc = new Date(Date.UTC(
      localParsedDate.getFullYear(),
      localParsedDate.getMonth(),
      localParsedDate.getDate(),
      23, 59, 59, 999
    ));
    console.log('searchOpenApptByGroup endOfDayUtc ------- ', endOfDayUtc)// 2025-07-10T23:59:59.999Z
    // Alternatively, you could add one day to startOfDayUtc and subtract a millisecond.
    // const endOfDayUtc = new Date(startOfDayUtc.getTime() + 24 * 60 * 60 * 1000 - 1);


    whereClause.sessionDateTime = {
      gte: startOfDayUtc, // Start of the day in UTC (e.g., 2025-07-10T00:00:00.000Z)
      lte: endOfDayUtc,   // End of the day in UTC (e.g., 2025-07-10T23:59:59.999Z)
    };
    // --- END CRUCIAL CHANGE ---

  } else {
    // If dateParam is missing, log a warning or return an error if a date is strictly required
    console.warn("Date parameter is missing in searchOpenApptByGroup API call. Returning all available slots for the group.");
    // Optionally, you might want to throw an error here if a date *must* always be present.
    // return NextResponse.json({ message: 'Date parameter is required for filtering.' }, { status: 400 });
  }

  try {
    // Fetch schedules from the database based on the constructed where clause
    const appointments = await prisma.schedule.findMany({
      where: whereClause, // Using the strongly typed whereClause
      orderBy: {
        sessionDateTime: 'asc', // Order by time for consistent grouping
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching open appointments by group (filtered by date):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}