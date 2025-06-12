// nextjs
import {NextResponse, NextRequest} from 'next/server';

// utils
import {cancelReservation} from '@/utils/cancelReservation';
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode') as string;

      cancelReservation(couponCode);

      const response = NextResponse.redirect(new URL(siteURL + '/?message=E0004'));
      return response;
    }
    catch {
      const response = NextResponse.redirect(new URL(siteURL + '/?message=E0005'));
      return response;
    }
  }
}
