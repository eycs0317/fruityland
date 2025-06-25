// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const couponDetails = await prisma.coupon.findMany({
        select: {
          couponCode: true,
          group: true,
        },
        orderBy: {
          group: 'asc',
        },
      });
      return NextResponse.json({
        success: true,
        data: couponDetails,
      });
    } catch {
      return NextResponse.json(
        { success: false, message: 'Failed to retrieve coupon details.' },
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
