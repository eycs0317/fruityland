// nextjs
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.json();

      if (data.userId === 'efxadmin' && data.password === '!@#$%^&*()' && data.btLogin) {
        return NextResponse.json({
          message: 'Data received successfully',
          redirect: '/efx/dashboard',
        }, {
          status: 200
        });
      } else {
        return NextResponse.json({
          message: 'Incorrect credentials',
        }, {
          status: 400
        });
      }
    } catch {
       return NextResponse.json({
        message: 'Invalid data format'
      }, {
        status: 400
      });
    }
  } else {
    return NextResponse.json({
      message: `Method ${req.method} Not Allowed`
    }, {
      status: 405
    });
  }
}
