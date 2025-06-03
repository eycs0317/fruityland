// metadata
export const metadata = {
  title: 'RSVP',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Decision flow for User RSVP</h1>
      <section>
        <h2>User Flow</h2>
        <p>If Coupon Code is not associated with any schedule, then go to <Link href="/rsvp/date">New RSVP</Link>.  Otherwise, go to <Link href="/rsvp/confirmation">Existing RSVP</Link>.</p>
      </section>
    </main>
  );
}
