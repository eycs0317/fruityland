// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

async function couponSearch(couponCode: string) {
  // find records in db

  const couponSearch = await prisma.coupon.findUnique({
    where: {
      couponCode: couponCode,
    },
  });
  return couponSearch;
}

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const {searchParams} = new URL(req.url);
      const couponCode = searchParams.get('couponCode');

      if (!couponCode) {
        return NextResponse.json({
          error: 'Need coupon code to query.'
        }, {
          status: 400
        });
      }

      const rsvpSearch = await couponSearch(couponCode);

      if (rsvpSearch) {
        return NextResponse.json({
          message: 'Coupon code found.',
          data: rsvpSearch,
        }, {
          status: 200
        });
      } else {
        return NextResponse.json({
          message: 'Coupon code not found.',
        }, {
          status: 400
        });
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
