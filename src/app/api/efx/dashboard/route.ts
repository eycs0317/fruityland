// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const btGenerateCalendar = data.get('btGenerateCalendar') as string;
      const btGenerateCouponCode = data.get('btGenerateCouponCode') as string;
      const btRunReportCoupon = data.get('btRunReportCoupon') as string;
      const btRunReportSchedule = data.get('btRunReportSchedule') as string;
      const dataObj = Object.fromEntries(data.entries());

      if (btGenerateCalendar) {
        const response = await fetch(process.env.URL + '/api/efx/generateCalendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataObj),
        });
        const result = await response.json();
        if (response.status == 200) {
          const response = NextResponse.redirect(new URL(siteURL + result.redirect));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/efx/dashboard?message=E0005'));
          return response;
        }
      } else if (btGenerateCouponCode) {
        const response = await fetch(process.env.URL + '/api/efx/generateCouponCode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataObj),
        });
        const result = await response.json();
        if (response.status == 200) {
          const response = NextResponse.redirect(new URL(siteURL + result.redirect));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/efx/dashboard?message=E0005'));
          return response;
        }
      } else if (btRunReportCoupon) {
        const response = NextResponse.redirect(new URL(siteURL + '/efx/reportCoupon'));
        return response;
      } else if (btRunReportSchedule) {
        const response = NextResponse.redirect(new URL(siteURL + '/efx/reportSchedule'));
        return response;
      }
    } catch {
      const response = NextResponse.redirect(new URL(siteURL + '/efx/dashboard?message=E0005'));
      return response;
    }
  } else {
    const response = NextResponse.redirect(new URL(siteURL + '/efx/dashboard?message=E0005'));
    return response;
  }
}
