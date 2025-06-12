import {NextResponse, NextRequest} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const host = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'https'; // 'http' fallback for local
  const siteURL = protocol + '://' + host;

  if (req.method === 'POST') {
    try {
      const data = await req.formData();
      const couponCode = data.get('couponCode') as string;

      await prisma.$transaction(async (tx) => {
        const updatedCoupon = await tx.coupon.update({
          where: { couponCode },
          data: {
            isRSVP: false,
            status: 0,
          },
          select: { scheduleUID: true },
        });

        let updatedCouponScedule = null;
        if (updatedCoupon.scheduleUID) {
          await tx.schedule.update({
            where: { uid: updatedCoupon.scheduleUID },
            data: { isBooked: false },
          });
          updatedCouponScedule = await tx.coupon.update({
            where: { couponCode },
            data: {
              scheduleUID: null,
            },
          });
        }
        return updatedCouponScedule;
      });

      const response = NextResponse.redirect(new URL(siteURL + '/'));
      return response;
    }
    catch {
      const response = NextResponse.redirect(new URL(siteURL + '/'));
      return response;
    }
  }
}
