// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

async function generateCalendar() {
  const recordCount = await prisma.schedule.count();

  if (recordCount === 0) {
    // calendar config
    const slotsPerSession = 10;
    const sessionsPerDay = 8;
    const slotsPerDay = slotsPerSession * sessionsPerDay;
    const hourEachSession = 1;
    const daysPerWeek = 7;
    const weeksPerGroup = 4;
    const totalGroup = 2; 
    const totalSlots = daysPerWeek * weeksPerGroup * totalGroup * slotsPerDay;

    // First session date: date is July 10, 2025 @11:00am HKT | July 10, 2025 @3:00am UTC
    const base = new Date(Date.UTC(2025, 6, 10, 3, 0, 0));

    // create calendar array
    const calendarDataRaw: string[] = [];
    for (let i = 0; i < totalSlots; i++) {
      const dayOffset = Math.floor(i / slotsPerDay);
      const hourStep = Math.floor((i % slotsPerDay) / slotsPerSession);
      const date = new Date(base);
      date.setUTCDate(base.getUTCDate() + dayOffset);
      date.setUTCHours(3 + hourEachSession * hourStep);
      calendarDataRaw.push(date.toISOString());
    }

    // convert array to object
    const calendarData = calendarDataRaw.map(slot => ({
      slot: new Date(slot)
    }));


    // create records in db
    const calendarCreate = await prisma.schedule.createMany({
      data: calendarData,
    });
    return calendarCreate;
  } else {
    const calendarCreate = {count: 0};
    return calendarCreate;
  }
}

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.json();

      if (data.btGenerateCalendar) {
        const calendarData = await generateCalendar();

        if (calendarData.count === 0) {
          return NextResponse.json({
            message: 'Calendar data generated successfully.',
            redirect: '/efx/confirmation?type=calendar&count=' + calendarData.count,
          }, {
            status: 200
          });
        } else {
          return NextResponse.json({
            message: 'Calendar data not generated.',
            redirect: '/efx/confirmation?type=calendar&count=' + calendarData.count,
          }, {
            status: 200
          });
        }
      }
    } catch {
       return NextResponse.json({
        message: 'Invalid data format'
      }, {
        status: 400
      });
    }
  } else {
    return NextResponse.json({
      message: `Method ${req.method} Not Allowed`
    }, {
      status: 405
    });
  }
}
