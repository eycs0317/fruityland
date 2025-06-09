
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const isPromise = cookieStore instanceof Promise;

  return NextResponse.json({
    runtime: process.env.NEXT_RUNTIME ?? 'unknown',
    isPromise,
    iterator: typeof cookieStore[Symbol.iterator] === 'function',
  });
}
