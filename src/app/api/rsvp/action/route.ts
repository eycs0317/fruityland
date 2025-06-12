// nextjs
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode');
      const actionModify = data.get('btModify');
      const actionCancel = data.get('btCancel');

      if (actionModify) {
        // Need to do modify code here.  This is placeholder
        const response = NextResponse.redirect(new URL(siteURL + '/'));
        return response;
      } else if (actionCancel) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/cancel?cc=' + couponCode));
        return response;
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
