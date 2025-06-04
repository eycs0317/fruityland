// metadata
export const metadata = {
  title: 'Onsite Support [Confirmation]',
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
        <Heading level={1} content="Decision flow for Onsite Support Confirmation" className="text-4xl pb-8" />
      </section>
      <section>
        <Heading level={2} content="Onsite Support Flow" className="text-2xl pb-8" />
        <h2>Onsite Support Flow</h2>
        <ul className="list-disc">
          <li>If RSVP is not associated with Coupon Code, then go to <Link href="/admin/auth/onsite/confirmation/rsvp">RSVP Confirmation</Link>.</li>
          <li>Otherwise, go to <Link href="/admin/auth/onsite/confirmation/walkIn">Walk-in Confirmation</Link>.</li>
        </ul>
      </section>
    </main>
  );
}
