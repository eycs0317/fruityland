// metadata
export const metadata = {
  title: 'Customer Support [Coupon Code Search]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Customer Support Coupon Code Search Page</h1>
      <section>
        <Image src="/assets/i/wireframe/support-search.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[Coupon Code form field]</p>
        <p>[<Link href="/rsvp/confirmation">Search Button</Link>]</p>
      </section>
    </main>
  );
}
