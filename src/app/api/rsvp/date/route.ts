// nextjs
import {NextRequest, NextResponse} from 'next/server';

// session
import {getSession} from '@/lib/session';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const selectedDate = data.get('selectedDate');
      const btNext = data.get('btNext');
      const btBack = data.get('btBack');

      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/'));
        return response;
      } else if (btNext) {
        if (!selectedDate || typeof selectedDate != 'string') {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date?message=E0009'));
          return response;
        } else {
          const session = await getSession();
          session.rsvpDate = selectedDate;
          await session.save();
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/time'));
          return response;
        }
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date?message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/&message=E0005'));
    return response;
  }
}
