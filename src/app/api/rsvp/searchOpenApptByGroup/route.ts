// src/app/api/rsvp/searchOpenApptByDay/route.ts

// prisma
import {prisma} from '@/lib/prisma';


// nextjs
import {NextResponse} from 'next/server'; // Keep this import
import type { NextRequest } from 'next/server'; // Import NextRequest to access URL params

export async function GET(request: NextRequest) {
  try {
    // Access query parameters from request.nextUrl.searchParams
    // const date = request.nextUrl.searchParams.get('date');
    const group = request.nextUrl.searchParams.get('group');

    // console.log('------------------Searching for open appointments on group:--------------', group);
    // if (!date || !group) {
    //   return NextResponse.json({error: 'Date is required'}, {status: 400});
    // }


    // const [year, month, day] = date.split('-').map(Number);
    // const startOfDayUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    // const endOfDayUTC = new Date(Date.UTC(year, month - 1, day + 1, 0, 0, 0)); // Midnight UTC of the next day
    // endOfDayUTC.setDate(startOfDayUTC.getDate() + 1);

    // console.log('Searching appointments from:', startOfDayUTC.toISOString());
    // console.log('Searching appointments until (exclusive):', endOfDayUTC.toISOString());

    const appointments = await prisma.schedule.findMany({
      where: {
        group: {
          equals: Number(group)
        },
        isBooked: false
      },
      orderBy: {
        sessionDateTime: 'asc'
      },
    });

    // console.log(`-----------Found ${appointments.length} open appointments for ${date} -----------`);
    // console.log('-----------Appointments Data:-----------', appointments);

    return NextResponse.json(appointments, { status: 200 });

  }  catch (error) {
    console.error('Error in searchOpenApptByDay API Route:', error);
    return NextResponse.json({
      error: (error as Error).message || 'Something went wrong'
    }, {
      status: 500,
    });
  }
}