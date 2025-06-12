// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const eventDate = data.get('selectedDate');
      return NextResponse.redirect(new URL(siteURL + '/admin/onsite/reservation/list?eventDate=' + eventDate));
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/'));
    return response;
  }
}
