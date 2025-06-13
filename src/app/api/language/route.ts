// nextjs
import {NextRequest, NextResponse} from 'next/server';

// lib
import {getSession} from '@/lib/session';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function GET(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'GET') {
    try {
      const {searchParams} = new URL(req.url);
      const lang = searchParams.get('lang');

      if (lang) {
        const session = await getSession();
        switch (lang) {
          case 'en-US': session.lang = lang; break;
          case 'zh-CN': session.lang = lang; break;
          default: session.lang = 'zh-HK'; break;
        }        
        await session.save();
        const response = NextResponse.redirect(new URL(siteURL + '/?message=I0002'));
        return response;
      } else {
        const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
    return response;
  }
}
