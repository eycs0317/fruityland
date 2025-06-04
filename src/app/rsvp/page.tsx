// metadata
export const metadata = {
  title: 'RSVP',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

// ui
import Heading from '@/ui/foundations/heading';

export default async function MainPage() {
  return (
    <main role="main" className="grid justify-self-center justify-items-center w-full md:w-120 p-4">
      <section className="w-full p-8 text-center">
        <Heading level={1} content="Decision flow for User RSVP" className="text-4xl pb-8" />
      </section>
      <section>
        <Heading level={2} content="User Flow" className="text-2xl pb-8" />
        <ul className="list-disc">
          <li>If Coupon Code is not associated with any schedule, then go to <Link href="/rsvp/date">New RSVP</Link>.</li>
          <li>Otherwise, go to <Link href="/rsvp/confirmation">Existing RSVP</Link>.</li>
        </ul>
      </section>
    </main>
  );
}
