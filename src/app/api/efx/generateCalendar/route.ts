// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

function generateCalendar() {
  const slots = [];
  const actualStartDate = new Date(Date.UTC(2025, 6, 10, 6, 0, 0)); // July 10, 2025

  const weekdaySessions = [
    [6, 0], [6, 30], [7, 0], [7, 30],
    [9, 0], [9, 30], [10, 0], [10, 30], [11, 0], [11, 30],
  ];

  const weekendSessions = [
    [4, 0], [4, 30], [5, 0], [5, 30], [6, 0], [6, 30], [7, 0], [7, 30],
    [9, 0], [9, 30], [10, 0], [10, 30], [11, 0], [11, 30],
  ];

  const SLOTS_PER_SESSION = 10;
  let groupNumber = 1;

  // Week 1 weekday group: July 10–11 (Thu–Fri)
  for (let dayOffset = 0; dayOffset < 2; dayOffset++) {
    const dayDate = new Date(actualStartDate);
    dayDate.setUTCDate(actualStartDate.getUTCDate() + dayOffset);

    for (const [hour, minute] of weekdaySessions) {
      const sessionTime = new Date(dayDate);
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

  // Week 1 weekend group: July 12–13 (Sat–Sun)
  for (let dayOffset = 2; dayOffset < 4; dayOffset++) {
    const dayDate = new Date(actualStartDate);
    dayDate.setUTCDate(actualStartDate.getUTCDate() + dayOffset);

    for (const [hour, minute] of weekendSessions) {
      const sessionTime = new Date(dayDate);
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

  // Remaining weeks: Week 2 to Week 8
  const remainingStart = new Date(Date.UTC(2025, 6, 14)); // Monday, July 14
  for (let week = 0; week < 7; week++) {
    const weekBase = new Date(remainingStart);
    weekBase.setUTCDate(remainingStart.getUTCDate() + week * 7);

    // Weekday group: Mon–Fri
    for (let d = 0; d < 5; d++) {
      const dayDate = new Date(weekBase);
      dayDate.setUTCDate(weekBase.getUTCDate() + d);

      for (const [hour, minute] of weekdaySessions) {
        const sessionTime = new Date(dayDate);
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

    // Weekend group: Sat–Sun
    for (let d = 5; d < 7; d++) {
      const dayDate = new Date(weekBase);
      dayDate.setUTCDate(weekBase.getUTCDate() + d);

      for (const [hour, minute] of weekendSessions) {
        const sessionTime = new Date(dayDate);
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
        message: 'Invalid data format',
      }, {
        status: 400
      });
    }
  } else {
    return NextResponse.json({
      message: `Method ${req.method} Not Allowed`,
    }, {
      status: 405
    });
  }
}
