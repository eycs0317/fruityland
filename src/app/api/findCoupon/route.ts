export const runtime = 'nodejs';  // for session

// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

async function getCouponDetails(couponCode: string) {
  const couponSearch = await prisma.coupon.findUnique({
    where: {
      couponCode: couponCode,
    },
  });
  return couponSearch;
}

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode');
      if (typeof couponCode === 'string') {
        const couponResult = await getCouponDetails(couponCode);

        if (couponResult) {
          if (couponResult.scheduleUID) {
            const response = NextResponse.redirect(new URL('/rsvp/confirmation?cc=' + data.get('couponCode'), req.url));
            return response;
          } else {
            const response = NextResponse.redirect(new URL('/rsvp/date', req.url));
            return response;
          }
        } else {
          const response = NextResponse.redirect(new URL('/', req.url));
          return response;
        }
      } else {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL('/', req.url));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL('/', req.url));
    return response;
  }
}
