import {prisma} from '@/lib/prisma';

export async function getScheduleDetails(uid: string) {
  const scheduleDetails = await prisma.schedule.findUnique({
    where: { uid: uid },
  });
  return scheduleDetails;
}
