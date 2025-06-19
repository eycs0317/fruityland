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
      const timezone = data.get('timezone');
      const btNext = data.get('btNext');
      const btBack = data.get('btBack');
  console.log('<<<<??????????????selectedDate',selectedDate);
      if (btBack) {
        const response = NextResponse.redirect(new URL(siteURL + '/'));
        return response;
      } else if (btNext) {
        if (!selectedDate || typeof selectedDate != 'string' || selectedDate == '2024-12-31' || selectedDate == '2025-01-01') {
          const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date?message=E0009'));
          return response;
        } else {
          const session = await getSession();
          session.rsvpDate = selectedDate;
          session.timezone = typeof timezone === 'string' ? timezone : 'Asia/Hong_Kong';
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
