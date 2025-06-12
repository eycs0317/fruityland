// prisma
import {prisma} from '@/lib/prisma';

export async function cancelReservation(couponCode: string) {
  await prisma.$transaction(async (tx) => {
    const updateCoupon = await tx.coupon.update({
      where: {
        couponCode,
      },
      data: {
        isRSVP: false,
        status: 0,
      },
      select: {
        scheduleUID: true,
      },
    });

    let updateCouponScedule = null;
    if (updateCoupon.scheduleUID) {
      await tx.schedule.update({
        where: {
          uid: updateCoupon.scheduleUID,
        },
        data: {
          isBooked: false,
        },
      });
      updateCouponScedule = await tx.coupon.update({
        where: {
          couponCode,
        },
        data: {
          scheduleUID: null,
        },
      });
    }
    return updateCouponScedule;
  });
}
