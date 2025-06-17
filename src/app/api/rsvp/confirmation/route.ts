// nextjs
import {NextRequest, NextResponse} from 'next/server';

// session
import {getSession} from '@/lib/session';

// utils
import {createReservation} from '@/utils/createReservation';
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const btSchedule = data.get('btSchedule');
      const btBack = data.get('btBack');

      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time'));
        return response;
      } else if (btSchedule) {
        const session = await getSession();
        if (session.coupon && session.schedule) {
          const result = await createReservation({
            couponCode: session.coupon.couponCode as string,
            rsvpTime: session.schedule.uid as string,
          });

          if (!result.success) {
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time?message=E0010'));
            return response;
          } else {
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + session.coupon.couponCode));
            return response;
          }
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
          return response;
        }
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time?message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
    return response;
  }
}
