import { prisma } from '@/lib/prisma';
import { checkAuth } from '../checkAuth'
export async function getStartEndUTC(userInputCouponCode: string): Promise<{ startDate: Date | null; endDate: Date | null }> {
    const customerAuth = await checkAuth('customerAdmin');
    const onsiteAuth = await checkAuth('onsiteAdmin');
    const efxAuth = await checkAuth('efxAdmin');
    if(customerAuth || onsiteAuth || efxAuth){
      return { startDate: new Date('2025-07-10T04:00:00.000Z'), endDate: new Date('2025-08-31T11:30:00.000Z') };
    }
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

    return { startDate, endDate };

  }catch (error){
    console.error(`Error in getStartEndUTC for couponCode ${userInputCouponCode}:`, error);
    // In case of any error, return nulls
    return { startDate: null, endDate: null };
  }





}