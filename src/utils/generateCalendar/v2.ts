/*
  DOCUMENTATION

  v2 of generateCalendar

  Start DateTime: July 10, 2025 @ 6:00 AM UTC
  Length of event: 8 Weeks

  Each week:
   - Weekday Group (Mon–Fri):
      - 3.5 hours (4–7:30 AM UTC) - Activity Time
      - .5 hour (7:30-8 AM UTC) - Cleaning Time
      - 2 hours (8–10 AM UTC) - Activity Time
      - .5 hour (10-10:30 AM UTC) - Cleaning Time
      - 1.5 hours (10:30–12 PM UTC) - Activity Time
      TOTAL = 14 half-hour session per day for 5 days
   - Weekend Group (Sat–Sun):
      - 3.5 hours (4–7:30 AM UTC) - Activity Time
      - .5 hour (7:30-8 AM UTC) - Cleaning Time
      - 2 hours (8–10 AM UTC) - Activity Time
      - .5 hour (10-10:30 AM UTC) - Cleaning Time
      - 1.5 hours (10:30–12 PM UTC) - Activity Time
      TOTAL = 14 half-hour session per day for 2 days

  Group Numbers: start at 1, increment by 1 for each weekday/weekend in order
    Week 1:
      Weekday - Group 1 
      Weekend - Group 2
    Week 2:
      Weekday - Group 3 
      Weekend - Group 4
    ...etc

  Adjustment for week 1 due to the start date being on Thursday (July 10).

  Number of generated coupon: 7,420
   - Number of week: 8
   - Number of days per week: 7 days, except for week 1 (4 days)
   - Total number of days for event: 53 days
   - Number of sessions per day: 14
   - Total number of sessions for event: 14 weekend sessions x 53 days = 742 sessions
   - Number of slots per session: 10
   - Total number of slots: 742 sessions x 10 slots = 7,420
*/

// prisma
import {prisma} from '@/lib/prisma';

function generateCalendar() {
  const slots = [];
  const actualStartDate = new Date(Date.UTC(2025, 6, 10, 4, 0, 0)); // July 10, 2025 @ 4:00 AM UTC

  const dailySessions = [
    [4, 0], [4, 30], [5, 0], [5, 30], [6, 0], [6, 30], [7, 0],
    [8, 0], [8, 30], [9, 0], [9, 30],
    [10, 30], [11, 0], [11, 30],
  ];

  const SLOTS_PER_SESSION = 10;
  let groupNumber = 1;

  // Week 1 weekday group: July 10–11 (Thu–Fri)
  for (let dayOffset = 0; dayOffset < 2; dayOffset++) {
    const dayDate = new Date(actualStartDate);
    dayDate.setUTCDate(actualStartDate.getUTCDate() + dayOffset);

    for (const [hour, minute] of dailySessions) {
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

    for (const [hour, minute] of dailySessions) {
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

      for (const [hour, minute] of dailySessions) {
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

      for (const [hour, minute] of dailySessions) {
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

export async function createCalendarRecord() {
  const recordCount = await prisma.schedule.count();

  if (recordCount === 0) {
    const calendar = generateCalendar();

    const calendarCreate = await prisma.schedule.createMany({
      data: calendar,
    });
    return calendarCreate;
  } else {
    const calendarCreate = { count: 0 };
    return calendarCreate;
  }
}
