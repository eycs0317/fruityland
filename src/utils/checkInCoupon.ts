// prisma
import {prisma} from '@/lib/prisma';

export async function checkInCoupon(couponCode: string) {
  const couponSearch = await prisma.coupon.update({
    where: {
      couponCode: couponCode,
    },
    data: {
      status: 2,
    },
  });
  return couponSearch;
}
