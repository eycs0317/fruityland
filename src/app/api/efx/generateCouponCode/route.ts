// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {generateCouponCode} from '@/utils/generateCouponCode/v2';

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
