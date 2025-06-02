// prisma
import {prisma} from '@/lib/prisma';

// nextjs
import {type NextRequest, NextResponse} from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    const userList = await prisma.user.findMany();
    return NextResponse.json(userList);
  }
}
