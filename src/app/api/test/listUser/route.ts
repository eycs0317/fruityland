// prisma
import {prisma} from '@/lib/prisma';

// nextjs
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const userList = await prisma.user.findMany();
    return NextResponse.json(userList);
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message || 'Something went wrong'
    }, {
      status: 500
    });
  }
}
