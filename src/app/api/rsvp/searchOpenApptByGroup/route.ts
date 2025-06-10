// src/app/api/rsvp/searchOpenApptByDay/route.ts

// prisma
import {prisma} from '@/lib/prisma';


// nextjs
import {NextResponse} from 'next/server'; // Keep this import
import type { NextRequest } from 'next/server'; // Import NextRequest to access URL params

import { startOfDay, endOfDay, parseISO } from 'date-fns';
export async function GET(request: NextRequest) {
  try {
    // Access query parameters from request.nextUrl.searchParams
    // const date = request.nextUrl.searchParams.get('date');
    const groupParam = request.nextUrl.searchParams.get('group');
    const dateParam = request.nextUrl.searchParams.get('date');


      // Validate group parameter
    if (!groupParam) {
      return NextResponse.json({ message: 'Group parameter is required' }, { status: 400 });
    }
    const group = parseInt(groupParam, 10);
    if (isNaN(group)) {
      return NextResponse.json({ message: 'Invalid group parameter' }, { status: 400 });
    }


      // Define the base Prisma where clause
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

    if (dateParam) {
      const parsedDate = parseISO(dateParam); // Parse the 'YYYY-MM-DD' string (e.g., "2025-07-10")
      if (isNaN(parsedDate.getTime())) { // Check if parsing was successful
        return NextResponse.json({ message: 'Invalid date parameter format. Expected YYYY-MM-DD.' }, { status: 400 });
      }

      // Set the sessionDateTime to be within the start and end of the selected day (in UTC)
      // Prisma queries with `DateTime` fields are typically handled as UTC internally,
      // so `startOfDay` and `endOfDay` will correctly align to the start/end of the day in UTC for comparison.
      whereClause.sessionDateTime = {
        gte: startOfDay(parsedDate), // Start of the day (e.g., 2025-07-10T00:00:00.000Z)
        lte: endOfDay(parsedDate),   // End of the day (e.g., 2025-07-10T23:59:59.999Z)
      };
    } else {
      // If dateParam is missing, log a warning or return an error if a date is strictly required
      console.warn("Date parameter is missing in searchOpenApptByGroup API call. Returning all available slots for the group.");
      // Optionally, you might want to throw an error here if a date *must* always be present.
      // return NextResponse.json({ message: 'Date parameter is required for filtering.' }, { status: 400 });
    }

    try {
      // Fetch schedules from the database based on the constructed where clause
      const appointments = await prisma.schedule.findMany({
        where: whereClause,
        orderBy: {
          sessionDateTime: 'asc', // Order by time for consistent grouping
        },
        // You can add 'select' here if you only need specific fields for 'Appointment' type
        // For example: select: { uid: true, sessionDateTime: true, isBooked: true, group: true, isWeekend: true }
      });

      return NextResponse.json(appointments);
    } catch (error) {
      console.error('Error fetching open appointments by group (filtered by date):', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
} catch (error) {
    console.error('Error fetching open appointments by group:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}