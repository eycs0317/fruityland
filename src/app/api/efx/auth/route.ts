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

      if (data.get('userId') === 'efxadmin' && data.get('password') === '!@#$%^&*()' && data.get('btLogin')) {
        const session = await getSession();
        session.auth = true;
        session.authType = 'efxAdmin';
        
        await session.save();
        return NextResponse.redirect(new URL(siteURL + '/efx/dashboard'));
      } else {
        const response = NextResponse.redirect(new URL(siteURL + '/efx'));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/efx'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/efx'));
    return response;
  }
}
