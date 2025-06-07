// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

function generateCalendar() {
  const slots = [];
  const startDate = new Date(Date.UTC(2025, 6, 10, 6, 0, 0)); // July 10, 2025 @ 6:00 AM UTC

  const weekdaySessions = [
    [6, 0], [6, 30], [7, 0], [7, 30],
    // break 8–9
    [9, 0], [9, 30], [10, 0], [10, 30], [11, 0], [11, 30],
  ];

  const weekendSessions = [
    [4, 0], [4, 30], [5, 0], [5, 30], [6, 0], [6, 30], [7, 0], [7, 30],
    // break 8–9
    [9, 0], [9, 30], [10, 0], [10, 30], [11, 0], [11, 30],
  ];

  const SLOTS_PER_SESSION = 10;
  let groupNumber = 1;

  for (let week = 0; week < 8; week++) {
    const weekStartDate = new Date(startDate);
    weekStartDate.setUTCDate(startDate.getUTCDate() + week * 7);

    // Weekday group
    const weekdayDays = week === 0 ? 2 : 5; // Special case for week 1 (Thu–Fri)
    for (let day = 0; day < weekdayDays; day++) {
      const currentDate = new Date(weekStartDate);
      currentDate.setUTCDate(currentDate.getUTCDate() + day);

      for (const [hour, minute] of weekdaySessions) {
        const sessionTime = new Date(currentDate);
        sessionTime.setUTCHours(hour, minute, 0, 0);

        for (let slot = 0; slot < SLOTS_PER_SESSION; slot++) {
          slots.push({
            sessionDateTime: new Date(sessionTime),
            group: groupNumber,
            isWeekend: false,
          });
        }
      }
    }

    groupNumber++;

    // Weekend group
    for (let day = weekdayDays; day < weekdayDays + 2; day++) {
      const currentDate = new Date(weekStartDate);
      currentDate.setUTCDate(currentDate.getUTCDate() + day);

      for (const [hour, minute] of weekendSessions) {
        const sessionTime = new Date(currentDate);
        sessionTime.setUTCHours(hour, minute, 0, 0);

        for (let slot = 0; slot < SLOTS_PER_SESSION; slot++) {
          slots.push({
            sessionDateTime: new Date(sessionTime),
            group: groupNumber,
            isWeekend: true,
          });
        }
      }
    }

    groupNumber++;
  }
  return slots;
}

async function createCalendarRecord() {
  const recordCount = await prisma.schedule.count();

  if (recordCount === 0) {

    const calendar = generateCalendar();

    // create records in db
    const calendarCreate = await prisma.schedule.createMany({
      data: calendar,
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
        const calendarData = await createCalendarRecord();

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
