// app/api/findCoupon/routeModule.ts
// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

// lib
import {getSession} from '@/lib/session';

// utils
import {getSiteURL} from '@/utils/getSiteURL';
import {formatCouponCode} from '@/utils/formatCouponCode';

async function getCouponDetails(couponCode: string) {
  const couponSearch = await prisma.coupon.findUnique({
    where: {
      couponCode: couponCode,
    },

  });
  return couponSearch;
}

export async function POST(req: NextRequest) {
  const siteURL = getSiteURL(req);

  if (req.method === 'POST') {
    try {

      const data = await req.formData();
      let couponCode = data.get('couponCode');
      if (typeof couponCode === 'string') {
        couponCode = formatCouponCode(couponCode);
      } else {
        couponCode = '';
      }

      if (typeof couponCode === 'string') {
        const couponResult = await getCouponDetails(couponCode);
        if (couponResult) {
          const session = await getSession();
          session.coupon = {
            couponCode: couponResult.couponCode,
            group: couponResult.group,
            isWeekend: couponResult.isWeekend,
            participantCount: couponResult.participantCount,
          }
          await session.save()

          if (couponResult.scheduleUID) {
            // coupon found and got scheduleUID,
            const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + data.get('couponCode')));
            return response;
          } else {
            // coupon found but not RSVP
            if (session.auth && session.authType == 'onsiteAdmin') {
              const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + data.get('couponCode')));
              return response;
            } else {
              // need to check if coupon expired
              const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
              return response;
            }
          }
        } else {
          const session = await getSession();
          if (session.auth && session.authType == 'onsiteAdmin') {
            const response = NextResponse.redirect(new URL(siteURL + '/admin/onsite/search?message=E0004'));
            return response;
          } else if (session.auth && session.authType == 'customerAdmin') {
            const response = NextResponse.redirect(new URL(siteURL + '/admin/support?message=E0004'));
            return response;
          } else {
            const response = NextResponse.redirect(new URL(siteURL + '/?message=E0004'));
            return response;
          }
        }
      } else {
        const session = await getSession();
        if (session.auth && session.authType == 'onsiteAdmin') {
          const response = NextResponse.redirect(new URL(siteURL + '/admin/onsite/search?message=E0004'));
          return response;
        } else if (session.auth && session.authType == 'customerAdmin') {
          const response = NextResponse.redirect(new URL(siteURL + '/admin/support?message=E0004'));
          return response;
        } else {
          const response = NextResponse.redirect(new URL(siteURL + '/?message=E0004'));
          return response;
        }
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
