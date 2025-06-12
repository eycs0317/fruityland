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

      const redirectURL = await loginSetAuth(userId, password, btLogin, '/admin');
      const response = NextResponse.redirect(new URL(siteURL + redirectURL));
      return response;
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/admin'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/admin'));
    return response;
  }
}
