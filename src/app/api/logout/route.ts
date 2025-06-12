// next
import {NextRequest, NextResponse} from 'next/server';

// utils
import {getSiteURL} from '@/utils/getSiteURL';
import {logoutDistroyAuth} from '@/utils/logoutDistroyAuth';

export async function GET(req: NextRequest) {
  const siteURL = getSiteURL(req);

  const redirectURL = await logoutDistroyAuth();
  const response = NextResponse.redirect(new URL(siteURL + redirectURL));
  return response;
}
