// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

// utils
import {getSiteURL} from '@/utils/getSiteURL';

export async function GET(req: NextRequest) {
  const siteURL = getSiteURL(req);
  
  const {searchParams} = new URL(req.url);
  const couponCode = searchParams.get('cc');

  try {
    if (couponCode) {
      const couponSearch = await prisma.coupon.findUnique({
        where: {
          couponCode: couponCode,
          status: 2,
        },
      });
      if (couponSearch) {
        return NextResponse.json({
          success: true,
          data: {
            status: true,
          },
        });
      } else {
        return NextResponse.json({
          success: true,
          data: {
            status: false,
          },
        });
      }
    } else {
      const response = NextResponse.redirect(new URL(siteURL + '/'));
      return response;
    }
  } catch {
    const response = NextResponse.redirect(new URL(siteURL + '/'));
    return response;
  }
}
