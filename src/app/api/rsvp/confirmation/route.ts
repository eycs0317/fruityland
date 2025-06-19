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
      const terms = data.get('terms');
      const waiver = data.get('waiver');
      const btSchedule = data.get('btSchedule');
      const btBack = data.get('btBack');

      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time'));
        return response;
      } else if (btSchedule) {

        const session = await getSession();

        session.legal = session.legal ?? { terms: false, waiver: false };
        session.legal.terms = terms === 'terms';
        session.legal.waiver = waiver === 'waiver';
        await session.save();
        if (terms != 'terms') {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/review?message=M0001'));
          return response;
        }
        if (waiver != 'waiver') {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/review?message=M0002'));
          return response;
        }

        if (session.coupon && session.schedule) {
          console.log('******************************inside im here',)
          const result = await createReservation({
            couponCode: session.coupon.couponCode as string,
            rsvpTime: session.schedule.uid as string,
          });

          console.log('******************************result', result)

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
