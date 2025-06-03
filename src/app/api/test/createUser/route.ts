// prisma
import {prisma} from '@/lib/prisma';

// nextjs
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const userCreate = await prisma.user.create({
      data: {
        name: 'John Doe',
      },
    });
    return NextResponse.json(userCreate);
  } catch (error) {
    return NextResponse.json({
      error: (error as Error).message || 'Something went wrong'
    }, {
      status: 500
    });
  }
}
