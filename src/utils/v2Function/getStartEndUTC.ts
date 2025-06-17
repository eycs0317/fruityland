import {prisma} from '@/lib/prisma';
export async function getStartEndUTC(userInputCouponCode: string): Promise<{ startDate: Date | null; endDate: Date | null }> {
  try {
    const couponDetail = await prisma.coupon.findUnique({
      where: {
        couponCode: userInputCouponCode,
      },
      select:  {
        group: true,
      },
    })

    if (!couponDetail) {
      console.warn(`Coupon not found for couponCode: ${userInputCouponCode}`);
      return { startDate: null, endDate: null };
    }
    const { group } = couponDetail;

    const schedulesInGroup = await prisma.schedule.findMany({
      where: {
        group: group,
      },
      orderBy: {
        sessionDateTime: 'asc', // Order ascending to get the earliest first
      },
      select: {
        sessionDateTime: true, // Only select the date/time field needed
      },
    });

    if (schedulesInGroup.length === 0) {
      console.warn(`No schedules found for group: ${group}`);
      return { startDate: null, endDate: null };
    }

    const startDate = schedulesInGroup[0].sessionDateTime;
    const endDate = schedulesInGroup[schedulesInGroup.length - 1].sessionDateTime;
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    return { startDate, endDate };

  }catch (error){
    console.error(`Error in getStartEndUTC for couponCode ${userInputCouponCode}:`, error);
    // In case of any error, return nulls
    return { startDate: null, endDate: null };
  }





}