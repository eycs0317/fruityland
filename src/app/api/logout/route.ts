export const runtime = 'nodejs';

// next
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (session.authType == 'efxAdmin') {
    await session.destroy();
    const response = NextResponse.redirect(new URL('/efx', req.nextUrl.origin));
    return response;
  } else {
    await session.destroy();
    const response = NextResponse.redirect(new URL('/admin', req.nextUrl.origin));
    return response;
  }
}
