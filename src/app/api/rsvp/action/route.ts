// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode');
      const actionModify = data.get('btModify');
      const actionCancel = data.get('btCancel');

      if (actionModify) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
        return response;
      } else if (actionCancel) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/cancel?cc=' + couponCode));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
    return response;
  }
}
