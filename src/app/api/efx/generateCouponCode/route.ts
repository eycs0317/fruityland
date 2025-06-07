// nextjs
import {NextRequest, NextResponse} from 'next/server';

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

async function generateCouponCode() {
  const recordCount = await prisma.coupon.count();

  if (recordCount === 0) {
    const totalWeek = 8;

    const coupons = [];
    for (let i = 0; i < totalWeek; i++) {
      if (i==0) {
        const couponWeekday = generateWeekday(2, ((i*2)+1), i);
        coupons.push(...couponWeekday);
      } else {
        const couponWeekday = generateWeekday(5, ((i*2)+1), i);
        coupons.push(...couponWeekday);
      }
      const couponWeekend = generateWeekend(2, ((i*2)+2), i);
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

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.json();

      if (data.btGenerateCouponCode) {
        const couponCodeData = await generateCouponCode();

        if (couponCodeData.count === 0) {
          return NextResponse.json({
            message: 'Coupon code data generated successfully.',
            redirect: '/efx/confirmation?type=couponCode&count=' + couponCodeData.count,
          }, {
            status: 200
          });
        } else {
          return NextResponse.json({
            message: 'Coupon code data not generated.',
            redirect: '/efx/confirmation?type=couponCode&count=' + couponCodeData.count,
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
