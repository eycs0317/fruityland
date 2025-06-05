'use client';

// next
import {useSearchParams} from 'next/navigation';

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const count = searchParams.get('count');

  switch (type) {
    case 'calendar':
      return (
        <section className="w-full p-8">
          <p>Calendar</p>
          <p>Total session created: {count}</p>
        </section>
      );
    case 'couponCode':
      return (
        <section className="w-full p-8">
          <p>Coupon Code</p>
          <p>Total coupon code created: {count}</p>
        </section>
      );
    default:
      return (
        <section className="w-full p-8">
          <p>Unable to confirm.</p>
        </section>
      );
  }
}
