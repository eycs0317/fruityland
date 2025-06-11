import {prisma} from '@/lib/prisma';

export async function getScheduleDetailsByCouponCode(couponCode: string) {
  try {
    // 1. Find the Coupon record by its couponCode
    const coupon = await prisma.coupon.findUnique({
      where: { couponCode: couponCode },
      select: {
        // We select the couponSchedule relation to get the linked Schedule data
        couponSchedule: {
          select: {
            uid: true, // The UID of the schedule itself
            sessionDateTime: true, // The actual date and time
            group: true,
            isWeekend: true,
          },
        },
        // Also select coupon-specific fields that confirm its status
        isRSVP: true,
        participantCount: true,
      },
    });

    if (!coupon) {
      return { success: false, message: 'Coupon not found.' };
    }

    // Check if the coupon is actually linked to a schedule (i.e., booked)
    // This handles cases where the coupon exists but hasn't been used yet.
    if (!coupon.couponSchedule) {
      return { success: false, message: 'Coupon is not yet associated with a schedule.' };
    }

    // If it's booked, return the schedule data from the relation
    return { success: true, message: 'Schedule found.', data: coupon.couponSchedule };

  } catch (error) {
    console.error('Error in getScheduleDetailsByCouponCode:', error);
    return { success: false, message: 'An error occurred while fetching schedule details by coupon code.' };
  }
}
