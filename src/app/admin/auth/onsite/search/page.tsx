// metadata
export const metadata = {
  title: 'Onsite Support [Coupon Code Search]',
};

// react
import React from 'react';

// nextjs
import Image from 'next/image';
import Link from 'next/link';

export default async function MainPage() {
  return (
    <main role="main">
      <h1>Placeholder for Onsite Support Coupon Code Search Page</h1>
      <section>
        <Image src="/assets/i/wireframe/onsite-search.png" width="290" height="380" alt="wireframe" />
      </section>
      <section>
        <h2>Pseudocode</h2>
        <p>[<Link href="/admin/auth/onsite">Back to Dashboard</Link>]</p>
        <p>[Coupon Code Form Field]</p>
        <p>[<Link href="/admin/auth/onsite/confirmation">Search Button</Link>]</p>
      </section>
    </main>
  );
}
