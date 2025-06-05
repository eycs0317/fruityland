'use client';

// next
import {useSearchParams} from 'next/navigation';

// ui
import Heading from '@/ui/foundations/heading';

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const count = searchParams.get('count');

  switch (type) {
    case 'calendar':
      return (
        <section className="w-full px-8">
          <Heading level={2} content="Calendar Record" className="text-2xl pb-4" />
          <dl className="flex flex-row">
            <dt className="font-bold flex-1">Total calendar record created:</dt>
            <dd> {count}</dd>
          </dl>
        </section>
      );
    case 'couponCode':
      return (
        <section className="w-full px-8">
          <Heading level={2} content="Coupon Code Record" className="text-2xl pb-4" />
          <dl className="flex flex-row">
            <dt className="font-bold flex-1">Total coupon code record created:</dt>
            <dd> {count}</dd>
          </dl>
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
