// nextjs
import {NextResponse, NextRequest} from 'next/server';

// utils
import {cancelReservation} from '@/utils/cancelReservation';
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode') as string;
      const btConfirmCancel = data.get('btConfirmCancel');
      const btBack = data.get('btBack');

      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + couponCode));
        return response;
      } else if (btConfirmCancel) {
        cancelReservation(couponCode);

        const response = NextResponse.redirect(new URL(siteURL + '/?message=S0004'));
        return response;
      }
    }
    catch {
      const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
      return response;
    }
  }
}
