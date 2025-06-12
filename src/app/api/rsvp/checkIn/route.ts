// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {checkInCoupon} from '@/utils/checkInCoupon';
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

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
