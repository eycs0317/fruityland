export const runtime = 'nodejs';

// nextjs
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.formData();

      if (data.get('userId') === 'efxadmin' && data.get('password') === '!@#$%^&*()' && data.get('btLogin')) {
        const session = await getSession();
        session.auth = true;
        session.authType = 'efxAdmin';
        
        await session.save();
        return NextResponse.redirect(new URL('/efx/dashboard', req.nextUrl.origin));
      } else {
        const response = NextResponse.redirect(new URL('/efx', req.nextUrl.origin));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL('/efx', req.nextUrl.origin));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL('/efx', req.nextUrl.origin));
    return response;
  }
}
