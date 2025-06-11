// prisma
import { prisma } from '@/lib/prisma';

export async function createReservation(details: { couponCode: string; rsvpTime: string; }) {
  const { couponCode, rsvpTime } = details;

  try {
    // 1. Find the selected schedule (appointment)
    const schedule = await prisma.schedule.findUnique({
      where: { uid: rsvpTime },
      // include the group and isBooked field
      select: { group: true, isBooked: true },
    });

    if (!schedule) {
      return { success: false, message: 'Selected time slot not found.' };
    }

    if (schedule.isBooked) {
      return { success: false, message: 'This time slot is already booked. Please choose another.' };
    }

    // 2. Find the coupon details
    const coupon = await prisma.coupon.findUnique({
      where: { couponCode: couponCode },
      select: { group: true, isRSVP: true },
    });

    if (!coupon) {
      return { success: false, message: 'Coupon not found.' };
    }

    if (coupon.isRSVP) {
      return { success: false, message: 'This coupon has already been used.' };
    }

    // 3. Ensure they have the same group number
    if (coupon.group !== schedule.group) {
      return { success: false, message: 'Coupon and selected time slot do not match groups.' };
    }

    // 4. Update both the Schedule and the Coupon using a transaction
    const [updatedCoupon, updatedSchedule] = await prisma.$transaction([
      prisma.coupon.update({
        where: { couponCode: couponCode },
        data: {
          scheduleUID: rsvpTime,
          isRSVP: true,
          status: 1,
        },
      }),
      prisma.schedule.update({
        where: { uid: rsvpTime },
        data: {
          isBooked: true,
        },
      }),
    ]);

    console.log(`Coupon ${updatedCoupon.couponCode} linked to schedule ${updatedSchedule.uid} and both marked as booked/RSVP'd.`);
    return { success: true, message: 'Reservation created successfully!', data: { updatedCoupon, updatedSchedule } };

  } catch (error) {
    console.error('Error in createReservation:', error);
    // You might want to check for specific Prisma errors (e.g., P2002 for unique constraint violation)
    // and return more specific messages.
    return { success: false, message: 'Failed to process reservation due to a server error.' };
  }
}
