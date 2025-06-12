/*
  DOCUMENTATION

  v2 of generateCouponCode

  Format of Coupon Code: NNXX-XXXX
   - NN = Weekday(D) or Weekend(E) + Week Number
      - D1 - Weekday and Week 1
      - E1 - Weekend and Week 1
      - D2 - Weekday and Week 2
      - E1 - Weekend and Week 2
      ...etc
   - XX-XXXX = Randomized Generated Hex code

  Number of generated coupon: 8,910
   - Number of week: 8
   - Number of weekday per week: 5 days, except for week 1 (2 days)
   - Number of weekend per week: 2 days
   - Total number of weekday for event: 37 days
   - Total number of weekend for event: 16 days
   - Total number of days for event: 53 days
   - Number of sessions per weekday: 10
   - Number of sessions per weekend: 14
   - Total number of weekday sessions for event: 10 weekday sessions x 37 days = 370 sessions 
   - Total number of weekend sessions for event: 14 weekend sessions x 16 days = 224 sessions 
   - Total number of sessions for event: 370 + 224 = 594
   - Number of coupon per session: 15
   - Total number of coupon: 594 sessions x 15 coupons = 8,910
*/

// prisma
import {prisma} from '@/lib/prisma';

function generateRandomHexCode(digits: number) {
  return Math.floor(Math.random() * 0xFFFFFF)
    .toString(16)
    .padStart(digits, '0')
    .slice(-digits);
}

function generateWeekday(numberOfDays: number, groupNumber: number, weekNumber: number) {
  const records = [];
  const couponPerSession = 15;  // test 2
  const sessionsPerDay = 10;  // test 2
  const totalCoupon = couponPerSession * sessionsPerDay * numberOfDays;
  for (let i = 0; i < totalCoupon; i++) {
    const record = {
      couponCode: generateRandomHexCode(6) + 'd' + String(groupNumber).padStart(2, '0') + weekNumber + generateRandomHexCode(2),
      group: groupNumber,
    };
    records.push(record);
  }
  return records;
}

function generateWeekend(numberOfDays: number, groupNumber: number, weekNumber: number) {
  const records = [];
  const couponPerSession = 15;  // test 2
  const sessionsPerDay = 14;  // test 4
  const totalCoupon = couponPerSession * sessionsPerDay * numberOfDays;
  for (let i = 0; i < totalCoupon; i++) {
    const record = {
      couponCode: generateRandomHexCode(6) + 'e' + String(groupNumber).padStart(2, '0') + weekNumber + generateRandomHexCode(2),
      group: groupNumber,
      isWeekend: true,
    };
    records.push(record);
  }
  return records;
}

export async function generateCouponCode() {
  const recordCount = await prisma.coupon.count();

  if (recordCount === 0) {
    const totalWeek = 8;

    const coupons = [];
    for (let i = 0; i < totalWeek; i++) {
      if (i==0) {
        const couponWeekday = generateWeekday(2, ((i*2)+1), (i+1));
        coupons.push(...couponWeekday);
      } else {
        const couponWeekday = generateWeekday(5, ((i*2)+1), (i+1));
        coupons.push(...couponWeekday);
      }
      const couponWeekend = generateWeekend(2, ((i*2)+2), (i+1));
      coupons.push(...couponWeekend);
    }

    // create records in db
    const couponCodeCreate = await prisma.coupon.createMany({
      data: coupons,
    });
    return couponCodeCreate;
  } else {
    const couponCodeCreate = {count: 0};
    return couponCodeCreate;
  }
}
