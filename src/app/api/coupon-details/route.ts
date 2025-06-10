// src/app/api/coupon-details/route.ts
import { NextResponse } from 'next/server';
import { getScheduleDetailsByCouponCode } from '@/utils/getScheduleDetailsByCouponCode'; // Adjust path if necessary
// Import formatInTimeZone from date-fns-tz
// import { formatInTimeZone } from 'date-fns-tz';
// import { formatUtcDateToMMDD} from'@/utils/formatUtcDateToMMDD'

// Define the target timezone for display
// const HONG_KONG_TIMEZONE = 'Asia/Hong_Kong'; // Consistent IANA timezone identifier

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const couponCode = searchParams.get('cc');

  if (!couponCode) {
    return NextResponse.json(
      { success: false, message: 'Coupon code is required.' },
      { status: 400 }
    );
  }

  try {
    const result = await getScheduleDetailsByCouponCode(couponCode);

    if (result.success && result.data) {
      const scheduleData = result.data;
  //     console.log('---------result.date ---------', scheduleData);
  // console.log('---------scheduleData.sessionDateTime ---------', scheduleData.sessionDateTime);
      // Format the date and time explicitly in Hong Kong Time
      // const formattedDate = formatInTimeZone(
      //   scheduleData.sessionDateTime, // Your UTC Date object from Prisma
      //   HONG_KONG_TIMEZONE,           // Target timezone
      //   'PPPP'                        // Date format string (e.g., "Monday, June 10, 2025")
      // );
  //     const formattedDate = formatUtcDateToMMDD(scheduleData.sessionDateTime.toISOString());
  // console.log('---------formattedDate ---------', formattedDate);
  //     const formattedTime = formatInTimeZone(
  //       scheduleData.sessionDateTime, // Your UTC Date object from Prisma
  //       HONG_KONG_TIMEZONE,           // Target timezone
  //       'p'                           // Time format string (e.g., "1:30 PM")
  //     );

      return NextResponse.json({
        success: true,
        data: {
          couponCode: couponCode,
          date: scheduleData.sessionDateTime,
          time: scheduleData.sessionDateTime,
          group: scheduleData.group,
          uid: scheduleData.uid,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to retrieve coupon schedule details.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('API Error in /api/coupon-details:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}

