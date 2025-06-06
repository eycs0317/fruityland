export const runtime = 'nodejs';

// next
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function GET(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  const session = await getSession();
  if (session.authType == 'efxAdmin') {
    await session.destroy();
    const response = NextResponse.redirect(new URL(siteURL + '/efx'));
    return response;
  } else {
    await session.destroy();
    const response = NextResponse.redirect(new URL(siteURL + '/admin'));
    return response;
  }
}
