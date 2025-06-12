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
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + couponCode + '&status=checkedIn&message=S0005'));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + couponCode + '&message=E0007'));
          return response;
        }
      } else {
        return NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
    return response;
  }
}
