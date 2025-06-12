// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {getSiteURL} from '@/utils/getSiteURL';
import {loginSetAuth} from '@/utils/loginSetAuth';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const userId = data.get('userId') as string;
      const password = data.get('password') as string;
      const btLogin = data.get('btLogin') as string;

      if (userId == '' || password == '') {
        const response = NextResponse.redirect(new URL(siteURL + '/admin?message=E0001'));
        return response;
      } else {
        const redirectURL = await loginSetAuth(userId, password, btLogin, '/admin');
        if (redirectURL == '/admin') {
          const response = NextResponse.redirect(new URL(siteURL + '/admin?message=E0002'));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + redirectURL + '?message=S0001'));
          return response;
        }
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/admin?message=E0003'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/admin?message=E0003'));
    return response;
  }
}
