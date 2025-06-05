// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

function generateRandomHexCode(digits: number) {
  return Math.floor(Math.random() * 0x10000)
    .toString(16)
    .padStart(digits, '0')
    .slice(-digits);
}

async function generateCouponCode() {
  const recordCount = await prisma.coupon.count();

  if (recordCount === 0) {
    // coupon code config
    const slotsPerSession = 10;
    const sessionsPerDay = 8;
    const slotsPerDay = slotsPerSession * sessionsPerDay;
    const daysPerWeek = 7;
    const weeksPerGroup = 4;
    const totalGroup = 2; 
    const totalSlots = daysPerWeek * weeksPerGroup * totalGroup * slotsPerDay;

    // create coupon code array
    const couponCodeRaw: string[] = [];
    const couponWeekRaw: number[] = [];
    for (let i = 0; i < totalSlots; i++) {
      const week = Math.floor(i / (slotsPerDay * daysPerWeek)) + 1;

      const section1 = 'cc';
      const section2 = generateRandomHexCode(4);
      let section3 = '';
      switch (week) {
        case 1: section3 = '1E33'; break;
        case 2: section3 = '1E34'; break;
        case 3: section3 = '1E35'; break;
        case 4: section3 = '1E36'; break;
        case 5: section3 = '1E37'; break;
        case 6: section3 = '1E38'; break;
        case 7: section3 = '1E39'; break;
        case 8: section3 = '1E3A'; break;
      }
      const section4 = generateRandomHexCode(2);
      const couponCode = section1 + section2 + section3 + section4;
      couponCodeRaw.push(couponCode.toUpperCase());
      couponWeekRaw.push(week);
    }

    // convert array to object
    const couponCodeData = couponCodeRaw.map((code, index) => ({
      couponCode: code,
      couponWeek: couponWeekRaw[index],
    }));

    // create records in db
    const couponCodeCreate = await prisma.coupon.createMany({
      data: couponCodeData,
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
