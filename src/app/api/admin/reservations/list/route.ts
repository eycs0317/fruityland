// src/app/api/admin/reservations/list/route.ts
import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';
// Import date-fns-tz for timezone-aware parsing and conversion
import {  fromZonedTime } from 'date-fns-tz';
import {parseISO} from 'date-fns';
// import { APP_DISPLAY_TIMEZONE } from '@/utils/timezoneUtils'; // Import your timezone constant



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date'); // 'YYYY-MM-DD' in APP_DISPLAY_TIMEZONE
  const timezoneParam = searchParams.get('timezone'); // 'YYYY-MM-DD' in APP_DISPLAY_TIMEZONE

  if (!dateParam) {
    return NextResponse.json({ message: 'Date parameter is required.' }, { status: 400 });
  }
  if (!timezoneParam) {
    return NextResponse.json({ message: 'Timezone parameter is required.' }, { status: 400 });
  }

  // --- UTC Date Range Calculation based on APP_DISPLAY_TIMEZONE ---
  const dateInAppDisplayTimezone = parseISO(dateParam);
  if (isNaN(dateInAppDisplayTimezone.getTime())) {
    return NextResponse.json({ message: 'Invalid date format provided.' }, { status: 400 });
  }

  const startOfDayInAppDisplayTimezone = new Date(
    dateInAppDisplayTimezone.getFullYear(),
    dateInAppDisplayTimezone.getMonth(),
    dateInAppDisplayTimezone.getDate(),
    0, 0, 0, 0
  );
  const startOfDayUtc = fromZonedTime(startOfDayInAppDisplayTimezone, timezoneParam);

  const endOfDayInAppDisplayTimezone = new Date(
    dateInAppDisplayTimezone.getFullYear(),
    dateInAppDisplayTimezone.getMonth(),
    dateInAppDisplayTimezone.getDate(),
    23, 59, 59, 999
  );
  const endOfDayUtc = fromZonedTime(endOfDayInAppDisplayTimezone, timezoneParam);

  console.log(`API: Received date for filtering: ${dateParam}`);
  console.log(`API: Calculated UTC range for query: GTE ${startOfDayUtc.toISOString()} LTE ${endOfDayUtc.toISOString()}`);
  // --- End UTC Date Range Calculation ---

  try {
    // --- CRUCIAL CHANGE: Querying the Schedule model directly ---
    // Find Schedule entries that are booked and fall within the date range
    const bookedSchedules = await prisma.schedule.findMany({
      where: {
        isBooked: true, // Only interested in slots marked as booked
        sessionDateTime: {
          gte: startOfDayUtc,
          lte: endOfDayUtc,
        },
      },
      // Include the related Coupon data for each booked Schedule
      // Since Coupon has a unique scheduleUID, Prisma will automatically link them.
      include: {
        coupon: true, // Assuming the relation field on Schedule pointing to Coupon is named 'coupon'
                      // If it's not named 'coupon', adjust this to the correct relation name.
      },
      orderBy: {
        sessionDateTime: 'asc', // Order by the schedule's time
      },
    });
    // --- END CRUCIAL CHANGE ---

    // Map the results to match the expected format for the client's `ReservationData` interface.
    // Each `bookedSchedule` object now contains a `coupon` property (which might be null if no coupon is linked).
    const formattedReservations = bookedSchedules.map(schedule => ({
      // Use Schedule's UID as the primary UID for the reservation list entry.
      // This refers to the schedule slot that is booked.
      uid: schedule.uid, // The Schedule UID

      // Data from the linked Coupon (if it exists)
      couponCode: schedule.coupon?.couponCode || 'N/A', // Get couponCode from the related coupon
      // status: schedule.coupon?.status?.toString() || 'N/A', // Get status from the related coupon
      status: schedule.coupon?.status ?? 0,
      group: schedule.group, // Group is directly on Schedule
      sessionDateTime: schedule.sessionDateTime.toISOString(), // SessionDateTime is directly on Schedule (in UTC)
    }));

    return NextResponse.json(formattedReservations, { status: 200 });
  } catch (error) {
    console.error('API Error in /api/admin/reservations/list (querying Schedule for bookings):', error);
    return NextResponse.json(
      { message: 'Internal server error while fetching booked schedules.' },
      { status: 500 }
    );
  } finally {
    // In Next.js App Router route handlers, Prisma handles connection pooling automatically.
  }
}
