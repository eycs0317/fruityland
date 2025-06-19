'use client';

// react
import {useEffect, useState} from 'react';

// nextjs
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';

// ui
import Heading from '@/ui/foundations/heading';
import FormField from '@/ui/foundations/formField';

export default function ClientPage() {
  const searchParams = useSearchParams();
  const couponCodeFromURL = searchParams.get('cc');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!couponCodeFromURL) {
      setError('Coupon code not found in URL.');
      return;
    }
  }, [couponCodeFromURL]);

  // Display error state
  if (error) {
    return (
      <>
        <section className="w-full p-8 text-center">
          <Heading level={1} content="Error Loading Reservation" className="text-2xl pb-8 text-red-600" />
          <p className="text-lg text-gray-700 mb-8">{error}</p>
          <p className="text-lg text-gray-700"><Link href="/">Go back to homepage.</Link></p>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative w-full p-8">
        <Heading level={1} content="Are you sure you want to cancel the reservation?" className="text-2xl pb-8" />
      </section>
      <section className="w-full p-8">
        <form className="flex flex-col gap-8 w-full" action="/api/rsvp/cancel" method="post">
          <FormField type='hidden' fieldData={{id: 'couponCode', value: couponCodeFromURL || ''}} />
          <div className="flex flex-col gap-4">
            <FormField type='button' fieldData={{type: 'submit', id: 'btConfirmCancel', className: 'danger', value:'Confirm Cancellation'}} />
            <FormField type='button' fieldData={{type: 'submit', id: 'btBack', className: 'tertiary', value:'Back'}} />
          </div>
        </form>
      </section>
    </>
  );
}
