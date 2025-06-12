/*
  DOCUMENTATION

  v1 of generateCalendar

  Start DateTime: July 10, 2025 @ 6:00 AM UTC
  Length of event: 8 Weeks

  Each week:
   - Weekday Group (Mon–Fri):
      - 2 hours (6–8 AM UTC) - Activity Time
      - 1 hour (8-9 AM UTC) - Cleaning Time
      - 3 hours (9–12 PM UTC) - Activity Time
      TOTAL = 10 half-hour session per day for 5 days
   - Weekend Group (Sat–Sun):
      - 4 hours (4–8 AM UTC) - Activity Time
      - 1 hour (8-9 AM UTC) - Cleaning Time
      - 3 hours (9–12 PM UTC) - Activity Time
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

  Number of generated coupon: 5,940
   - Number of week: 8
   - Number of weekday per week: 5 days, except for week 1 (2 days)
   - Number of weekend per week: 2 days
   - Total number of weekday for event: 37 days
   - Total number of weekend for event: 16 days
   - Number of sessions per weekday: 10
   - Number of sessions per weekend: 14
   - Total number of weekday sessions for event: 10 weekday sessions x 37 days = 370 sessions 
   - Total number of weekend sessions for event: 14 weekend sessions x 16 days = 224 sessions 
   - Total number of sessions for event: 370 + 224 = 594
   - Number of slots per session: 10
   - Total number of slots: 594 sessions x 10 slots = 5,940
*/

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

export async function createCalendarRecord() {
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
