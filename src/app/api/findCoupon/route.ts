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
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode');

      if (typeof couponCode === 'string') {
        const couponResult = await getCouponDetails(couponCode);

  // 1.If coupon is found && coupon.isrsvp = true
  // store the couponCode in session,
  // redirect to confirmation or date page
  // else redirect to home page
        if (couponResult) {
          if (couponResult.scheduleUID) {
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + data.get('couponCode')));
            return response;
          } else {
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
            return response;
          }
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/'));
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
