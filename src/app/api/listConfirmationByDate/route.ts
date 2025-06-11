// nextjs
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

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
