// nextjs
import {NextRequest, NextResponse} from 'next/server';

// session
import {getSession} from '@/lib/session';

// utils
import {getSiteURL} from '@/utils/getSiteURL';
import {getScheduleDetails} from '@/utils/getScheduleDetails';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const rsvpTime = data.get('rsvpTime');
      const btNext = data.get('btNext');
      const btBack = data.get('btBack');


      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
        return response;
      } else if (btNext) {
        if (!rsvpTime || typeof rsvpTime != 'string') {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time?message=E0008'));
          return response;
        } else {
          const scheduleResult = await getScheduleDetails(rsvpTime);

          if (scheduleResult) {
            const session = await getSession();
            session.schedule = {
              uid: scheduleResult.uid,
              sessionDateTime: scheduleResult.sessionDateTime,
              group: scheduleResult.group,
              isWeekend: scheduleResult.isWeekend,
              isBooked: scheduleResult.isBooked,
            }
            await session.save();
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/review'));
            return response;
          } else {
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time?message=E0008'));
            return response;
          }
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
