// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

async function checkInCoupon(couponCode: string) {
  const couponSearch = await prisma.coupon.update({
    where: {
      couponCode: couponCode,
    },
    data: {
      status: 2,
    },
  });
  return couponSearch;
}

export async function POST(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode');
      if (typeof couponCode === 'string') {
        const couponResult = await checkInCoupon(couponCode);
        if (couponResult) {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + couponCode + '&status=checkedIn'));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + couponCode));
          return response;
        }
      } else {
        return NextResponse.redirect(new URL(siteURL + '/'));
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/'));
    return response;
  }
}
