export const runtime = 'nodejs';

// next
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function GET(req: NextRequest) {
  const session = await getSession();
  await session.destroy();
  const response = NextResponse.redirect(new URL('/efx', req.url));
  return response;
}
