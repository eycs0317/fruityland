// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;
  
  const {searchParams} = new URL(request.url);
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
