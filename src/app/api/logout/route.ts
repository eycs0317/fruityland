export const runtime = 'nodejs';

// next
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (session.authType == 'efxAdmin') {
    await session.destroy();
    const response = NextResponse.redirect(new URL('/efx', req.url));
    return response;
  } else {
    await session.destroy();
    const response = NextResponse.redirect(new URL('/admin', req.url));
    return response;
  }
}
