// nextjs
import {NextRequest, NextResponse} from 'next/server';

// utils
import {createCalendarRecord} from '@/utils/generateCalendar/v2';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.json();

      if (data.btGenerateCalendar) {
        const calendarData = await createCalendarRecord();

        if (calendarData.count === 0) {
          return NextResponse.json({
            message: 'Calendar data generated successfully.',
            redirect: '/efx/confirmation?type=calendar&count=' + calendarData.count + '&message=I0001',
          }, {
            status: 200
          });
        } else {
          return NextResponse.json({
            message: 'Calendar data not generated.',
            redirect: '/efx/confirmation?type=calendar&count=' + calendarData.count + '&message=S0003',
          }, {
            status: 200
          });
        }
      }
    } catch {
       return NextResponse.json({
        message: 'Invalid data format',
      }, {
        status: 400
      });
    }
  } else {
    return NextResponse.json({
      message: `Method ${req.method} Not Allowed`,
    }, {
      status: 405
    });
  }
}
