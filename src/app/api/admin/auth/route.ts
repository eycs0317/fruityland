export const runtime = 'nodejs';

// nextjs
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function POST(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  if (req.method === 'POST') {
    try {
      const data = await req.formData();

      if (data.get('userId') === 'customer' && data.get('password') === 'cccccccc' && data.get('btLogin')) {
        const session = await getSession();
        session.auth = true;
        session.authType = 'customerAdmin';
        
        await session.save();
        return NextResponse.redirect(new URL(siteURL + '/admin/support'));
      } else if (data.get('userId') === 'onsite' && data.get('password') === 'oooooooo' && data.get('btLogin')) {
        const session = await getSession();
        session.auth = true;
        session.authType = 'onsiteAdmin';
        
        await session.save();
        return NextResponse.redirect(new URL(siteURL + '/admin/onsite'));
      } else {
        const response = NextResponse.redirect(new URL(siteURL + '/admin'));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/admin'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/admin'));
    return response;
  }
}
