// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

// utils
import {getSiteURL} from '@/utils/getSiteURL';
import {formatCouponCode} from '@/utils/formatCouponCode';

// lib
import {getSession} from '@/lib/session';

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
      const actionModify = data.get('btModify');
      const actionCancel = data.get('btCancel');

      if (actionModify) {
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
            delete session.rsvpDate;
            delete session.schedule;
            delete session.legal;

            if (!session.lang) {
              const lang = 'zh-HK';
              session.lang = lang;
              await session.save();
            };
            await session.save()

            // coupon found but not RSVP
            if (session.auth && session.authType == 'onsiteAdmin') {
              const response = NextResponse.redirect(new URL(siteURL + '/rsvp/confirmation?cc=' + data.get('couponCode')));
              return response;
            } else {
              // need to check if coupon expired
              const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
              return response;
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

        // const response = NextResponse.redirect(new URL(siteURL + '/rsvp/date'));
        // return response;
      } else if (actionCancel) {
        const response = NextResponse.redirect(new URL(siteURL + '/rsvp/cancel?cc=' + couponCode));
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
