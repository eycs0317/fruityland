// metadata
export const metadata = {
  title: 'Onsite Support [Confirmation]',
};

// react
import React from 'react';

// nextjs
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Decision flow for Onsite Support Confirmation</h1>
      <section>
        <h2>Onsite Support Flow</h2>
        <p>If RSVP is not associated with Coupon Code, then go to <Link href="/admin/auth/onsite/confirmation/rsvp">RSVP Confirmation</Link>.  Otherwise, go to <Link href="/admin/auth/onsite/confirmation/walkIn">Walk-in Confirmation</Link>.</p>
      </section>
    </main>
  );
}
