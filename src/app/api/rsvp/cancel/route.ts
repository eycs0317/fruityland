// src/app/api/rsvp/cancel/route.ts

// Use NextResponse for creating responses in App Router Route Handlers
import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this path is correct

// Route Handlers use standard HTTP method functions (GET, POST, PUT, DELETE, etc.)
// They receive a Request object and return a Response object (or a Promise resolving to one)
export async function POST(request: NextRequest) { // 'request' is the standard Web Request object
  console.log('---------Request Method:', request.method);

  // You don't need to check req.method here explicitly, as this function *is* the POST handler.
  // If a non-POST request came, this function wouldn't be invoked.

  let couponCode: string | undefined;

  try {
    // Parse the request body as JSON
    const body = await request.json();
    couponCode = body.couponCode;
    console.log('----body.couponCode:----', body.couponCode);
  } catch (error) {
    console.error('Error parsing request body:', error);
    // Use NextResponse.json for JSON responses
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });
  }

  if (!couponCode) {
    return NextResponse.json({ message: 'Missing couponCode' }, { status: 400 });
  }

  try {
    console.log('------inside try block-------');
    const dbResult =await prisma.$transaction(async (tx) => {
      const updatedCoupon = await tx.coupon.update({
        where: { couponCode },
        data: {
          isRSVP: false,
          status: 0,
        },
        select: { scheduleUID: true },
      });
      console.log('----updatedCoupon:----', updatedCoupon);

      if (updatedCoupon.scheduleUID) {
        await tx.schedule.update({
          where: { uid: updatedCoupon.scheduleUID },
          data: { isBooked: false },
        });
      }
      return updatedCoupon
    });
    console.log('---dbResult---', dbResult);

    // Return a success JSON response
    return NextResponse.json({ success: true }, { status: 200 });
  }
  catch (error) {
    console.error('Error cancelling appointment:', error);
    // Return an error JSON response
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}