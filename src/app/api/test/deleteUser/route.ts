// prisma
import {prisma} from '@/lib/prisma';

// nextjs
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        error: 'Missing user ID'
      }, {
        status: 400
      });
    }

    const userDelete = await prisma.user.delete({
      where: {id},
    });
    return NextResponse.json(userDelete);
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message || 'Something went wrong'
    }, {
      status: 500
    });
  }
}
