// prisma
import {prisma} from '@/lib/prisma';

// nextjs
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    const userCreate = await prisma.user.create({
      data: {
        name: 'John Doe',
      },
    });
    return NextResponse.json(userCreate);
  }
}
