// nextjs
import {NextRequest, NextResponse} from 'next/server';

// prisma
import {prisma} from '@/lib/prisma';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    try {
      const scheduleDetails = await prisma.schedule.findMany({
        select: {
          uid: true,
          sessionDateTime: true,
          group: true,
          isWeekend: true,
          isBooked: true,
        },
        orderBy: {
          sessionDateTime: 'asc',
        },
      });
      return NextResponse.json({
        success: true,
        data: scheduleDetails,
      });
    } catch {
      return NextResponse.json(
        { success: false, message: 'Failed to retrieve schedule details.' },
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
